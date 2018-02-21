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
export function postMessage(suffixUrl, recognizerContext, model, buildMessage) {
  const configuration = recognizerContext.editor.configuration;
  NetworkInterface.post(recognizerContext, `${configuration.recognitionParams.server.scheme}://${configuration.recognitionParams.server.host}${suffixUrl}`, buildMessage(recognizerContext, model), 'V4').then((response) => {
    logger.debug('iinkRestRecognizer success', response);
    const positions = recognizerContext.lastPositions;
    positions.lastReceivedPosition = positions.lastSentPosition;
    const recognizerContextReference = RecognizerContext.updateRecognitionPositions(recognizerContext, positions);
    if (response.instanceId) {
      recognizerContextReference.instanceId = response.instanceId;
    }
    return response;
  });
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
  InkModel.updateModelSentPosition(model);
  return data;
}

function resultCallback(model, configuration, res, callback) {
  logger.debug('iinkRestRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  if (configuration.recognitionParams.type === 'TEXT' && configuration.recognitionParams.v4.text.mimeTypes[0] === 'text/plain') {
    modelReference.exports = { TEXT: res };
  } else {
    modelReference.exports = res;
  }
  modelReference.rawResults.exports = res;
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
  const configuration = recognizerContext.editor.configuration;
  postMessage('/api/v4.0/iink/batch', recognizerContext, model, buildData)
    .then(res => resultCallback(model, configuration, res, callback))
    .catch(err => callback(err, model));
}
