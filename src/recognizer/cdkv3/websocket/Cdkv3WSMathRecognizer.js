import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer';
export { populateModel } from '../common/Cdkv3CommonMathRecognizer';

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;

  const buildStartInput = () => {
    const params = paperOptions.recognitionParams.mathParameter;
    return {
      type: 'start',
      parameters: {
        resultTypes: params.resultTypes,
        isColumnar: params.isColumnar,
        userResources: params.userResources,
        scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity
      },
      components: Cdkv3WSRecognizerUtil.extractPendingStrokesAsComponentArray(model)
    };
  };

  function buildContinueInput(modelInput) {
    const input = {
      type: 'continue',
      components: []
    };
    input.components = Cdkv3WSRecognizerUtil.extractPendingStrokesAsComponentArray(modelInput);
    return input;
  }

  const processMathResult = (callbackContext, message) => {
    // Memorize instance id
    const modelUnderRecognition = callbackContext.modelReference;

    // Update model
    logger.debug('Cdkv3WSMathRecognizer update model', message.data);

    modelUnderRecognition.rawResult = message.data;
    // Generate the rendering result
    const updateModel = Cdkv3CommonMathRecognizer.generateRenderingResult(modelUnderRecognition);
    callbackContext.promiseResolveFunction(updateModel);
  };

  const scheme = Cdkv3WSRecognizerUtil.getWebsocketSheme(paperOptions);
  const url = scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/ws/math';
  return Cdkv3WSRecognizerUtil.recognize(url, paperOptionsParam, modelParam, buildStartInput, buildContinueInput, processMathResult);
}

