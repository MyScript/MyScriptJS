import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import * as NetworkWSInterface from './networkWSInterface';
import * as PromiseHelper from '../../util/PromiseHelper';
import * as InkModel from '../../model/InkModel';
import * as RecognizerContext from '../../model/RecognizerContext';

function buildUrl(options, suffixUrl) {
  const scheme = (options.recognitionParams.server.scheme === 'https') ? 'wss' : 'ws';
  return `${scheme}://${options.recognitionParams.server.host}${suffixUrl}`;
}

/**
 * Handle default websocket message
 * @param {Object} payload
 */
export function simpleCallBack(payload) {
  logger.info('This is something unexpected in current recognizer. Not the type of message we should have here.', payload);
}

/**
 * Handle websocket error message
 * @param {Object} errorDetail
 * @param {RecognizerContext} recognizerContext
 * @param {DestructuredPromise} destructuredPromise
 */
export function errorCallBack(errorDetail, recognizerContext, destructuredPromise) {
  logger.debug('Error detected stopping all recognition', errorDetail);
  if (recognizerContext && recognizerContext.recognitionContexts && recognizerContext.recognitionContexts.length > 0) {
    const recognitionContext = recognizerContext.recognitionContexts.shift();
    recognitionContext.callback(errorDetail, recognitionContext.model);
  }
  if (destructuredPromise) {
    destructuredPromise.reject(errorDetail);
  }
  // Giving back the hand to the InkPaper by resolving the promise.
}

/**
 * Init the websocket recognizer.
 * Open the connexion and proceed to the hmac challenge.
 * A recognizer context is build as such :
 * @param {String} suffixUrl
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param buildWebSocketCallback
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(suffixUrl, options, model, recognizerContext, buildWebSocketCallback = recognizerContext.buildWebSocketCallback) {
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
  recognizerContextReference.options = options;
  recognizerContextReference.suffixUrl = suffixUrl;
  recognizerContextReference.url = buildUrl(options, suffixUrl);
  recognizerContextReference.buildWebSocketCallback = buildWebSocketCallback; // Save build function to be re-used for reconnection
  recognizerContextReference.currentReconnectionCount = 0;
  recognizerContextReference.recognitionContexts = [];
  const destructuredInitPromise = PromiseHelper.destructurePromise();

  logger.debug('Opening the websocket for context ', recognizerContext);
  recognizerContextReference.callback = buildWebSocketCallback(options, model, recognizerContext, destructuredInitPromise);
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(recognizerContextReference);
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  return recognizerContextReference.initPromise
      .then((initModel) => {
        logger.debug('Init over', initModel);
        return initModel;
      });
}

/**
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 * @param {...function(recognizerContext: RecognizerContext, model: Model, options: Options): Object} buildMessages
 */
export function sendMessages(options, model, recognizerContext, callback, ...buildMessages) {
  const recognizerContextReference = recognizerContext;

  // Building an object with all mandatory fields to feed the recognition queue.
  /**
   * Current recognition context
   * @type {RecognitionContext}
   */
  const recognitionContext = {
    buildMessages,
    model,
    options,
    callback
  };

  recognizerContextReference.initPromise.then(() => {
    logger.debug('Recognizer is alive. Sending message');
    recognizerContextReference.recognitionContexts[0] = recognitionContext;
    try {
      recognitionContext.buildMessages.forEach((buildMessage) => {
        NetworkWSInterface.send(recognizerContextReference, buildMessage(recognizerContextReference, recognitionContext.model, recognitionContext.options));
      });
      RecognizerContext.updateRecognitionPositions(recognizerContextReference, recognitionContext.model);
    } catch (sendException) {
      logger.info('Unable to process recognition');
      recognitionContext.callback(sendException, model);
    }
  }, /* rejection */ () => {
    // TODO Manage this error
    logger.info('Unable to init');
    recognitionContext.callback('Unable to init', model);
  });
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reset(options, model, recognizerContext, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  if (recognizerContextReference && recognizerContextReference.websocket) {
    // We have to send again all strokes after a reset.
    delete recognizerContextReference.instanceId;
    try {
      NetworkWSInterface.send(recognizerContextReference, { type: 'reset' });
    } catch (sendFailedException) {
      // To force failure without breaking the flow
      recognizerContextReference.callback(options, model, recognizerContextReference, PromiseHelper.destructurePromise());
    }
  }
  // We do not keep track of the success of reset.
  callback(undefined, modelRef);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 */
export function close(options, model, recognizerContext, callback) {
  if (recognizerContext && recognizerContext.websocket) {
    NetworkWSInterface.close(recognizerContext.websocket, 1000, 'CLOSE BY USER');
  }
  callback(undefined, model);
}
