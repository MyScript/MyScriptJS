import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { getAvailableRecognitionTriggers } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger
import { updateRecognitionPositions, resetRecognitionPositions } from '../common/Cdkv3CommonRecognizerBehavior';
import { generateRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { init, close } from '../../DefaultRecognizer';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.MATH,
    protocol: MyScriptJSConstants.Protocol.REST,
    apiVersion: 'V3',
    availableTriggers: getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
  };
}

function buildInput(options, model, instanceId) {
  const input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, options.recognitionParams.mathParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: options.recognitionParams.server.applicationKey,
    mathInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
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

  const data = buildInput(options, model, recognizerContextReference.mathInstanceId);
  updateRecognitionPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/math/doSimpleRecognition.json`, data)
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
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise}
 */
export function reset(options, model, recognizerContext) {
  resetRecognitionPositions(recognizerContext, model);
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.mathInstanceId;
  return Promise.resolve();
}

