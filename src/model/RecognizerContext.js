import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognition context
 * @typedef {Object} RecognitionContext
 * @property {Model} model
 * @property {Callback} callback
 */

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {Editor} editor Get a reference to the current editor
 * @property {Array<RecognitionContext>} recognitionContexts=[]
 * @property {Promise} initPromise=undefined
 * @property {RecognitionPositions} lastPositions  Last recognition sent/received stroke indexes.
 * @property {String} url=undefined
 * @property {WebSocket} websocket=undefined
 * @property {function} websocketCallback=undefined
 * @property {function} reconnect=undefined
 * @property {Number} currentReconnectionCount=0
 * @property {String} sessionId=undefined
 * @property {Number} contentPartCount=0
 * @property {String} currentPartId=undefined
 * @property {String} instanceId=undefined
 * @property {Boolean} canUndo=false
 * @property {Boolean} canRedo=false
 * @property {Boolean} isEmpty=false
 * @property {Array} supportedImportMimeTypes=[]
 * @property {Number} undoStackIndex=0
 * @property {Number} possibleUndoCount=0
 * @property {Boolean} idle=true
 * @property {Boolean} initialized=false
 */
/**
 * Create a new recognizer context
 * @param {Editor} editor
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext(editor) {
  const id = Date.now();
  logger.info('Create empty recognizer context with ID: ' + id);
  return {
    id,
    editor,
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    },
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
    isEmpty: undefined,
    supportedImportMimeTypes: [],
    undoStackIndex: 0,
    possibleUndoCount: 0,
    idle: true,
    initialized: false
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
 * @param {RecognitionPositions} positions Current recognition positions
 * @return {RecognizerContext}
 */
export function updateRecognitionPositions(recognizerContext, positions) {
  const recognizerContextRef = recognizerContext;
  if (positions) {
    recognizerContextRef.lastPositions.lastSentPosition = positions.lastSentPosition;
    recognizerContextRef.lastPositions.lastReceivedPosition = positions.lastReceivedPosition;
  }
  if (recognizerContextRef.lastPositions.lastSentPosition === recognizerContextRef.lastPositions.lastReceivedPosition === -1) {
    delete recognizerContextRef.instanceId;
  }
  return recognizerContextRef;
}

/**
 * Set the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognitionContext} recognitionContext
 * @return {RecognizerContext}
 */
export function setRecognitionContext(recognizerContext, recognitionContext) {
  const recognizerContextRef = recognizerContext;
  recognizerContextRef.recognitionContexts[0] = recognitionContext;
  return recognizerContextRef;
}


/**
 * Test if it is possible to reconnect
 * @param {RecognizerContext} recognizerContext
 * @return {Boolean} True if possible, false otherwise
 */
export function canReconnect(recognizerContext) {
  return recognizerContext.websocket.autoReconnect === true && recognizerContext.currentReconnectionCount <= recognizerContext.websocket.maxRetryCount;
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

/**
 * Explicit close message
 * @type {String}
 */
export const CLOSE_RECOGNIZER_MESSAGE = 'CLOSE_RECOGNIZER';

