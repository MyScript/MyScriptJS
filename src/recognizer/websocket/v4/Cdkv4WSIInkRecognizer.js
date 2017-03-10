import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as Cdkv4WSWebsocketBuilder from './Cdkv4WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const IInkWebSocketV4Configuration = {
  type: [MyScriptJSConstants.RecognitionType.MATH, MyScriptJSConstants.RecognitionType.NEBO, MyScriptJSConstants.RecognitionType.DIAGRAM],
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V4',
  availableFeatures: [MyScriptJSConstants.RecognizerFeature.UNDO_REDO, MyScriptJSConstants.RecognizerFeature.TYPESET, MyScriptJSConstants.RecognizerFeature.RESIZE],
  availableTriggers: [MyScriptJSConstants.RecognitionTrigger.POINTER_UP],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.POINTER_UP
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return IInkWebSocketV4Configuration;
}

function buildNewContentPackageInput(recognizerContext, model, configuration) {
  return {
    type: 'newContentPackage',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    xDpi: recognizerContext.dpi,
    yDpi: recognizerContext.dpi,
    viewSizeHeight: recognizerContext.element.clientHeight,
    viewSizeWidth: recognizerContext.element.clientWidth
  };
}

function buildNewContentPart(recognizerContext, model, configuration) {
  return {
    type: 'newContentPart',
    contentType: configuration.recognitionParams.type,
    resultTypes: configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].resultTypes
  };
}

function buildAddStrokes(recognizerContext, model, configuration) {
  const strokes = InkModel.extractPendingStrokes(model);
  return {
    type: 'addStrokes',
    pointerType: strokes[0].pointerType, // FIXME: what if there is several different pointers in stroke list?
    strokes: strokes.map(stroke => Object.assign({}, { x: stroke.x, y: stroke.y, t: stroke.t, id: stroke.id })) // FIXME: be consistent with typed / not typed strokes
  };
}

function buildUndo(recognizerContext, model, configuration) {
  return { type: 'undo' };
}

function buildRedo(recognizerContext, model, configuration) {
  return { type: 'redo' };
}

function buildClear(recognizerContext, model, configuration) {
  return { type: 'clear' };
}

function buildTypeset(recognizerContext, model, configuration) {
  return { type: 'typeset' };
}

function buildZoom(recognizerContext, model, configuration) {
  return {
    type: 'zoom',
    zoom: 10
  };
}

function buildResize(recognizerContext, model, configuration) {
  return {
    type: 'changeViewSize',
    height: recognizerContext.element.clientHeight,
    width: recognizerContext.element.clientWidth
  };
}

/**
 * Initialize recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function init(configuration, model, recognizerContext, callback) {
  const initCallback = (err, res) => {
    if (!err && (InkModel.extractPendingStrokes(res).length > 0)) {
      CdkWSRecognizerUtil.sendMessages(configuration, InkModel.updateModelSentPosition(res), recognizerContext, callback, buildNewContentPart, buildAddStrokes);
    } else if (!err) {
      CdkWSRecognizerUtil.sendMessages(configuration, res, recognizerContext, callback, buildNewContentPart);
    } else {
      callback(err, res);
    }
  };

  CdkWSRecognizerUtil.init('/api/v4.0/iink/document', configuration, InkModel.resetModelPositions(model), recognizerContext, Cdkv4WSWebsocketBuilder.buildWebSocketCallback)
      .then(openedModel => CdkWSRecognizerUtil.sendMessages(configuration, openedModel, recognizerContext, initCallback, buildNewContentPackageInput))
      .catch(err => callback(err, model)); // Error on websocket creation
}

/**
 * Add strokes to the model
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function addStrokes(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, InkModel.updateModelSentPosition(model), recognizerContext, callback, buildAddStrokes);
}

/**
 * Resize
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function resize(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildResize);
}


/**
 * Undo last action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function undo(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildUndo);
}

/**
 * Redo last action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function redo(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildRedo);
}

/**
 * Clear action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildClear);
}

/**
 * Typeset action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function typeset(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildTypeset);
}

/**
 * Zoom action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function zoom(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildZoom);
}
