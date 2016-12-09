import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateRecognizerPositions } from '../common/Cdkv3CommonResetBehavior';
import { generateRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { init, close } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionSlots } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger

function buildInput(paperOptions, model, instanceId) {
  const input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: model.pendingStrokes.map(stroke => StrokeComponent.toJSON(stroke))
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
 *
 * @param {Parameters} paperOptions
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Promise.<Model>}
 */
export function recognize(paperOptions, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, model, recognizerContextReference.mathInstanceId);
  updateRecognizerPositions(recognizerContextReference, modelReference);
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
      .then(generateRenderingResult); // Generate the rendering result
}

/**
 * @param {Parameters} paperOptions
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Promise}
 */
export function reset(paperOptions, model, recognizerContext) {
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.mathInstanceId;
  return Promise.resolve();
}

