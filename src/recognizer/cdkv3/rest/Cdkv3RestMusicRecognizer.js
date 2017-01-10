import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import * as CryptoHelper from '../../CryptoHelper';
import { updateRecognitionPositions, resetRecognitionPositions } from '../../../model/RecognizerContext';
import { getAvailableRecognitionTriggers } from './Cdkv3CommonRestRecognizer'; // Configuring recognition trigger

export { init, close } from '../../DefaultRecognizer';

/**
 * Get the configuration supported by this recognizer
 * @return {Configuration}
 */
export function getSupportedConfiguration() {
  return {
    type: MyScriptJSConstants.RecognitionType.MUSIC,
    protocol: MyScriptJSConstants.Protocol.REST,
    apiVersion: 'V3',
    availableTriggers: getAvailableRecognitionTriggers(),
    preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
  };
}

function buildInput(options, model, instanceId) {
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
    instanceId,
    applicationKey: options.recognitionParams.server.applicationKey,
    musicInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.musicInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
  }
  return data;
}

function generateRenderingResult(model) {
  const modelReference = model;

  // MUSIC recognition doesn't support scratch-out, so we recopy input symbols to output
  modelReference.recognizedSymbols = model.rawStrokes.slice();
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
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

  const data = buildInput(options, model, recognizerContextReference.musicInstanceId);
  updateRecognitionPositions(recognizerContextReference, modelReference);
  return NetworkInterface.post(`${options.recognitionParams.server.scheme}://${options.recognitionParams.server.host}/api/v3.0/recognition/rest/music/doSimpleRecognition.json`, data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestMusicRecognizer success', response);
            recognizerContextReference.musicInstanceId = response.instanceId;
            logger.debug('Cdkv3RestMusicRecognizer update model', response);
            modelReference.rawResult = response;
            return modelReference;
          }
      )
      .then(generateRenderingResult);
}

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise}
 */
export function reset(options, model, recognizerContext) {
  resetRecognitionPositions(recognizerContext, model);
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.musicInstanceId;
  return Promise.resolve();
}
