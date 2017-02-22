import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSWebsocketBuilder from './Cdkv3WSBuilder';
import * as Cdkv3WSRecognizerUtil from '../CdkvWSRecognizerUtil';
import * as Cdkv3CommonMathRecognizer from '../../common/v3/Cdkv3CommonMathRecognizer';

export { reset, close } from '../CdkvWSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const mathWebSocketV3Configuration = {
  type: [MyScriptJSConstants.RecognitionType.MATH],
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableFeatures: [MyScriptJSConstants.RecognizerFeature.RECOGNITION],
  availableTriggers: [MyScriptJSConstants.RecognitionTrigger.PEN_UP],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return mathWebSocketV3Configuration;
}

function buildInitMessage(recognizerContext, model, options) {
  return {
    type: 'applicationKey',
    applicationKey: options.recognitionParams.server.applicationKey
  };
}

function buildMathInput(recognizerContext, model, options) {
  if (recognizerContext.lastRecognitionPositions.lastSentPosition < 0) {
    return {
      type: 'start',
      parameters: options.recognitionParams.mathParameter,
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    };
  }

  return {
    type: 'continue',
    components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
  };
}

function resultCallback(model) {
  logger.debug('Cdkv3WSMathRecognizer result callback', model);
  const modelReference = model;
  modelReference.recognizedSymbols = Cdkv3CommonMathRecognizer.extractRecognizedSymbols(model);
  logger.debug('Cdkv3WSMathRecognizer model updated', modelReference);
  return modelReference;
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function init(options, model, recognizerContext, callback) {
  Cdkv3WSRecognizerUtil.init('/api/v3.0/recognition/ws/math', options, InkModel.resetModelPositions(model), recognizerContext, Cdkv3WSWebsocketBuilder.buildWebSocketCallback)
      .then(openedModel => Cdkv3WSRecognizerUtil.sendMessages(recognizerContext, openedModel, options, callback, buildInitMessage))
      .catch(err => callback(err, undefined));
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function recognize(options, model, recognizerContext, callback) {
  Cdkv3WSRecognizerUtil.sendMessages(recognizerContext, InkModel.updateModelSentPosition(model), options, (err, res) => callback(err, resultCallback(res)), buildMathInput);
}
