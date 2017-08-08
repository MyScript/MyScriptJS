import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as CryptoHelper from '../../CryptoHelper';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';
import * as DefaultRecognizer from '../../DefaultRecognizer';

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

function buildHmacMessage(recognizerContext, message) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'hmac',
    applicationKey: configuration.recognitionParams.server.applicationKey,
    challenge: message.data.challenge,
    hmac: CryptoHelper.computeHmac(message.data.challenge, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey)
  };
}

function buildInitMessage(recognizerContext, model) {
  const configuration = recognizerContext.getConfiguration();
  return {
    type: 'applicationKey',
    applicationKey: configuration.recognitionParams.server.applicationKey
  };
}

function buildMathInput(recognizerContext, model) {
  InkModel.updateModelSentPosition(model);
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
    const configuration = recognizerContext.getConfiguration();
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

function buildResetMessage(recognizerContext, model) {
  InkModel.resetModelPositions(model);
  return {
    type: 'reset'
  };
}

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function init(recognizerContext, model, callback) {
  const initContext = {
    suffixUrl: '/api/v3.0/recognition/ws/math',
    buildWebSocketCallback: Cdkv3WSWebsocketBuilder.buildWebSocketCallback,
    buildInitMessage,
    buildHmacMessage,
    reconnect: init,
    model,
    callback
  };

  CdkWSRecognizerUtil.init(recognizerContext, InkModel.resetModelPositions(model), initContext)
    .then(res => callback(undefined, res, Constants.EventType.CHANGED))
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
export function exportContent(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildMathInput);
}

/**
 * Reset the recognition context
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function reset(recognizerContext, model, callback) {
  CdkWSRecognizerUtil.sendMessages(recognizerContext, model, callback, buildResetMessage);
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function clear(recognizerContext, model, callback) {
  DefaultRecognizer.clear(recognizerContext, model, (err, res) => {
    reset(recognizerContext, res, (err1, res1) => logger.trace('Session reset'));
    callback(err, res);
  });
}
