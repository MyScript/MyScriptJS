import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonShapeRecognizer from '../common/Cdkv3CommonShapeRecognizer';

// Re-use the recognition type for shape
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonShapeRecognizer';

export function getType() {
  return MyScriptJSConstants.RecognitionType.SHAPE;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}


/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param shapeInstanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, shapeInstanceId) {
  // Building the input with the suitable parameters
  const params = paperOptions.recognitionParams.shapeParameter;
  const input = {
    rejectDetectionSensitivity: params.rejectDetectionSensitivity,
    doBeautification: params.doBeautification,
    userResources: params.userResources,
    components: []
  };

  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });

  const data = {
    shapeInput: JSON.stringify(input),
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    instanceId: shapeInstanceId
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.shapeInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
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
  const currentRestShapeRecognizer = this;

  const data = buildInput(paperOptions, modelParam, currentRestShapeRecognizer.shapeInstanceId);

  // FIXME manage http mode
  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSucess
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer success', response);
            return response;
          }
      )
      .then(
          // memorizeInstanceId
          (response) => {
            currentRestShapeRecognizer.shapeInstanceId = response.instanceId;
            return response;
          }
      )
      .then(
          // updateModel
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer update model', response);
            model.rawResult = response;
            return model;
          }
      )
      .then(
          // Generate the rendering result
          Cdkv3CommonShapeRecognizer.generateRenderingResult);
}
