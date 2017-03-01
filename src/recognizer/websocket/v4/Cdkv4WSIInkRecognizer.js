import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as Cdkv4WSWebsocketBuilder from './Cdkv4WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

export { close } from '../CdkWSRecognizerUtil';

const ResultType = {
  MATH: {
    LATEX: 'application/x-latex',
    MATHML: 'application/mathml+xml',
    OFFICEOPENXMLMATH: 'application/mathofficeXML'
  },
  NEBO: {},
  DIAGRAM: {}
};

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const IInkWebSocketV4Configuration = {
  type: [MyScriptJSConstants.RecognitionType.MATH, MyScriptJSConstants.RecognitionType.NEBO, MyScriptJSConstants.RecognitionType.DIAGRAM],
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V4',
  availableFeatures: [MyScriptJSConstants.RecognizerFeature.UNDO_REDO, MyScriptJSConstants.RecognizerFeature.TYPESET, MyScriptJSConstants.RecognizerFeature.RESIZE],
  availableTriggers: [MyScriptJSConstants.RecognitionTrigger.PEN_UP],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return IInkWebSocketV4Configuration;
}

function buildNewContentPackageInput(recognizerContext, model, options) {
  return {
    type: 'newContentPackage',
    applicationKey: options.recognitionParams.server.applicationKey,
    xDpi: recognizerContext.dpi,
    yDpi: recognizerContext.dpi,
    viewSizeHeight: recognizerContext.element.clientHeight,
    viewSizeWidth: recognizerContext.element.clientWidth
  };
}

function buildNewContentPart(recognizerContext, model, options) {
  return {
    type: 'newContentPart',
    contentType: options.recognitionParams.type,
    resultTypes: options.recognitionParams[`${options.recognitionParams.type.toLowerCase()}Parameter`].resultTypes
        .map(type => ResultType[`${options.recognitionParams.type}`][type])
  };
}

function buildAddStrokes(recognizerContext, model, options) {
  const strokes = InkModel.extractPendingStrokes(model);
  return {
    type: 'addStrokes',
    pointerType: strokes[0].pointerType, // FIXME: what if there is several different pointers in stroke list?
    strokes: strokes.map(stroke => Object.assign({}, { x: stroke.x, y: stroke.y, t: stroke.t, id: stroke.id })) // FIXME: be consistent with typed / not typed strokes
  };
}

function buildUndo(recognizerContext, model, options) {
  return { type: 'undo' };
}

function buildRedo(recognizerContext, model, options) {
  return { type: 'redo' };
}

function buildClear(recognizerContext, model, options) {
  return { type: 'clear' };
}

function buildTypeset(recognizerContext, model, options) {
  return { type: 'typeset' };
}

function buildZoom(recognizerContext, model, options) {
  return {
    type: 'zoom',
    zoom: 10
  };
}

function buildResize(recognizerContext, model, options) {
  return {
    type: 'changeViewSize',
    height: recognizerContext.element.clientHeight,
    width: recognizerContext.element.clientWidth
  };
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function init(options, model, recognizerContext, callback) {
  const initCallback = (err, res) => {
    if (!err && (InkModel.extractPendingStrokes(res).length > 0)) {
      CdkWSRecognizerUtil.sendMessages(options, InkModel.updateModelSentPosition(res), recognizerContext, callback, buildNewContentPart, buildAddStrokes);
    } else if (!err) {
      CdkWSRecognizerUtil.sendMessages(options, res, recognizerContext, callback, buildNewContentPart);
    } else {
      callback(err, res);
    }
  };

  CdkWSRecognizerUtil.init('/api/v4.0/iink/document', options, InkModel.resetModelPositions(model), recognizerContext, init, Cdkv4WSWebsocketBuilder.buildWebSocketCallback)
      .then(openedModel => CdkWSRecognizerUtil.sendMessages(options, openedModel, recognizerContext, initCallback, buildNewContentPackageInput))
      .catch(err => callback(err, model)); // Error on websocket creation
}

/**
 * Add strokes to the model
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function addStrokes(options, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(options, InkModel.updateModelSentPosition(model), recognizerContext, callback, buildAddStrokes);
}

/**
 * Resize
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function resize(options, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildResize);
}


/**
 * Undo last action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function undo(options, model, recognizerContext, callback) {
  logger.debug('Send undo message');
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildUndo);
}

/**
 * Redo last action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function redo(options, model, recognizerContext, callback) {
  logger.debug('Send redo message');
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildRedo);
}


/**
 * Clear action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(options, model, recognizerContext, callback) {
  logger.debug('Send clear message');
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildClear);
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reset(options, model, recognizerContext, callback) {
  clear(options, model, recognizerContext, callback);
}

/**
 * Typeset action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function typeset(options, model, recognizerContext, callback) {
  logger.debug('Send typeset message');
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildTypeset);
}

/**
 * Zoom action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function zoom(options, model, recognizerContext, callback) {
  logger.debug('Send zoom message');
  CdkWSRecognizerUtil.sendMessages(options, model, recognizerContext, callback, buildZoom);
}
