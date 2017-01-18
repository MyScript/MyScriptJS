import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv4WSRecognizerUtil from '../../cdkv4/websocket/Cdkv4WSRecognizerUtil';

export { close } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {{type: String, protocol: String, apiVersion: String}}
 */
export const mathWebSocketV4Configuration = {
  type: MyScriptJSConstants.RecognitionType.MATH,
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V4'
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return Object.assign({}, Cdkv4WSRecognizerUtil.commonWebSocketV3Configuration, mathWebSocketV4Configuration);
}

function buildNewContentPackageInput(recognizerContext, model, options) {
  return {
    type: 'newContentPackage',
    applicationKey: options.recognitionParams.server.applicationKey,
    xDpi: 96,
    yDpi: 96,
    viewSizeHeight: recognizerContext.element.clientHeight,
    viewSizeWidth: recognizerContext.element.clientWidth
  };
}

function buildNewContentPart(recognizerContext, model, options) {
  return {
    type: 'newContentPart',
    contentType: options.recognitionParams.type
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

function buildResize(recognizerContext, model, options) {
  return {
    type: 'viewSizeChanged',
    height: recognizerContext.element.clientHeight,
    width: recognizerContext.element.clientWidth
  };
}

function processRecognitionResult(model) {
  const modelReference = model;
  return modelReference;
}

function processRenderingResult(model) {
  const modelReference = model;
  return modelReference;
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(options, model, recognizerContext) {
  return Cdkv4WSRecognizerUtil.init('/api/v4.0/iink/document', options, model, recognizerContext)
      .then(initModel => Cdkv4WSRecognizerUtil.sendMessages(recognizerContext, initModel, options, buildNewContentPackageInput, buildNewContentPart));
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  return Cdkv4WSRecognizerUtil.close(options, model, recognizerContext)
      .then(closedModel => init(options, closedModel, recognizerContext));
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv4WSRecognizerUtil.sendMessages(recognizerContext, model, options, buildAddStrokes)
      .then(processRecognitionResult)
      .then(processRenderingResult)
      .then(Cdkv4WSRecognizerUtil.updateModelReceivedPosition);
}

/**
 * Resize
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function resize(options, model, recognizerContext) {
  Cdkv4WSRecognizerUtil.sendMessages(recognizerContext, model, options, buildResize);
  return Promise.resolve(model);
}


/**
 * Undo last action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function undo(options, model, recognizerContext) {
  logger.debug('Send undo message');
  return Cdkv4WSRecognizerUtil.sendMessages(recognizerContext, model, options, buildUndo);
}

/**
 * Redo last action
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function redo(options, model, recognizerContext) {
  logger.debug('Send redo message');
  return Cdkv4WSRecognizerUtil.sendMessages(recognizerContext, model, options, buildRedo);
}

/**
 * Clear
 * @param {Options} options Current options.
 * @param {Model} model Current model.
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function clear(options, model, recognizerContext) {
  return Promise.resolve(InkModel.createModel(options));
}
