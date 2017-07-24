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
 * Init the websocket recognizer.
 * Open the connexion and proceed to the hmac challenge.
 * @param {Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {InitializationContext} initContext Initialization structure
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(configuration, model, recognizerContext, initContext) {
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, model);
  recognizerContextReference.url = buildUrl(configuration, initContext.suffixUrl);
  recognizerContextReference.reconnect = initContext.reconnect;
  if (!initContext.preserveContext) {
    recognizerContextReference.recognitionContexts = [];
  }

  const destructuredInitPromise = PromiseHelper.destructurePromise();
  recognizerContextReference.initPromise = destructuredInitPromise.promise;

  logger.debug('Opening the websocket for context ', recognizerContext);
  recognizerContextReference.websocketCallback = initContext.buildWebSocketCallback(destructuredInitPromise, configuration, model, recognizerContext, initContext);
  recognizerContextReference.websocket = NetworkWSInterface.openWebSocket(configuration, recognizerContextReference);
  return recognizerContextReference.initPromise;
}

/**
 * Send a recognition message
 * @param {RecognizerContext} recognizerContext
 * @param {RecognitionContext} recognitionContext
 */
function send(recognizerContext, recognitionContext) {
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.idle = false;

  logger.debug('Recognizer is alive. Sending message', recognitionContext);
  recognizerContextReference.recognitionContexts[0] = recognitionContext;
  recognitionContext.buildMessages.forEach((buildMessage) => {
    const message = buildMessage(recognizerContextReference, recognitionContext.model, recognitionContext.configuration);
    if (message) {
      NetworkWSInterface.send(recognizerContextReference, message);
      RecognizerContext.updateRecognitionPositions(recognizerContextReference, recognitionContext.model);
    } else {
      logger.warn('empty message');
    }
  });
}

/**
 * @param {Styles|Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 * @param {...function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildMessages
 */
export function sendMessages(configuration, model, recognizerContext, callback, ...buildMessages) {
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

  const recognizerContextRef = recognizerContext;
  if (recognizerContext.initialized) {
    recognizerContext.initPromise
      .then(() => {
        logger.trace('Init was done feeding the recognition queue');
        send(recognizerContext, recognitionContext);
      })
      .catch((exception) => {
        recognizerContextRef.initialized = false;
        if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
          logger.info('Attempting a retry', recognizerContext.currentReconnectionCount);
          recognizerContext.reconnect(configuration, model, recognizerContext, (err, res) => {
            if (!err) {
              send(recognizerContext, recognitionContext);
            } else {
              logger.error('Unable to reconnect', err);
              callback('Unable to reconnect', model);
            }
          });
        } else {
          logger.error('Unable to process recognition', exception);
          callback(exception, model);
        }
      });
  }
}

/**
 * Do what is needed to clean the server context.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.clearModel(model);
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  if (recognizerContextReference && recognizerContextReference.websocket) {
    // We have to send again all strokes after a clear.
    delete recognizerContextReference.instanceId;
    try {
      NetworkWSInterface.send(recognizerContextReference, { type: 'reset' });
    } catch (sendFailedException) {
      // To force failure without breaking the flow
      recognizerContextReference.websocketCallback(configuration, model, recognizerContextReference, PromiseHelper.destructurePromise());
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
  recognizerContext.initPromise
    .then(() => NetworkWSInterface.close(recognizerContext, 1000, RecognizerContext.CLOSE_RECOGNIZER_MESSAGE))
    .then(() => callback(undefined, model), err => callback(err, model));
}
