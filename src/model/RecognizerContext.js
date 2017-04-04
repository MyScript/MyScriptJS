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
 * @property {String} instanceId
 * @property {Boolean} canUndo
 * @property {Boolean} canRedo
 * @property {Boolean} canClear
 */

/**
 * Create a new recognizer context
 * @param {Element} element
 * @param {Number} [dpi=96] The screen dpi resolution
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext(element, dpi = 96) {
  return {
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
    currentReconnectionCount: undefined,
    instanceId: undefined,
    canUndo: false,
    canRedo: false
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
 * @return {RecognizerContext}
 */
export function updateRecognitionPositions(recognizerContext, model) {
  const recognizerContextRef = recognizerContext;
  recognizerContextRef.lastPositions.lastSentPosition = model.lastPositions.lastSentPosition;
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

