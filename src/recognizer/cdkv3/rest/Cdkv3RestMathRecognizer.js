import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';

export { init, close } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer'; // Re-use the recognition type for math

function buildInput(paperOptions, model, instanceId) {
  const input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: [].concat(InkModel.extractPendingStrokes(model)).map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, paperOptions.recognitionParams.mathParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    mathInput: JSON.stringify(input)
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptions, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, model, recognizerContextReference.mathInstanceId);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestMathRecognizer success', response);
            recognizerContextReference.mathInstanceId = response.instanceId;
            logger.debug('Cdkv3RestMathRecognizer update model', response);
            modelReference.rawResult = response;
            return modelReference;
          })
      .then(
          // Generate the rendering result
          Cdkv3CommonMathRecognizer.generateRenderingResult);
}


/**
 * Do what is needed to clean the server context.
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptions, model, recognizerContext) {
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.mathInstanceId;
  return Promise.resolve();
}

