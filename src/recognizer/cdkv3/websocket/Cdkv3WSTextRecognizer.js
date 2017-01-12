import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonTextRecognizer';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {{type: String, protocol: String, apiVersion: String}}
 */
export const textWebSocketV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.TEXT,
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V3'
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return Object.assign({}, Cdkv3WSRecognizerUtil.commonWebSocketV3Configuration, textWebSocketV3Configuration);
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

function processTextResult(model, recognitionData) {
  const modelReference = model;
  logger.debug('Cdkv3WSTextRecognizer update model', recognitionData);
  // Update model
  modelReference.rawResult = recognitionData;
  return generateRenderingResult(modelReference);
}

/**
 * @param {Options} options
 * @param {RecognizerContext} recognizerContext
 * @return {Promise}
 */
export function init(options, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/text';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, options, recognizerContext);
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(options, recognizerContext, model, buildTextInput, processTextResult);
}

