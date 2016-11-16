import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonTextRecognizer';
export { populateModel } from '../common/Cdkv3CommonTextRecognizer';
export { clear, reset, close } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildStartInput(paperOptionsReference, strokes) {
  const retStructure = {
    type: 'start',
    textParameter: paperOptionsReference.recognitionParams.textParameter,
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
    }]
  };
  return retStructure;
}

function buildContinueInput(strokes) {
  const input = {
    type: 'continue',
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
    }]
  };
  return input;
}

function processTextResult(modeleParam, recognitionData) {
  const modelUnderRecognition = modeleParam;
  logger.debug('Cdkv3WSTextRecognizer update model', recognitionData);
  // Update model
  modelUnderRecognition.rawResult = recognitionData;
  return modelUnderRecognition;
}


export function init(paperOptions, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/text';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, paperOptions, recognizerContext);
}

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptions, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(paperOptions, recognizerContext, model, buildStartInput, buildContinueInput, processTextResult);
}

