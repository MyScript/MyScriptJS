/* eslint-disable no-underscore-dangle */
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';
import * as Cdkv3CommonShapeRecognizer from '../../common/v3/Cdkv3CommonShapeRecognizer';

export { init, close } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const shapeRestV3Configuration = {
  types: [Constants.RecognitionType.SHAPE],
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
  return shapeRestV3Configuration;
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
    components: InkModel.extractPendingStrokes(model).map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, configuration.recognitionParams.v3.shapeParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    shapeInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.shapeInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  InkModel.updateModelSentPosition(model);
  return data;
}

function buildReset(recognizerContext, model) {
  return {
    instanceSessionId: recognizerContext ? recognizerContext.instanceId : undefined
  };
}

function resultCallback(model, res, callback) {
  logger.debug('Cdkv3RestShapeRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.recognizedSymbols = Cdkv3CommonShapeRecognizer.extractRecognizedSymbols(model);
  modelReference.exports = Cdkv3CommonShapeRecognizer.extractExports(model);
  logger.debug('Cdkv3RestShapeRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', recognizerContext, model, buildInput)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}

/**
 * Reset server context.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function reset(recognizerContext, model, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', recognizerContext, modelRef, buildReset)
    .then(res => callback(undefined, modelRef, Constants.EventType.IDLE))
    .catch(err => callback(err, modelRef));
}

/**
 * Do what is needed to clean the server context.
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function clear(recognizerContext, model, callback) {
  const modelRef = InkModel.clearModel(InkModel.cloneModel(model));
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', recognizerContext, modelRef, buildReset)
    .then(res => callback(undefined, modelRef, Constants.EventType.CHANGED, Constants.EventType.EXPORTED, Constants.EventType.CONVERTED, Constants.EventType.IDLE))
    .catch(err => callback(err, modelRef));
}
