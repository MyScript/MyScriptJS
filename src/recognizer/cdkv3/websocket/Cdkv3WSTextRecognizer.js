import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import { generateRenderingResult } from '../common/Cdkv3CommonTextRecognizer';

export { reset, close, getAvailableRecognitionSlots } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildStartInput(paperOptions, strokes) {
  return {
    type: 'start',
    textParameter: paperOptions.recognitionParams.textParameter,
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
    }]
  };
}

function buildContinueInput(strokes) {
  return {
    type: 'continue',
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
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


export function init(paperOptions, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/text';
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
  return Cdkv3WSRecognizerUtil.recognize(paperOptions, recognizerContext, model, buildStartInput, buildContinueInput, processTextResult);
}

