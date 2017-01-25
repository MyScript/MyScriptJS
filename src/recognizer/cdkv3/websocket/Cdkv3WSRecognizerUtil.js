import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as PromiseHelper from '../../../util/PromiseHelper';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';

function buildUrl(options, suffixUrl) {
  const scheme = (options.recognitionParams.server.scheme === 'https') ? 'wss' : 'ws';
  return scheme + '://' + options.recognitionParams.server.host + suffixUrl;
}

/**
 * Init the websocket recognizer.
 * Open the connexion and proceed to the hmac challenge.
 * A recognizer context is build as such :
 * @param {String} suffixUrl
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(suffixUrl, options, model, recognizerContext) {
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
  recognizerContextReference.suffixUrl = suffixUrl;
  recognizerContextReference.options = options;
  const url = buildUrl(options, suffixUrl);
  const destructuredInitPromise = PromiseHelper.destructurePromise();

  logger.debug('Opening the websocket for context ', recognizerContextReference);
  const initCallback = Cdkv3WSWebsocketBuilder.buildWebSocketCallback(destructuredInitPromise, recognizerContextReference, options);
  recognizerContextReference.url = url;
  recognizerContextReference.callback = initCallback;
  recognizerContextReference.options = options;
  recognizerContextReference.currentReconnectionCount = 0;
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(recognizerContextReference);
  recognizerContextReference.recognitionContexts = [];

  // Feeding the recognitionContext
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  return recognizerContextReference.initPromise
      .then((value) => {
        logger.debug('Init over ' + value);
        return model;
      });
}


function send(recognizerContext, recognitionContext) {
  const recognizerContextReference = recognizerContext;
  const recognitionContextReference = recognitionContext;

  logger.debug('Recognizer is alive. Sending message');
  recognizerContextReference.recognitionContexts.push(recognitionContextReference);
  try {
    NetworkWSInterface.send(recognizerContextReference, recognitionContext.buildInputFunction(recognizerContextReference, recognitionContextReference.model, recognitionContextReference.options));
    RecognizerContext.updateRecognitionPositions(recognizerContextReference, recognitionContextReference.model);
  } catch (sendException) {
    if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContextReference)) {
      init(recognizerContextReference.suffixUrl, recognizerContextReference.options, recognizerContextReference.model, recognizerContextReference).then(() => {
        logger.info('Attempting a retry', recognizerContextReference.currentReconnectionCount);
        send(recognizerContextReference, recognitionContext);
      });
    } else {
      throw RecognizerContext.LOST_CONNEXION_MESSAGE;
    }
  }
}

/**
 * @param {Options} options
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {...function(recognizerContext: RecognizerContext, model: Model, options: Options): Object} buildInputFunction
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function sendMessages(options, recognizerContext, model, buildInputFunction) {
  const destructuredRecognitionPromise = PromiseHelper.destructurePromise();
  const recognizerContextReference = recognizerContext;

  // Building an object with all mandatory fields to feed the recognition queue.
  /**
   * Current recognition context
   * @type {RecognitionContext}
   */
  const recognitionContext = {
    buildInputFunction,
    model,
    options,
    recognitionPromiseCallbacks: destructuredRecognitionPromise
  };

  recognizerContextReference.initPromise.then(() => {
    logger.debug('Init was done feeding the recognition queue');
    try {
      send(recognizerContextReference, recognitionContext);
    } catch (recognitionError) {
      logger.info('Unable to process recognition');
      recognitionContext.recognitionPromiseCallbacks.reject(recognitionError);
    }
  }, /* rejection */ () => {
    // TODO Manage this error
    logger.info('Unable to init');
    recognitionContext.recognitionPromiseCallbacks.reject('Unable to init');
  });

  return destructuredRecognitionPromise.promise;
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognizerCallback} callback
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
      Cdkv3WSWebsocketBuilder.buildWebSocketCallback(PromiseHelper.destructurePromise(), recognizerContextReference, options);
    }
  }
  // We do not keep track of the success of reset.
  Promise.resolve(modelRef)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, undefined));
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {RecognizerCallback} callback
 */
export function close(options, model, recognizerContext, callback) {
  if (recognizerContext && recognizerContext.websocket) {
    NetworkWSInterface.close(recognizerContext.websocket, 1000, 'CLOSE BY USER');
  }
  Promise.resolve(model)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, undefined));
}

