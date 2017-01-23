import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkWSInterface from '../../networkHelper/websocket/networkWSInterface';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as PromiseHelper from '../../../util/PromiseHelper';
import * as InkModel from '../../../model/InkModel';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as RecognizerContext from '../../../model/RecognizerContext';

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
  return scheme + '://' + options.recognitionParams.server.host + suffixUrl;
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
 * @param {RecognizerContext} recognizerContext
 * @return {Promise} Fulfilled when the init phase is over.
 */
export function init(suffixUrl, options, recognizerContext) {
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.suffixUrl = suffixUrl;
  recognizerContextReference.options = options;
  const url = buildUrl(options, suffixUrl);
  const destructuredInitPromise = PromiseHelper.destructurePromise();

  logger.debug('Opening the websocket for context ', recognizerContextReference);
  const initCallback = Cdkv3WSWebsocketBuilder.buildWebSocketCallback(destructuredInitPromise, recognizerContextReference, options);
  recognizerContextReference.url = url;
  recognizerContextReference.callback = initCallback;
  recognizerContextReference.options = options;
  recognizerContextReference.currentReconnexionCount = 0;
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(recognizerContextReference);
  recognizerContextReference.recognitionContexts = [];

  // Feeding the recognitionContext
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  destructuredInitPromise.promise.then(
      (value) => {
        logger.debug('Init over ' + value);
      }
  ).catch(
      (error) => {
        logger.error('fatal error while loading recognizer');
      }
  );
  return recognizerContextReference.initPromise;
}


function send(recognizerContext, recognitionContext) {
  const recognizerContextReference = recognizerContext;
  const recognitionContextReference = recognitionContext;

  logger.debug('Recognizer is alive. Sending last stroke');
  recognizerContextReference.recognitionContexts.push(recognitionContextReference);

  if (recognizerContextReference.lastRecognitionPositions.lastSentPosition < 0) {
    // In websocket the last stroke is getLastPendingStrokeAsJsonArray as soon as possible to the server.
    const strokes = recognitionContextReference.model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke));
    NetworkWSInterface.send(recognizerContextReference, recognitionContext.buildInputFunction(recognizerContextReference, recognitionContextReference.model, recognitionContextReference.options), true);
    recognizerContextReference.lastRecognitionPositions.lastSentPosition = strokes.length - 1;
  } else {
    // In websocket the last stroke is getLastPendingStrokeAsJsonArray as soon as possible to the server.
    RecognizerContext.updateSentRecognitionPositions(recognizerContextReference, recognitionContextReference.model);
    const strokes = InkModel.extractPendingStrokes(recognitionContextReference.model, -1).map(stroke => StrokeComponent.toJSON(stroke));
    try {
      NetworkWSInterface.send(recognizerContextReference, recognitionContext.buildInputFunction(recognizerContextReference, recognitionContextReference.model, recognitionContextReference.options));
      recognizerContextReference.lastRecognitionPositions.lastSentPosition++;
    } catch (sendException) {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContextReference)) {
        init(recognizerContextReference.suffixUrl, recognizerContextReference.options, recognizerContextReference).then(() => {
          logger.info('Attempting a retry', recognizerContextReference.currentReconnexionCount);
          recognizerContextReference.lastRecognitionPositions.lastSentPosition = -1;
          send(recognizerContextReference, recognitionContext);
        });
      } else {
        throw RecognizerContext.LOST_CONNEXION_MESSAGE;
      }
    }
  }
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise}
 */
export function reset(options, model, recognizerContext) {
  const recognizerContextReference = recognizerContext;
  RecognizerContext.resetRecognitionPositions(recognizerContext, model);
  if (recognizerContextReference && recognizerContextReference.websocket) {
    // We have to send again all strokes after a reset.
    delete recognizerContextReference.instanceId;
    try {
      NetworkWSInterface.send(recognizerContextReference, { type: 'reset' }, true);
    } catch (sendFailedException) {
      Cdkv3WSWebsocketBuilder.buildWebSocketCallback(() => {
      }, recognizerContextReference, options);
    }
  }
  // We do not keep track of the success of reset.
  return Promise.resolve();
}

/**
 * @param {Options} options
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model, options: Options): Object} buildInputFunction
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, recognizerContext, model, buildInputFunction) {
  const destructuredRecognitionPromise = PromiseHelper.destructurePromise();
  const recognizerContextReference = recognizerContext;

  // Building an object with all mandatory fields to feed the recognition queue.
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
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Promise}
 */
export function close(options, model, recognizerContext) {
  if (recognizerContext && recognizerContext.websocket) {
    NetworkWSInterface.close(recognizerContext.websocket, 1000, 'CLOSE BY USER');
  }
}

