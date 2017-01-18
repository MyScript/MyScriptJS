import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import * as Cdkv4WSWebsocketBuilder from './Cdkv4WSBuilder';
import * as PromiseHelper from '../../../util/PromiseHelper';
import * as RecognizerContext from '../../../model/RecognizerContext';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * Common configuration
 * @type {{availableTriggers: Array<String>, preferredTrigger: String}}
 */
export const commonWebSocketV3Configuration = {
  availableTriggers: [MyScriptJSConstants.RecognitionTrigger.PEN_UP],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
};

function buildUrl(options, suffixUrl) {
  const scheme = (options.recognitionParams.server.scheme === 'https') ? 'wss' : 'ws';
  return `${scheme}://${options.recognitionParams.server.host}${suffixUrl}`;
}

/**
 * Update model lastReceivedPosition regarding to lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
export function updateModelReceivedPosition(model) {
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = modelReference.lastRecognitionPositions.lastSentPosition;
  return modelReference;
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
  const url = buildUrl(options, suffixUrl);
  RecognizerContext.resetRecognitionPositions(recognizerContext, model);
  const destructuredInitPromise = PromiseHelper.destructurePromise();

  logger.debug('Opening the websocket for context ', recognizerContext);
  const initCallback = Cdkv4WSWebsocketBuilder.buildWebSocketCallback(destructuredInitPromise, recognizerContext);
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.suffixUrl = suffixUrl;
  recognizerContextReference.options = options;
  recognizerContextReference.url = url;
  recognizerContextReference.callback = initCallback;
  recognizerContextReference.options = options;
  recognizerContextReference.currentReconnexionCount = 0;
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(recognizerContextReference);
  recognizerContextReference.recognitionContexts = [];

  // Feeding the recognitionContext
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  return recognizerContextReference.initPromise
      .then(value => logger.debug('Init over ' + value))
      .then(() => model)
      .catch(error => logger.error('fatal error while loading recognizer'));
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.recognitionContexts = [];
  RecognizerContext.resetRecognitionPositions(recognizerContext, model);
  if (recognizerContextReference && recognizerContextReference.websocket) {
    // We have to send again all strokes after a reset.
    delete recognizerContextReference.instanceId;
    try {
      NetworkWSInterface.send(recognizerContextReference, { type: 'reset' });
    } catch (sendFailedException) {
      // To force failure without breaking the flow
      Cdkv4WSWebsocketBuilder.buildWebSocketCallback(PromiseHelper.destructurePromise(), recognizerContextReference);
    }
  }
  // We do not keep track of the success of reset.
  return Promise.resolve(model);
}


/**
 * Recognition context
 * @typedef {Object} RecognitionContext
 * @property {function(recognizerContext: RecognizerContext, model: Model, options: Options): Object} buildMessage
 * @property {Model} model
 * @property {Options} options
 * @property {DestructuredPromise} recognitionPromiseCallbacks
 */

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
    recognitionContext.buildMessages.forEach(buildMessage => NetworkWSInterface.send(recognizerContextReference, buildMessage(recognizerContextReference, recognitionContext.model, recognitionContext.options)));
    RecognizerContext.updateSentRecognitionPositions(recognizerContextReference, recognitionContext.model);
  } catch (sendException) {
    if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContextReference)) {
      init(recognizerContextReference.suffixUrl, recognizerContextReference.options, recognizerContextReference.model, recognizerContextReference)
          .then(() => {
            logger.info('Attempting a retry', recognizerContextReference.currentReconnexionCount);
            send(recognizerContextReference, recognitionContext);
          });
    } else {
      logger.error('Send exception', sendException);
      throw RecognizerContext.LOST_CONNEXION_MESSAGE;
    }
  }
}

/**
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {Options} options
 * @param {Array<function(recognizerContext: RecognizerContext, model: Model, options: Options): Object>} buildMessages
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function sendMessages(recognizerContext, model, options, ...buildMessages) {
  const destructuredRecognitionPromise = PromiseHelper.destructurePromise();
  const recognizerContextReference = recognizerContext;

  // Building an object with all mandatory fields to feed the recognition queue.
  /** @type {RecognitionContext} **/
  const recognitionContext = {
    buildMessages,
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
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Promise.<Model>}
 */
export function close(options, model, recognizerContext) {
  RecognizerContext.resetRecognitionPositions(recognizerContext, model);
  if (recognizerContext && recognizerContext.websocket) {
    NetworkWSInterface.close(recognizerContext.websocket, 1000, 'CLOSE BY USER');
  }
  return Promise.resolve(model);
}

