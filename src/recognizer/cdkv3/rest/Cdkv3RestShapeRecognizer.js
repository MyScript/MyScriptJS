import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as PromiseHelper from '../../../util/PromiseHelper';
import * as CryptoHelper from '../../CryptoHelper';
import { getAvailableRecognitionTriggers } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger
import { updateRecognizerPositions, resetRecognizerPositions } from '../common/Cdkv3CommonResetBehavior';
import { generateRenderingResult } from '../common/Cdkv3CommonShapeRecognizer';

export { init } from '../../DefaultRecognizer';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.SHAPE,
    protocol: MyScriptJSConstants.Protocol.REST,
    apiVersion: 'V3',
    availableTriggers: getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
  };
}

function buildInput(options, model, instanceId) {
  const strokes = instanceId ? InkModel.extractPendingStrokes(model) : model.rawStrokes;
  const input = {
    components: strokes.map(stroke => StrokeComponent.toJSON(stroke))
  };
  Object.assign(input, options.recognitionParams.shapeParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: options.recognitionParams.server.applicationKey,
    shapeInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.shapeInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
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

  const data = buildInput(options, model, recognizerContextReference.shapeInstanceId);
  updateRecognizerPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/shape/doSimpleRecognition.json`, data)
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
  const recognizerContextReference = recognizerContext;
  const ret = PromiseHelper.destructurePromise();
  resetRecognizerPositions(recognizerContext, model);

  if (recognizerContextReference && recognizerContextReference.shapeInstanceId) {
    const data = {
      instanceSessionId: recognizerContextReference.shapeInstanceId
    };
    NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/shape/clearSessionId.json`, data)
        .then(ret.resolve);
    delete recognizerContextReference.shapeInstanceId;
  }
  return ret.promise;
}

/**
 * @param {Options} options
 * @param {Model} model
 * @return {Promise}
 */
export function close(options, model) {
  return reset(options, model);
}
