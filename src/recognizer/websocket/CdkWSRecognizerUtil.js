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
  recognizerContextReference.recognitionContexts = [];

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
 * @param {function(recognizerContext: RecognizerContext, recognitionContext: RecognitionContext)} attemptReconnect
 */
function send(recognizerContext, recognitionContext, attemptReconnect) {
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.idle = false;

  logger.debug('Recognizer is alive. Sending message', recognitionContext);
  recognizerContextReference.recognitionContexts[0] = recognitionContext;
  try {
    recognitionContext.buildMessages.forEach((buildMessage) => {
      NetworkWSInterface.send(recognizerContextReference, buildMessage(recognizerContextReference, recognitionContext.model, recognitionContext.configuration));
      RecognizerContext.updateRecognitionPositions(recognizerContextReference, recognitionContext.model);
    });
  } catch (sendException) {
    if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContextReference) && recognizerContext.reconnect) {
      attemptReconnect(recognizerContext, recognitionContext);
    } else {
      logger.error('Send exception', sendException);
      throw RecognizerContext.LOST_CONNEXION_MESSAGE;
    }
  }
}

/**
 * @param {Styles|Configuration} configuration
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @param {function(err: Object, res: Object)} callback
 * @param {...function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildMessages
 */
export function sendMessages(configuration, model, recognizerContext, callback, ...buildMessages) {
  const attemptReconnect = (recognizerCtx, recognitionCtx) => {
    logger.info('Unable to reach cloud', recognitionCtx.model);
    logger.info('Attempting a retry', recognizerCtx.currentReconnectionCount);
    recognizerCtx.reconnect(recognitionCtx.configuration, recognitionCtx.model, recognizerCtx, (err, res) => {
      if (!err) {
        sendMessages(recognitionCtx.configuration, res, recognizerCtx, recognitionCtx.callback, ...recognitionCtx.buildMessages);
      } else {
        logger.error('Unable to reconnect', err);
        recognitionCtx.callback('Unable to reconnect', recognitionCtx.model);
      }
    });
  };

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

  recognizerContext.initPromise
    .then(() => {
      logger.trace('Init was done feeding the recognition queue');
      try {
        send(recognizerContext, recognitionContext, attemptReconnect);
      } catch (recognitionError) {
        logger.error('Unable to process recognition', recognitionError);
        recognitionContext.callback(recognitionError, model);
      }
    }, /* rejection */ () => {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
        attemptReconnect(recognizerContext, recognitionContext);
      } else {
        logger.error('Unable to init');
        recognitionContext.callback('Unable to init', model);
      }
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
  NetworkWSInterface.close(recognizerContext, 1000, 'CLOSE BY USER');
}
