/* eslint-disable no-underscore-dangle */
import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import Constants from '../../../configuration/Constants';
import * as InkModel from '../../../model/InkModel';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';

export { close, clear, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const musicRestV3Configuration = {
  types: [Constants.RecognitionType.MUSIC],
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
  return musicRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {RecognizerContext} recognizerContext
 * @param {Model} model
 * @return {Object}
 */
function buildInput(recognizerContext, model) {
  const configuration = recognizerContext.editor.configuration;
  const input = {
    // As Rest MUSIC recognition is non incremental wa add the already recognized strokes
    components: []
      .concat(model.defaultSymbols, model.rawStrokes)
      .filter(symbol => symbol.type !== 'staff')
      .map((symbol) => {
        if (symbol.type === 'stroke') {
          return StrokeComponent.toJSON(symbol);
        }
        return symbol;
      })
  };
  const musicParameter = Object.assign({}, configuration.recognitionParams.v3.musicParameter);
  delete musicParameter.clef; // FIXME find a way to avoid this ugly hack
  Object.assign(input, musicParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: configuration.recognitionParams.server.applicationKey,
    musicInput: JSON.stringify(input)
  };

  if (configuration.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.musicInput, configuration.recognitionParams.server.applicationKey, configuration.recognitionParams.server.hmacKey);
  }
  InkModel.updateModelSentPosition(model);
  return data;
}

function resultCallback(model, res, callback) {
  logger.debug('Cdkv3RestMusicRecognizer result callback', model);
  const modelReference = InkModel.updateModelReceivedPosition(model);
  modelReference.rawResults.exports = res;
  modelReference.exports = CdkCommonUtil.extractExports(model);
  logger.debug('Cdkv3RestMusicRecognizer model updated', modelReference);
  callback(undefined, modelReference, Constants.EventType.EXPORTED, Constants.EventType.IDLE);
}

/**
 * Initialize recognition
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function init(recognizerContext, model, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  logger.debug('Updated model', modelRef);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef.lastPositions);
  recognizerContextRef.initPromise = Promise.resolve(modelRef);
  recognizerContextRef.initPromise
    .then((res) => {
      recognizerContextRef.initialized = true;
      logger.debug('Updated recognizer context', recognizerContextRef);
      callback(undefined, res, Constants.EventType.LOADED, Constants.EventType.RENDERED);
    });
}

/**
 * Export content
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
export function export_(recognizerContext, model, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/music/doSimpleRecognition.json', recognizerContext, model, buildInput)
    .then(res => resultCallback(model, res, callback))
    .catch(err => callback(err, model));
}
