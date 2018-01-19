/* eslint-disable no-underscore-dangle */
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';
import * as Cdkv3CommonTextRecognizer from '../../common/v3/Cdkv3CommonTextRecognizer';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const textRestV3Configuration = {
  types: [Constants.RecognitionType.TEXT],
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
  return textRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
export function buildInput(recognizerContext, model) {
  const configuration = recognizerContext.editor.configuration;
  const input = {
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };
  Object.assign(input, { textParameter: configuration.recognitionParams.v3.textParameter }); // Building the input with the suitable parameters

  logger.debug(`input.inputUnits[0].components size is ${input.inputUnits[0].components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    textInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.textInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  InkModel.updateModelSentPosition(model);
  return data;
}

function resultCallback(model, res, callback) {
  logger.debug('Cdkv3RestTextRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = Cdkv3CommonTextRecognizer.extractExports(model);
  logger.debug('Cdkv3RestTextRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/text/doSimpleRecognition.json', recognizerContext, model, buildInput)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}
