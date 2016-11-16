import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer';
export { populateModel } from '../common/Cdkv3CommonMathRecognizer';
export { clear, reset, close } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildStartInput(paperOptionsParam, strokes) {
  return {
    type: 'start',
    parameters: paperOptionsParam.recognitionParams.mathParameter,
    components: strokes
  };
}

function buildContinueInput(strokes) {
  const input = {
    type: 'continue',
    components: strokes
  };
  return input;
}

const processMathResult = (modelParam, recognitionData) => {
  // Memorize instance id
  const modelUnderRecognition = modelParam;

  // Update model
  logger.debug('Cdkv3WSMathRecognizer update model', recognitionData);

  modelUnderRecognition.rawResult = recognitionData;
  // Generate the rendering result
  const updateModel = Cdkv3CommonMathRecognizer.generateRenderingResult(modelUnderRecognition);
  return updateModel;
};

export function init(paperOptions, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/math';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, paperOptions, recognizerContext);
}

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptions, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(paperOptions, recognizerContext, model, buildStartInput, buildContinueInput, processMathResult);
}
