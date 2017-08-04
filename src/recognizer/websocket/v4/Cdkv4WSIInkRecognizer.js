import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as CryptoHelper from '../../CryptoHelper';
import Constants from '../../../configuration/Constants';
import * as DefaultPenStyle from '../../../configuration/DefaultPenStyle';
import * as DefaultTheme from '../../../configuration/DefaultTheme';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as Cdkv4WSWebsocketBuilder from './Cdkv4WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const IInkWebSocketV4Configuration = {
  types: [Constants.RecognitionType.MATH, Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.NEBO],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V4',
  availableTriggers: {
    exportContent: [Constants.Trigger.POINTER_UP, Constants.Trigger.DEMAND],
    addStrokes: [Constants.Trigger.POINTER_UP]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return IInkWebSocketV4Configuration;
}

function buildHmacMessage(recognizerContext, message) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'hmac',
    hmac: CryptoHelper.computeHmac(message.data.hmacChallenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

function buildNewContentPackageInput(recognizerContext, model) {
  return {
    type: 'newContentPackage',
    applicationKey: recognizerContext.getConfiguration().recognitionParams.server.applicationKey,
    xDpi: recognizerContext.dpi,
    yDpi: recognizerContext.dpi,
    viewSizeHeight: recognizerContext.getElement().clientHeight,
    viewSizeWidth: recognizerContext.getElement().clientWidth
  };
}

function buildRestoreIInkSessionInput(recognizerContext, model) {
  return {
    type: 'restoreIInkSession',
    iinkSessionId: recognizerContext.sessionId,
    applicationKey: recognizerContext.getConfiguration().recognitionParams.server.applicationKey,
    xDpi: recognizerContext.dpi,
    yDpi: recognizerContext.dpi,
    viewSizeHeight: recognizerContext.getElement().clientHeight,
    viewSizeWidth: recognizerContext.getElement().clientWidth
  };
}


function buildNewContentPart(recognizerContext, model) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'newContentPart',
    contentType: configuration.recognitionParams.type,
    mimeTypes: (configuration.triggers.exportContent !== Constants.Trigger.DEMAND) ?
      configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes : undefined
  };
}

function buildOpenContentPart(recognizerContext, model) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'openContentPart',
    id: recognizerContext.currentPartId,
    mimeTypes: (configuration.triggers.exportContent !== Constants.Trigger.DEMAND) ?
      configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes : undefined
  };
}

function buildConfiguration(recognizerContext, model) {
  return Object.assign({ type: 'configuration' }, recognizerContext.getConfiguration().recognitionParams.v4);
}

function buildAddStrokes(recognizerContext, model) {
  const strokes = InkModel.extractPendingStrokes(model, recognizerContext.lastPositions.lastSentPosition + 1);
  if (strokes.length > 0) {
    InkModel.updateModelSentPosition(model);
    return {
      type: 'addStrokes',
      strokes: strokes.map(stroke => Object.assign({}, {
        id: stroke.id,
        pointerType: stroke.pointerType,
        pointerId: stroke.pointerId,
        x: stroke.x,
        y: stroke.y,
        t: stroke.t,
        p: stroke.p
      }))
    };
  }
  return undefined;
}

function buildUndo(recognizerContext, model) {
  return { type: 'undo' };
}

function buildRedo(recognizerContext, model) {
  return { type: 'redo' };
}

function buildClear(recognizerContext, model) {
  return { type: 'clear' };
}

function buildConvert(recognizerContext, model) {
  return { type: 'convert' };
}

function buildZoom(recognizerContext, model) {
  return {
    type: 'zoom',
    zoom: 10
  };
}

function buildResize(recognizerContext, model) {
  return {
    type: 'changeViewSize',
    height: recognizerContext.getElement().clientHeight,
    width: recognizerContext.getElement().clientWidth
  };
}

function buildExport(recognizerContext, model) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'export',
    partId: recognizerContext.currentPartId,
    mimeTypes: configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes
  };
}

function buildWaitForIdle(recognizerContext, model) {
  return {
    type: 'waitForIdle'
  };
}

function buildSetPenStyle(recognizerContext, model) {
  return {
    type: 'setPenStyle',
    style: DefaultPenStyle.toString(recognizerContext.getPenStyle())
  };
}

function buildSetTheme(recognizerContext, model) {
  return {
    type: 'setTheme',
    theme: DefaultTheme.toString(recognizerContext.getTheme())
  };
}

/**
 * Initialize reconnect
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function reconnect(recognizerContext, model, callback) {
  const initContext = {
    suffixUrl: '/api/v4.0/iink/document',
    buildWebSocketCallback: Cdkv4WSWebsocketBuilder.buildWebSocketCallback,
    buildInitMessage: buildRestoreIInkSessionInput,
    buildHmacMessage,
    buildConfiguration,
    buildSetTheme,
    buildSetPenStyle,
    buildOpenContentPart,
    reconnect,
    preserveContext: true,
    model,
    configuration: recognizerContext.getConfiguration(),
    callback
  };

  CdkWSRecognizerUtil.init(recognizerContext, InkModel.updateModelSentPosition(model, model.lastPositions.lastReceivedPosition), initContext)
    .then((res) => {
      logger.debug('Reconnect over', res);
      callback(undefined, res, Constants.EventType.CHANGED);
      return res;
    })
    .catch((err) => {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
        logger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
        recognizerContext.reconnect(recognizerContext, model, callback);
      } else {
        logger.error('Unable to reconnect', err);
        callback(err, model);
      }
    });
}

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function init(recognizerContext, model, callback) {
  const initContext = {
    suffixUrl: '/api/v4.0/iink/document',
    buildWebSocketCallback: Cdkv4WSWebsocketBuilder.buildWebSocketCallback,
    buildInitMessage: buildNewContentPackageInput,
    buildHmacMessage,
    buildConfiguration,
    buildSetTheme,
    buildSetPenStyle,
    buildNewContentPart,
    reconnect,
    model,
    callback
  };

  CdkWSRecognizerUtil.init(recognizerContext, InkModel.resetModelPositions(model), initContext)
    .then((res) => {
      logger.debug('Init over', res);
      callback(undefined, res, Constants.EventType.CHANGED);
      return res;
    })
    .catch((err) => {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
        logger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
        recognizerContext.reconnect(recognizerContext, model, callback);
      } else {
        logger.error('Unable to init', err);
        callback(err, model);
      }
    });
}

/**
 * Create a new content part
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function newContentPart(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildNewContentPart);
}

/**
 * Open the recognizer context content part
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function openContentPart(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildOpenContentPart);
}

/**
 * Add strokes to the model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function addStrokes(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildAddStrokes);
}

/**
 * Resize
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function resize(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildResize);
}


/**
 * Undo last action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function undo(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildUndo);
}

/**
 * Redo last action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function redo(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildRedo);
}

/**
 * Clear action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function clear(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildClear);
}

/**
 * Convert action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function convert(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildConvert);
}

/**
 * Zoom action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function zoom(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildZoom);
}

/**
 * Export action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function exportContent(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildExport);
}

/**
 * WaitForIdle action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function waitForIdle(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildWaitForIdle);
}

/**
 * SetPenStyle action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function setPenStyle(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildSetPenStyle);
}

/**
 * SetTheme action
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 * @param {function(err: Object, res: Model, types: ...String)} callback
 */
export function setTheme(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildSetTheme);
}
