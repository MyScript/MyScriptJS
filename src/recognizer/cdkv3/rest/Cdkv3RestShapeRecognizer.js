import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as Cdkv3CommonShapeRecognizer from '../common/Cdkv3CommonShapeRecognizer';
import * as PromiseHelper from '../../../util/PromiseHelper';

export { init } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonShapeRecognizer'; // Re-use the recognition type for shape

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param instanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, instanceId) {
  const strokes = instanceId ? InkModel.extractPendingStrokes(model) : model.pendingStrokes;
  const input = {
    components: strokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, paperOptions.recognitionParams.shapeParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    shapeInput: JSON.stringify(input)
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.shapeInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptions, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  const data = buildInput(paperOptions, model, recognizerContextReference.shapeInstanceId);

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
 * @param paperOptions
 * @param model
 * @param recognizerContext
 * @returns {Promise}
 */
export function reset(paperOptions, model, recognizerContext) {
  const recognizerContextReference = recognizerContext;
  const ret = PromiseHelper.destructurePromise();

  if (recognizerContextReference && recognizerContextReference.shapeInstanceId) {
    const data = {
      instanceSessionId: recognizerContextReference.shapeInstanceId
    };
    NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(ret.resolve());
    delete recognizerContextReference.shapeInstanceId;
  }
  return ret.promise;
}

export function close(paperOptions, model) {
  return reset(paperOptions, model);
}
