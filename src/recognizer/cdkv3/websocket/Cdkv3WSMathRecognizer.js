import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { reset, close, getAvailableRecognitionSlots } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildStartInput(paperOptionsParam, strokes) {
  return {
    type: 'start',
    parameters: paperOptionsParam.recognitionParams.mathParameter,
    components: strokes
  };
}

function buildContinueInput(strokes) {
  return {
    type: 'continue',
    components: strokes
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

export function init(paperOptions, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/math';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, paperOptions, recognizerContext);
}

/**
 * Do the recognition
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptions, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(paperOptions, recognizerContext, model, buildStartInput, buildContinueInput, processMathResult);
}
