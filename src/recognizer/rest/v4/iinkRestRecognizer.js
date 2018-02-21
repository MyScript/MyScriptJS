/* eslint-disable no-underscore-dangle */
import * as NetworkInterface from '../networkInterface';
import * as RecognizerContext from '../../../model/RecognizerContext';
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';

export { init, close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const iinkRestConfiguration = {
  types: [Constants.RecognitionType.TEXT, Constants.RecognitionType.DIAGRAM, Constants.RecognitionType.MATH],
  protocol: Constants.Protocol.REST,
  apiVersion: 'V4',
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
  return iinkRestConfiguration;
}


/**
 * @param {String} suffixUrl
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @param {function(recognizerContext: RecognizerContext, model: Model): Object} buildMessage
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export async function postMessage(suffixUrl, recognizerContext, model, buildMessage) {
  const configuration = recognizerContext.editor.configuration;
  const response = await NetworkInterface.post(recognizerContext, `${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildMessage(recognizerContext, model), 'V4');
  logger.debug('iinkRestRecognizer success', response);
  const positions = recognizerContext.lastPositions;
  positions.lastReceivedPosition = positions.lastSentPosition;
  const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, positions);
  if (response.instanceId) {
    recognizerContextReference.instanceId = response.instanceId;
  }
  return response;
}

function buildData(recognizerContext, model) {
  const configuration = recognizerContext.editor.configuration;

  const data = {
    xDPI: 96,
    yDPI: 96,
    contentType: configuration.recognitionParams.type.charAt(0).toUpperCase() + configuration.recognitionParams.type.slice(1).toLowerCase(),
    height: recognizerContext.editor.domElement.clientHeight,
    width: recognizerContext.editor.domElement.clientWidth,
    writeEntries: [{
      strokes: model.rawStrokes.map(stroke => StrokeComponent.toJSONV4(stroke))
    }]
  };
  return data;
}

function resultCallback(model, res, callback) {
  logger.debug('iinkRestRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = res;
  logger.debug('iinkRestRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}
