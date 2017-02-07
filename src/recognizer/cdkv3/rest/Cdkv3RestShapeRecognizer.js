import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as PromiseHelper from '../../../util/PromiseHelper';
import * as CryptoHelper from '../../CryptoHelper';
import { updateSentRecognitionPositions, resetRecognitionPositions } from '../../../model/RecognizerContext';
import { commonRestV3Configuration, updateModelReceivedPosition } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger
import { processRenderingResult } from '../common/Cdkv3CommonShapeRecognizer';

export { init } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {{type: String, protocol: String, apiVersion: String}}
 */
export const shapeRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.SHAPE,
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3'
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return Object.assign({}, commonRestV3Configuration, shapeRestV3Configuration);
}

function buildInput(options, model, instanceId) {
  const input = {
    components: InkModel.extractPendingStrokes(model).map(stroke => StrokeComponent.toJSON(stroke))
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

function buildReset(options, model, instanceId) {
  return {
    instanceSessionId: instanceId
  };
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

  const data = buildInput(options, model, recognizerContextReference.shapeInstanceId);
  updateSentRecognitionPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/shape/doSimpleRecognition.json`, data)
      .then(
          // logResponseOnSuccess
          (response) => {
            logger.debug('Cdkv3RestShapeRecognizer success', response);
            recognizerContextReference.shapeInstanceId = response.instanceId;
            logger.debug('Cdkv3RestShapeRecognizer update model', response);
            modelReference.rawResult = response;
            modelReference.rawResult.type = `${shapeRestV3Configuration.type.toLowerCase()}Result`;
            return modelReference;
          }
      )
      .then(processRenderingResult)
      .then(updateModelReceivedPosition);
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;

  return new Promise((resolve) => {
    if (recognizerContextReference && recognizerContextReference.shapeInstanceId) {
      const data = buildReset(options, model, recognizerContextReference.shapeInstanceId);
      resolve(NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/shape/clearSessionId.json`, data)
                  .then(
                      // logResponseOnSuccess
                      (response) => {
                        logger.debug('Cdkv3RestShapeRecognizer reset', response);
                        delete recognizerContextReference.shapeInstanceId;
                        modelReference.rawResult = response;
                        return modelReference;
                      }
                  ));
    } else {
      resolve(model);
    }
  }).then((modelReset) => {
    resetRecognitionPositions(recognizerContext, modelReset);
    return modelReset;
  });
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function close(options, model, recognizerContext) {
  return reset(options, model, recognizerContext);
}
