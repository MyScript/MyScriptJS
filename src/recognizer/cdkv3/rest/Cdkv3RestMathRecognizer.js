import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import cloneJSObject from '../../../util/Cloner';
import * as Cdkv3CommonMathRecognizer from '../common/Cdkv3CommonMathRecognizer';


const restContext = {};

// Re-use the recognition type for math
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonMathRecognizer';

export function getType() {
  return MyScriptJSConstants.RecognitionType.MATH;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}

function buildInput(paperOptions, model, instanceId) {
  const params = paperOptions.recognitionParams.mathParameter;
  const input = {
    resultTypes: params.resultTypes,
    columnarOperation: params.isColumnar,
    userResources: params.userResources,
    scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity,
    components: [/* Strokes */]
  };

  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    instanceId
  };

  // As Rest Math recognition is non incremental wa add the already recognized strokes
  model.rawRecognizedStrokes.forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });

  logger.debug(`input.components size is ${input.components.length}`);
  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });
  logger.debug(`input.components size with non recognized strokes is ${input.components.length}`);
  data.mathInput = JSON.stringify(input);

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const model = modelParam;
  const currentRestMathRecognizer = this;

  const data = buildInput(paperOptions, modelParam, restContext.instanceId);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestMathRecognizer success', response);
            restContext.instanceId = response.instanceId;
            logger.debug('Cdkv3RestMathRecognizer update model', response);
            model.rawResult = response;
            return model;
          })
      .then(
          // Generate the rendering result
          Cdkv3CommonMathRecognizer.generateRenderingResult);
}
