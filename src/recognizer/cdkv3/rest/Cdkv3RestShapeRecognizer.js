import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonShapeRecognizer from '../common/Cdkv3CommonShapeRecognizer';
import * as PromiseHelper from '../../../util/PromiseHelper';

export { init } from '../../DefaultRecognizer';

// Re-use the recognition type for shape
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonShapeRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

export function populateModel(paperOptions, model) {
  const modelReference = model;
  modelReference.defaultSymbols = [];
  return modelReference;
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

  if (shapeInstanceId) {
    // A recognition session already started
    // We add the pending strokes to the model
    InkModel.extractPendingStrokes(model).forEach((stroke) => {
      input.components.push(StrokeComponent.toJSON(stroke));
    });
  } else {
    input.components = InkModel.extractAllPendingStrokesAsJsonArray(model);
  }

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
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam, recognizerContext) {
  const paperOptions = paperOptionsParam;
  const modelReference = modelParam;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, modelParam, recognizerContextReference.shapeInstanceId);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer success', response);
            recognizerContextReference.shapeInstanceId = response.instanceId;
            logger.debug('Cdkv3RestShapeRecognizer update model', response);
            modelReference.rawResult = response;
            return modelReference;
          }
      )
      .then(
          // Generate the rendering result
          Cdkv3CommonShapeRecognizer.generateRenderingResult);
}


/**
 * Do what is needed to clean the server context.
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptionsParam, modelParam, recognizerContext) {
  const modelReference = modelParam;
  const recognizerContextReference = recognizerContext;
  const ret = PromiseHelper.destructurePromise();

  if (recognizerContextReference && recognizerContextReference.shapeInstanceId) {
    const data = {
      instanceSessionId: recognizerContextReference.shapeInstanceId
    };
    NetworkInterface.post(paperOptionsParam.recognitionParams.server.scheme + '://' + paperOptionsParam.recognitionParams.server.host + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(ret.resolve());
    delete recognizerContextReference.shapeInstanceId;
  }
  return ret;
}

export function close(paperOptionsParam, modelParam) {
  return reset(paperOptionsParam, modelParam);
}
