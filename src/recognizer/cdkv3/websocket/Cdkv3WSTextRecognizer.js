import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonTextRecognizer';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.TEXT,
    protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
    apiVersion: 'V3',
    availableTriggers: Cdkv3WSRecognizerUtil.getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
  };
}

function buildStartInput(options, symbols) {
  return {
    type: 'start',
    textParameter: options.recognitionParams.textParameter,
    inputUnits: [{
      textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
      components: symbols
    }]
  };
}

function buildContinueInput(symbols) {
  return {
    type: 'continue',
    inputUnits: [{
      textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
      components: symbols
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
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(options, recognizerContext, model, buildStartInput, buildContinueInput, processTextResult);
}

