import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.MATH,
    protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
    apiVersion: 'V3',
    availableTriggers: Cdkv3WSRecognizerUtil.getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
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

const processMathResult = (model, recognitionData) => {
  // Memorize instance id
  const modelReference = model;

  // Update model
  logger.debug('Cdkv3WSMathRecognizer update model', recognitionData);

  modelReference.rawResult = recognitionData;
  // Generate the rendering result
  return generateRenderingResult(modelReference);
};

/**
 * @param {Options} options
 * @param {RecognizerContext} recognizerContext
 * @return {Promise}
 */
export function init(options, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/math';
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
  return Cdkv3WSRecognizerUtil.recognize(options, recognizerContext, model, buildMathInput, processMathResult);
}
