import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as RecognizerContext from '../../../model/RecognizerContext';
import * as Cdkv3RestRecognizerUtil from './Cdkv3RestRecognizerUtil';

export { init, close, reset } from '../../DefaultRecognizer';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const musicRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.MUSIC,
  protocol: MyScriptJSConstants.Protocol.REST,
  apiVersion: 'V3',
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

function buildInput(options, model, recognizerContext) {
  const sendMessage = (message) => {
    RecognizerContext.updateSentRecognitionPositions(recognizerContext, model);
    return message;
  };

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
  const musicParameter = Object.assign({}, options.recognitionParams.musicParameter);
  delete musicParameter.clef; // FIXME find a way to avoid this ugly hack
  Object.assign(input, musicParameter); // Building the input with the suitable parameters

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: options.recognitionParams.server.applicationKey,
    musicInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.musicInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
  }
  return sendMessage(data);
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
function processRenderingResult(model) {
  logger.debug('Building the rendering model', model);
  logger.debug('MusicRecognizer model updated', model);
  return model;
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/music/doSimpleRecognition.json', options, model, recognizerContext, buildInput)
      .then(processRenderingResult);
}
