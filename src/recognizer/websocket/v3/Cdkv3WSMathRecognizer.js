import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';
import * as DefaultRecognizer from '../../DefaultRecognizer';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';
import * as Cdkv3CommonMathRecognizer from '../../common/v3/Cdkv3CommonMathRecognizer';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const mathWebSocketV3Configuration = {
  types: [Constants.RecognitionType.MATH],
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
  return mathWebSocketV3Configuration;
}

function buildMathInput(recognizerContext, model) {
  InkModel.updateModelSentPosition(model);
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
    const configuration = recognizerContext.editor.configuration;
    return {
      type: 'start',
      parameters: configuration.recognitionParams.v3.mathParameter,
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    };
  }

  return {
    type: 'continue',
    components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
  };
}

function buildResetMessage(model) {
  InkModel.resetModelPositions(model);
  return {
    type: 'reset'
  };
}

const mathCallback = (model, err, res, callback) => {
  if (res) {
    if (res.type === 'init') {
      return callback(err, model, Constants.EventType.LOADED, Constants.EventType.IDLE);
    }
    if (res.type === 'close') {
      return callback(err, model, Constants.EventType.CHANGED);
    }
    const modelReference = InkModel.updateModelReceivedPosition(model);
    modelReference.rawResults.exports = res;
    modelReference.exports = CdkCommonUtil.extractExports(modelReference);
    modelReference.recognizedSymbols = Cdkv3CommonMathRecognizer.extractRecognizedSymbols(modelReference);
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
    callback: (err, res) => mathCallback(model, err, res, callback)
  });
  CdkWSRecognizerUtil.init('/api/v3.0/recognition/ws/math', recognizerContextRef, Cdkv3WSWebsocketBuilder.buildWebSocketCallback, init)
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
    callback: (err, res) => mathCallback(model, err, res, callback)
  });
  CdkWSRecognizerUtil.sendMessage(recognizerContextRef, buildMathInput, recognizerContext, model)
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
    callback: (err, res) => mathCallback(model, err, res, callback)
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
