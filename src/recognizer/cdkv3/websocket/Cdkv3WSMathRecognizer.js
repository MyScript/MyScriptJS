import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { reset, close, getAvailableRecognitionTriggers } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildStartInput(options, symbols) {
  return {
    type: 'start',
    parameters: options.recognitionParams.mathParameter,
    components: symbols
  };
}

function buildContinueInput(symbols) {
  return {
    type: 'continue',
    components: symbols
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
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(options, recognizerContext, model, buildStartInput, buildContinueInput, processMathResult);
}
