/* eslint-disable no-underscore-dangle */
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';
import * as Cdkv3CommonMathRecognizer from '../../common/v3/Cdkv3CommonMathRecognizer';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const mathRestV3Configuration = {
  types: [Constants.RecognitionType.MATH],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: {
    exportContent: [
      Constants.Trigger.QUIET_PERIOD,
      Constants.Trigger.DEMAND
    ]
  }
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return mathRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput(recognizerContext, model) {
  const configuration = recognizerContext.editor.configuration;
  const input = {
    // As Rest MATH recognition is non incremental we add the already recognized strokes
    components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, configuration.recognitionParams.v3.mathParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    mathInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  InkModel.updateModelSentPosition(model);
  return data;
}

function resultCallback(model, res, callback) {
  logger.debug('Cdkv3RestMathRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = Cdkv3CommonMathRecognizer.extractRecognizedSymbols(model);
  modelReference.exports = CdkCommonUtil.extractExports(model);
  logger.debug('Cdkv3RestMathRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  return Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/math/doSimpleRecognition.json', recognizerContext, model, buildInput)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}
