import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import * as NetworkWSInterface from './networkWSInterface';
import * as PromiseHelper from '../../util/PromiseHelper';
import * as InkModel from '../../model/InkModel';
import * as RecognizerContext from '../../model/RecognizerContext';

function buildUrl(configuration, suffixUrl) {
  const scheme = (configuration.recognitionParams.server.scheme === 'https') ? 'wss' : 'ws';
  return `${scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`;
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
  // Giving back the hand to the editor by resolving the promise.
}

/**
 * Init the websocket recognizer.
 * Open the connexion and proceed to the hmac challenge.
 * A recognizer context is build as such :
 * @param {String} suffixUrl
 * @param {Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param buildWebSocketCallback
 * @param reconnect
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(suffixUrl, configuration, model, recognizerContext, buildWebSocketCallback = recognizerContext.buildWebSocketCallback, reconnect) {
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
  recognizerContextReference.configuration = configuration;
  recognizerContextReference.suffixUrl = suffixUrl;
  recognizerContextReference.url = buildUrl(configuration, suffixUrl);
  recognizerContextReference.buildWebSocketCallback = buildWebSocketCallback; // Save build function to be re-used for reconnection
  recognizerContextReference.reconnect = reconnect;
  recognizerContextReference.currentReconnectionCount = 0;
  recognizerContextReference.recognitionContexts = [];
  const destructuredInitPromise = PromiseHelper.destructurePromise();

  logger.debug('Opening the websocket for context ', recognizerContext);
  recognizerContextReference.callback = buildWebSocketCallback(configuration, model, recognizerContext, destructuredInitPromise);
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(recognizerContextReference);
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  return recognizerContextReference.initPromise
      .then((initModel) => {
        logger.debug('Init over', initModel);
        return initModel;
      });
}

/**
 * Send a recognition message
 * @param {RecognizerContext} recognizerContext
 * @param {RecognitionContext} recognitionContext
 */
function send(recognizerContext, recognitionContext) {
  const recognizerContextReference = recognizerContext;

  logger.debug('Recognizer is alive. Sending message');
  recognizerContextReference.recognitionContexts[0] = recognitionContext;
  try {
    recognitionContext.buildMessages.forEach((buildMessage) => {
      NetworkWSInterface.send(recognizerContextReference, buildMessage(recognizerContextReference, recognitionContext.model, recognitionContext.configuration));
    });
    RecognizerContext.updateRecognitionPositions(recognizerContextReference, recognitionContext.model);
  } catch (sendException) {
    if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContextReference) && recognizerContext.reconnect) {
      logger.info('Attempting a retry', recognizerContextReference.currentReconnectionCount);
      recognizerContext.reconnect(recognitionContext.configuration, recognitionContext.model, recognizerContextReference, recognitionContext.callback);
    } else {
      logger.error('Send exception', sendException);
      throw RecognizerContext.LOST_CONNEXION_MESSAGE;
    }
  }
}

/**
 * @param {Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 * @param {...function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildMessages
 */
export function sendMessages(configuration, model, recognizerContext, callback, ...buildMessages) {
  const recognizerContextReference = recognizerContext;

  // Building an object with all mandatory fields to feed the recognition queue.
  /**
   * Current recognition context
   * @type {RecognitionContext}
   */
  const recognitionContext = {
    buildMessages,
    model,
    configuration,
    callback
  };

  recognizerContextReference.initPromise.then(() => {
    logger.debug('Init was done feeding the recognition queue');
    try {
      send(recognizerContextReference, recognitionContext);
    } catch (recognitionError) {
      logger.info('Unable to process recognition');
      recognitionContext.callback(recognitionError, model);
    }
  }, /* rejection */ () => {
    // TODO Manage this error
    logger.info('Unable to init');
    recognitionContext.callback('Unable to init', model);
  });
}

/**
 * Do what is needed to clean the server context.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  if (recognizerContextReference && recognizerContextReference.websocket) {
    // We have to send again all strokes after a clear.
    delete recognizerContextReference.instanceId;
    try {
      NetworkWSInterface.send(recognizerContextReference, { type: 'reset' });
    } catch (sendFailedException) {
      // To force failure without breaking the flow
      recognizerContextReference.callback(configuration, model, recognizerContextReference, PromiseHelper.destructurePromise());
    }
  }
  // We do not keep track of the success of clear.
  callback(undefined, modelRef);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 */
export function close(configuration, model, recognizerContext, callback) {
  if (recognizerContext && recognizerContext.websocket) {
    NetworkWSInterface.close(recognizerContext.websocket, 1000, 'CLOSE BY USER');
  }
  callback(undefined, model);
}
