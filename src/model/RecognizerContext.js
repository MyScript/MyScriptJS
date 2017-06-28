import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognition context
 * @typedef {Object} RecognitionContext
 * @property {Array<function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object>|function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildMessages
 * @property {Model} model
 * @property {Configuration} configuration
 * @property {function(err: Object, res: Object)} callback
 */

/**
 * Initialization context
 * @typedef {Object} InitializationContext
 * @property {String} suffixUrl
 * @property buildWebSocketCallback
 * @property reconnect
 * @property {function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildInitMessage
 * @property {function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} buildHmacMessage
 * @property {function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} [buildConfiguration]
 * @property {function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} [buildNewContentPart]
 * @property {function(recognizerContext: RecognizerContext, model: Model, configuration: Configuration): Object} [buildOpenContentPart]
 * @property {Model} model
 * @property {Configuration} configuration
 * @property {function(err: Object, res: Object)} callback
 */

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {Element} element
 * @property {Array<RecognitionContext>} recognitionContexts
 * @property {Promise} initPromise
 * @property {RecognitionPositions} lastPositions  Last recognition sent/received stroke indexes.
 * @property {Number} dpi
 * @property {String} url
 * @property {WebSocket} websocket
 * @property {function} websocketCallback
 * @property {function} reconnect
 * @property {Number} currentReconnectionCount
 * @property {String} sessionId
 * @property {Number} contentPartCount
 * @property {String} currentPartId
 * @property {String} instanceId
 * @property {Boolean} canUndo
 * @property {Boolean} canRedo
 * @property {Boolean} idle
 */

/**
 * Create a new recognizer context
 * @param {Element} element
 * @param {Number} [dpi=96] The screen dpi resolution
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext(element, dpi = 96) {
  const id = Date.now();
  logger.info('Create empty recognizer context with ID: ' + id);
  return {
    id,
    element,
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    },
    dpi,
    url: undefined,
    websocket: undefined,
    websocketCallback: undefined,
    reconnect: undefined,
    currentReconnectionCount: 0,
    sessionId: undefined,
    contentPartCount: 0,
    currentPartId: undefined,
    instanceId: undefined,
    canUndo: false,
    canRedo: false,
    idle: true
  };
}

/**
 * Return true if a reset is required, false otherwise
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Boolean}
 */
export function isResetRequired(recognizerContext, model) {
  if (recognizerContext.lastPositions) {
    return recognizerContext.lastPositions.lastSentPosition >= model.rawStrokes.length - 1;
  }
  return false;
}

/**
 * Update the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {Number} [lastSentPosition=model.lastPositions.lastSentPosition] Index of last sent item
 * @return {RecognizerContext}
 */
export function updateRecognitionPositions(recognizerContext, model, lastSentPosition = model.lastPositions.lastSentPosition) {
  const recognizerContextRef = recognizerContext;
  recognizerContextRef.lastPositions.lastSentPosition = lastSentPosition;
  recognizerContextRef.lastPositions.lastReceivedPosition = model.lastPositions.lastReceivedPosition;
  if (recognizerContextRef.lastPositions.lastSentPosition === recognizerContextRef.lastPositions.lastReceivedPosition === -1) {
    delete recognizerContextRef.instanceId;
  }
  return recognizerContextRef;
}

/**
 * Test if it should attempt immediate reconnect
 * @param {RecognizerContext} recognizerContext
 * @return {Boolean} True if should attempt reconnect, false otherwise
 */
export function shouldAttemptImmediateReconnect(recognizerContext) {
  const recognizerContextRef = recognizerContext;
  return recognizerContextRef.websocket.autoReconnect === true && recognizerContextRef.currentReconnectionCount++ <= recognizerContextRef.websocket.maxRetryCount;
}

/**
 * Lost connection message
 * @type {{type: string}}
 */
export const LOST_CONNEXION_MESSAGE = { type: 'LOST_CONNECTION' };

