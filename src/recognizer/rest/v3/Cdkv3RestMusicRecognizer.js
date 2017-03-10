import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as CdkCommonUtil from '../../common/CdkCommonUtil';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';

export { init, close, clear } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const musicRestV3Configuration = {
  type: [MyScriptJSConstants.RecognitionType.MUSIC],
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3',
  availableFeatures: [MyScriptJSConstants.RecognizerFeature.RECOGNITION],
  availableTriggers: [
    MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    MyScriptJSConstants.RecognitionTrigger.DEMAND
  ],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return musicRestV3Configuration;
}

function buildInput(configuration, model, recognizerContext) {
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
  return data;
}

function resultCallback(model) {
  logger.debug('Cdkv3RestMusicRecognizer result callback', model);
  const modelReference = model;
  modelReference.recognitionResult = CdkCommonUtil.extractRecognitionResult(model);
  logger.debug('Cdkv3RestMusicRecognizer model updated', modelReference);
  return model;
}

/**
 * Do the recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function recognize(configuration, model, recognizerContext, callback) {
  Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/music/doSimpleRecognition.json', configuration, InkModel.updateModelSentPosition(model), recognizerContext, buildInput)
      .then(resultCallback)
      .then(res => callback(undefined, res))
      .catch(err => callback(err, model));
}
