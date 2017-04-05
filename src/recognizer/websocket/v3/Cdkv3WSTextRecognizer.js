import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as CdkWSRecognizerUtil from '../CdkWSRecognizerUtil';
import * as Cdkv3CommonTextRecognizer from '../../common/v3/Cdkv3CommonTextRecognizer';
import * as DefaultRecognizer from '../../DefaultRecognizer';

export { close } from '../CdkWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const textWebSocketV3Configuration = {
  types: [MyScriptJSConstants.RecognitionType.TEXT],
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableTriggers: [MyScriptJSConstants.Trigger.POINTER_UP]
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return textWebSocketV3Configuration;
}

function buildInitMessage(recognizerContext, model, configuration) {
  return {
    type: 'applicationKey',
    applicationKey: configuration.recognitionParams.server.applicationKey
  };
}

function buildTextInput(recognizerContext, model, configuration) {
  if (recognizerContext.lastPositions.lastSentPosition < 0) {
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

function buildResetMessage(recognizerContext, model, configuration) {
  return {
    type: 'reset'
  };
}

function resultCallback(model) {
  logger.debug('Cdkv3WSTextRecognizer result callback', model);
  const modelReference = model;
  modelReference.exports = Cdkv3CommonTextRecognizer.extractExports(model);
  logger.debug('Cdkv3WSTextRecognizer model updated', modelReference);
  return modelReference;
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
      CdkWSRecognizerUtil.sendMessages(configuration, InkModel.updateModelSentPosition(res), recognizerContext, callback, buildTextInput);
    } else {
      callback(err, res);
    }
  };

  CdkWSRecognizerUtil.init('/api/v3.0/recognition/ws/text', Cdkv3WSWebsocketBuilder.buildWebSocketCallback, init, configuration, InkModel.resetModelPositions(model), recognizerContext)
      .then(openedModel => CdkWSRecognizerUtil.sendMessages(configuration, openedModel, recognizerContext, initCallback, buildInitMessage))
      .catch(err => callback(err, model)); // Error on websocket creation
}

/**
 * Do the recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function recognize(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, InkModel.updateModelSentPosition(model), recognizerContext, (err, res) => callback(err, resultCallback(res)), buildTextInput);
}

/**
 * Reset the recognition context
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reset(configuration, model, recognizerContext, callback) {
  CdkWSRecognizerUtil.sendMessages(configuration, InkModel.resetModelPositions(model), recognizerContext, (err, res) => callback(err, resultCallback(res)), buildResetMessage);
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  reset(configuration, model, recognizerContext, (err, res) => logger.trace('Session reset'));
  DefaultRecognizer.clear(configuration, model, recognizerContext, callback);
}
