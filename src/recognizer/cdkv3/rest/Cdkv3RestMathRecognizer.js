import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer';

export { init, close } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

function buildInput(paperOptions, model, instanceId) {
  const params = paperOptions.recognitionParams.mathParameter;
  const input = {
    resultTypes: params.resultTypes,
    columnarOperation: params.isColumnar,
    userResources: params.userResources,
    scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity,
    // As Rest MATH recognition is non incremental wa add the already recognized strokes
    components: [].concat(model.rawRecognizedStrokes, InkModel.extractPendingStrokes(model)).map(stroke => StrokeComponent.toJSON(stroke))
  };

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    instanceId,
    mathInput: JSON.stringify(input)
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam, recognizerContext) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, modelParam, recognizerContextReference.mahtInstanceId);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestMathRecognizer success', response);
            recognizerContextReference.mahtInstanceId = response.instanceId;
            logger.debug('Cdkv3RestMathRecognizer update model', response);
            model.rawResult = response;
            return model;
          })
      .then(
          // Generate the rendering result
          Cdkv3CommonMathRecognizer.generateRenderingResult);
}


/**
 * Do what is needed to clean the server context.
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptionsParam, modelParam, recognizerContext) {
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.mahtInstanceId;
  return Promise.resolve();
}

