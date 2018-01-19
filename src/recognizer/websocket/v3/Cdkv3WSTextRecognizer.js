import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as CryptoHelper from '../../CryptoHelper';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';
import * as DefaultRecognizer from '../../DefaultRecognizer';
import * as Cdkv3CommonTextRecognizer from '../../common/v3/Cdkv3CommonTextRecognizer';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const textWebSocketV3Configuration = {
  types: [Constants.RecognitionType.TEXT],
  protocol: Constants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [Constants.Trigger.POINTER_UP]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return textWebSocketV3Configuration;
}

function buildTextInput(recognizerContext, model) {
  InkModel.updateModelSentPosition(model);
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
    const configuration = recognizerContext.editor.configuration;
    return {
      type: 'start',
      textParameter: configuration.recognitionParams.v3.textParameter,
      inputUnits: [{
        textInputType: 'MULTI_LINE_TEXT',
        components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
      }]
    };
  }

  return {
    type: 'continue',
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };
}

function buildResetMessage(model) {
  InkModel.resetModelPositions(model);
  return {
    type: 'reset'
  };
}

const textCallback = (model, err, res, callback) => {
  if (res) {
    if (res.type === 'init') {
      return callback(err, model, Constants.EventType.LOADED, Constants.EventType.IDLE);
    }
    if (res.type === 'close') {
      return callback(err, model, Constants.EventType.CHANGED);
    }
    const modelReference = InkModel.updateModelReceivedPosition(model);
    modelReference.rawResults.exports = res;
    modelReference.exports = Cdkv3CommonTextRecognizer.extractExports(model);
    return callback(err, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
  }
  return callback(err, model);
};

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function init(recognizerContext, model, callback) {
  const recognizerContextRef = RecognizerContext.setRecognitionContext(recognizerContext, {
    model: InkModel.resetModelPositions(model),
    callback: (err, res) => textCallback(model, err, res, callback)
  });
  CdkWSRecognizerUtil.init('/api/v3.0/recognition/ws/text', recognizerContextRef, Cdkv3WSWebsocketBuilder.buildWebSocketCallback, init)
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
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
// eslint-disable-next-line no-underscore-dangle
export function export_(recognizerContext, model, callback) {
  const recognizerContextRef = RecognizerContext.setRecognitionContext(recognizerContext, {
    model,
    callback: (err, res) => textCallback(model, err, res, callback)
  });
  CdkWSRecognizerUtil.sendMessage(recognizerContextRef, buildTextInput, recognizerContext, model)
    .catch(exception => CdkWSRecognizerUtil.retry(export_, recognizerContext, model, callback));
}

/**
 * Reset the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function reset(recognizerContext, model, callback) {
  const recognizerContextRef = RecognizerContext.setRecognitionContext(recognizerContext, {
    model,
    callback: (err, res) => textCallback(model, err, res, callback)
  });
  CdkWSRecognizerUtil.sendMessage(recognizerContextRef, buildResetMessage, model)
    .catch(exception => CdkWSRecognizerUtil.retry(reset, recognizerContext, model, callback));
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function clear(recognizerContext, model, callback) {
  DefaultRecognizer.clear(recognizerContext, model, (err, res, ...types) => {
    reset(recognizerContext, res, (err1, res1) => logger.trace('Session reset'));
    callback(err, res, ...types);
  });
}
