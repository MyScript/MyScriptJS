import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const textWebSocketV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.TEXT,
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
  return textWebSocketV3Configuration;
}

function buildTextInput(recognizerContext, model, options) {
  if (recognizerContext.lastRecognitionPositions.lastSentPosition < 0) {
    return {
      type: 'start',
      textParameter: options.recognitionParams.textParameter,
      inputUnits: [{
        textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
        components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
      }]
    };
  }

  return {
    type: 'continue',
    inputUnits: [{
      textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
      components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };
}

function resultCallback(model) {
  logger.debug('Cdkv3WSTextRecognizer result callback', model);
  return model;
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognizerCallback} callback
 */
export function init(options, model, recognizerContext, callback) {
  Cdkv3WSRecognizerUtil.init('/api/v3.0/recognition/ws/text', options, InkModel.resetModelPositions(model), recognizerContext)
      .then(res => callback(undefined, res));
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {RecognizerCallback} callback
 */
export function recognize(options, model, recognizerContext, callback) {
  Cdkv3WSRecognizerUtil.sendMessages(options, recognizerContext, InkModel.updateModelSentPosition(model), buildTextInput)
      .then(resultCallback)
      .then(res => callback(undefined, res));
}

