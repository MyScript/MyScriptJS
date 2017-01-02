import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateRecognizerPositions } from '../common/Cdkv3CommonResetBehavior';
import { generateRenderingResult } from '../common/Cdkv3CommonTextRecognizer';

export { init, close, reset } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionTriggers } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {Options} options
 * @param {Model} model
 * @param {String} instanceId
 * @return {Object}
 */
export function buildInput(options, model, instanceId) {
  const input = {
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };
  Object.assign(input, { textParameter: options.recognitionParams.textParameter }); // Building the input with the suitable parameters

  logger.debug(`input.inputUnits[0].components size is ${input.inputUnits[0].components.length}`);

  const data = {
    instanceId,
    applicationKey: options.recognitionParams.server.applicationKey,
    textInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.textInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
  }
  return data;
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(options, modelReference, recognizerContextReference.textInstanceId);
  updateRecognizerPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(options.recognitionParams.server.scheme + '://' + options.recognitionParams.server.host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestTextRecognizer success', response);
            recognizerContextReference.textInstanceId = response.instanceId;
            logger.debug('Cdkv3RestTextRecognizer update model', response);
            modelReference.rawResult = response;
            return modelReference;
          }
      )
      .then(generateRenderingResult);
}
