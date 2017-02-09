import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateSentRecognitionPositions, resetRecognitionPositions } from '../../../model/RecognizerContext';
import { processRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { init, close, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const mathRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.MATH,
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: [
    MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    MyScriptJSConstants.RecognitionTrigger.DEMAND
  ],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return mathRestV3Configuration;
}

function buildInput(options, model, instanceId) {
  const input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, options.recognitionParams.mathParameter); // Building the input with the suitable parameters

  InkModel.updateModelSentPosition(model);
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
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(options, model, recognizerContextReference.instanceId);
  updateSentRecognitionPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/math/doSimpleRecognition.json`, data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestMathRecognizer success', response);
            recognizerContextReference.instanceId = response.instanceId;
            logger.debug('Cdkv3RestMathRecognizer update model', response);
            modelReference.rawResult = response;
            modelReference.rawResult.type = `${mathRestV3Configuration.type.toLowerCase()}Result`;
            return modelReference;
          })
      .then(processRenderingResult)
      .then(InkModel.updateModelReceivedPosition);
}
