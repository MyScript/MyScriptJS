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

function buildHmacMessage(recognizerContext, message, configuration) {
  return {
    type: 'hmac',
    hmac: CryptoHelper.computeHmac(message.data.hmacChallenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
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
    mimeTypes: (configuration.triggers.exportContent !== Constants.Trigger.DEMAND) ?
      configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes : undefined
  };
}

function buildOpenContentPart(recognizerContext, model, configuration) {
  return {
    type: 'openContentPart',
    id: recognizerContext.currentPartId,
    mimeTypes: (configuration.triggers.exportContent !== Constants.Trigger.DEMAND) ?
      configuration.recognitionParams.v4[`${configuration.recognitionParams.type.toLowerCase()}`].mimeTypes : undefined
  };
}

function buildConfiguration(recognizerContext, model, configuration) {
  return Object.assign({ type: 'configuration' }, configuration.recognitionParams.v4);
}

function buildAddStrokes(recognizerContext, model, configuration) {
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

function buildWaitForIdle(recognizerContext, model, configuration) {
  return {
    type: 'waitForIdle'
  };
}

// FIXME Find another way to pass style without override model
function buildSetPenStyle(recognizerContext, penStyle, configuration) {
  return {
    type: 'setPenStyle',
    style: DefaultPenStyle.toString(penStyle)
  };
}

// FIXME Find another way to pass style without override model
function buildSetTheme(recognizerContext, theme, configuration) {
  return {
    type: 'setTheme',
    theme: DefaultTheme.toString(theme)
  };
}

/**
 * Initialize reconnect
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function reconnect(configuration, model, recognizerContext, callback) {
  const initContext = {
    suffixUrl: '/api/v4.0/iink/document',
    buildWebSocketCallback: Cdkv4WSWebsocketBuilder.buildWebSocketCallback,
    buildInitMessage: buildRestoreIInkSessionInput,
    buildHmacMessage,
    buildConfiguration,
    buildOpenContentPart,
    reconnect,
    preserveContext: true,
    model,
    configuration,
    callback
  };

  CdkWSRecognizerUtil.init(configuration, InkModel.updateModelSentPosition(model, model.lastPositions.lastReceivedPosition), recognizerContext, initContext)
    .then((res) => {
      logger.debug('Reconnect over', res);
      callback(undefined, res, Constants.EventType.CHANGED);
      return res;
    })
    .catch((err) => {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
        logger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
        recognizerContext.reconnect(configuration, model, recognizerContext, callback);
      } else {
        logger.error('Unable to reconnect', err);
        callback(err, model);
      }
    });
}

/**
 * Initialize recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function init(configuration, model, recognizerContext, callback) {
  const initContext = {
    suffixUrl: '/api/v4.0/iink/document',
    buildWebSocketCallback: Cdkv4WSWebsocketBuilder.buildWebSocketCallback,
    buildInitMessage: buildNewContentPackageInput,
    buildHmacMessage,
    buildConfiguration,
    buildNewContentPart,
    reconnect,
    model,
    configuration,
    callback
  };

  CdkWSRecognizerUtil.init(configuration, InkModel.resetModelPositions(model), recognizerContext, initContext)
    .then((res) => {
      logger.debug('Init over', res);
      callback(undefined, res, Constants.EventType.CHANGED);
      return res;
    })
    .catch((err) => {
      if (RecognizerContext.shouldAttemptImmediateReconnect(recognizerContext) && recognizerContext.reconnect) {
        logger.info('Attempting a reconnect', recognizerContext.currentReconnectionCount);
        recognizerContext.reconnect(configuration, model, recognizerContext, callback);
      } else {
        logger.error('Unable to init', err);
        callback(err, model);
      }
    });
}

/**
 * Create a new content part
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function newContentPart(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildNewContentPart);
}

/**
 * Open the recognizer context content part
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function openContentPart(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildOpenContentPart);
}

/**
 * Add strokes to the model
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function addStrokes(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildAddStrokes);
}

/**
 * Resize
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function resize(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildResize);
}


/**
 * Undo last action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function undo(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildUndo);
}

/**
 * Redo last action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function redo(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildRedo);
}

/**
 * Clear action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildClear);
}

/**
 * Convert action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function convert(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildConvert);
}

/**
 * Zoom action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function zoom(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildZoom);
}

/**
 * Export action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function exportContent(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildExport);
}

/**
 * WaitForIdle action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function waitForIdle(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildWaitForIdle);
}

/**
 * SetPenStyle action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function setPenStyle(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildSetPenStyle);
}

/**
 * SetTheme action
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function setTheme(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, model, recognizerContext, callback, buildSetTheme);
}
