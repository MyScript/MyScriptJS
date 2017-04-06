import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
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
  types: [MyScriptJSConstants.RecognitionType.SHAPE],
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3',
  availableTriggers: [
    MyScriptJSConstants.Trigger.QUIET_PERIOD,
    MyScriptJSConstants.Trigger.DEMAND
  ]
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return shapeRestV3Configuration;
}

function buildInput(configuration, model, recognizerContext) {
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
  return data;
}

function buildReset(configuration, model, recognizerContext) {
  return {
    instanceSessionId: recognizerContext ? recognizerContext.instanceId : undefined
  };
}

function resultCallback(model) {
  logger.debug('Cdkv3RestShapeRecognizer result callback', model);
  const modelReference = model;
  modelReference.recognizedSymbols = Cdkv3CommonShapeRecognizer.extractRecognizedSymbols(model);
  logger.debug('Cdkv3RestShapeRecognizer model updated', modelReference);
  return modelReference;
}

/**
 * Do the recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function recognize(configuration, model, recognizerContext, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', configuration, InkModel.updateModelSentPosition(model), recognizerContext, buildInput)
      .then(resultCallback)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, model));
}

/**
 * Reset server context.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reset(configuration, model, recognizerContext, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', configuration, InkModel.resetModelPositions(model), recognizerContext, buildReset)
      .then(resultCallback)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, model));
}

/**
 * Do what is needed to clean the server context.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.cloneModel(model);
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/shape/clearSessionId.json', configuration, InkModel.clearModel(modelRef), recognizerContext, buildReset)
      .then(resultCallback)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, model));
}
