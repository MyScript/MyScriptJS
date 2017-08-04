import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognition context
 * @typedef {Object} RecognitionContext
 * @property {Array<function(recognizerContext: RecognizerContext, model: Model): Object>|function(recognizerContext: RecognizerContext, model: Model): Object} buildMessages
 * @property {Model} model
 * @property {function(err: Object, res: Model, types: ...String)} callback
 */

/**
 * Initialization context
 * @typedef {Object} InitializationContext
 * @property {String} suffixUrl
 * @property buildWebSocketCallback
 * @property {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} reconnect
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} buildInitMessage
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} buildHmacMessage
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} [buildConfiguration]
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} [buildSetTheme]
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} [buildSetPenStyle]
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} [buildNewContentPart]
 * @property {function(recognizerContext: RecognizerContext, model: Model): Object} [buildOpenContentPart]
 * @property {Boolean} [preserveContext]
 * @property {Model} model
 * @property {function(err: Object, res: Model, types: ...String)} callback
 */

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {function(): Element} getElement Get current element
 * @property {function(): Theme} getTheme Get current theme
 * @property {function(): PenStyle} getPenStyle Get current penStyle
 * @property {function(): Configuration} getConfiguration Get current configuration
 * @property {Array<RecognitionContext>} recognitionContexts=[]
 * @property {Promise} initPromise=undefined
 * @property {RecognitionPositions} lastPositions  Last recognition sent/received stroke indexes.
 * @property {Number} dpi=96
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
 * @property {Boolean} idle=true
 * @property {Boolean} initialized=false
 */

/**
 * Create a new recognizer context
 * @param {Editor} editor
 * @param {Number} [dpi=96] The screen dpi resolution
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext(editor, dpi = 96) {
  const id = Date.now();
  logger.info('Create empty recognizer context with ID: ' + id);
  return {
    id,
    getElement: () => editor.domElement,
    getTheme: () => editor.theme,
    getPenStyle: () => editor.penStyle,
    getConfiguration: () => editor.configuration,
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

/**
 * Explicit close message
 * @type {String}
 */
export const CLOSE_RECOGNIZER_MESSAGE = 'CLOSE_RECOGNIZER';

