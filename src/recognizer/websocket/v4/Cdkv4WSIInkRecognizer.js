import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as Cdkv4WSWebsocketBuilder from './Cdkv4WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const IInkWebSocketV4Configuration = {
  types: [Constants.RecognitionType.MATH, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.NEBO],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V4',
  availableTriggers: [Constants.Trigger.POINTER_UP, Constants.Trigger.DEMAND]
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

function buildRestoreIInkSessionInput(recognizerContext, model, configuration) {
  return {
    type: 'restoreIInkSession',
    iinkSessionId: recognizerContext.sessionId,
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
    mimeTypes: configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes
  };
}

function buildOpenContentPart(recognizerContext, model, configuration) {
  return {
    type: 'openContentPart',
    id: recognizerContext.currentPartId,
    mimeTypes: configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes
  };
}

function buildConfiguration(recognizerContext, model, configuration) {
  return {
    type: 'configuration',
    math: {
      solver: configuration.recognitionParams.v4.math.solver
    }
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

function buildConvert(recognizerContext, model, configuration) {
  return { type: 'convert' };
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

function buildExport(recognizerContext, model, configuration) {
  return {
    type: 'export',
    partId: recognizerContext.currentPartId,
    mimeTypes: configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes
  };
}

/**
 * Initialize reconnect
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reconnect(configuration, model, recognizerContext, callback) {
  const reconnectCallback = (err, res) => {
    if (!err) {
      CdkWSRecognizerUtil.sendMessages(configuration, res, recognizerContext, callback, buildConfiguration, buildOpenContentPart);
    } else {
      callback(err, res);
    }
  };

  CdkWSRecognizerUtil.reconnect('/api/v4.0/iink/document', Cdkv4WSWebsocketBuilder.buildWebSocketCallback, reconnect, configuration, InkModel.updateModelSentPosition(model, model.lastPositions.lastReceivedPosition), recognizerContext)
      .then(openedModel => CdkWSRecognizerUtil.sendMessages(configuration, openedModel, recognizerContext, reconnectCallback, buildRestoreIInkSessionInput))
      .catch(err => callback(err, model)); // Error on websocket creation
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
    if (!err) {
      CdkWSRecognizerUtil.sendMessages(configuration, res, recognizerContext, callback, buildConfiguration, buildNewContentPart);
    } else {
      callback(err, res);
    }
  };

  CdkWSRecognizerUtil.init('/api/v4.0/iink/document', Cdkv4WSWebsocketBuilder.buildWebSocketCallback, reconnect, configuration, InkModel.resetModelPositions(model), recognizerContext)
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
 * Convert action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function convert(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildConvert);
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

/**
 * Export action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object)} callback
 */
export function recognize(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildExport);
}
