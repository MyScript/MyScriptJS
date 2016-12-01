import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';

export { init, close, reset } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param instanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model, instanceId) {
  // Building the input with the suitable parameters
  const params = paperOptions.recognitionParams.musicParameter;
  const input = {
    divisions: params.divisions,
    staff: params.staff,
    scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity,
    resultTypes: params.resultTypes,
    userResources: params.userResources,
    // As Rest MUSIC recognition is non incremental wa add the already recognized strokes
    components: []
        .concat(model.defaultSymbols, model.rawRecognizedStrokes, InkModel.extractPendingStrokes(model))
        .filter(symbol => symbol.type !== 'staff')
        .map((symbol) => {
          if (symbol.type === 'stroke') {
            return StrokeComponent.toJSON(symbol);
          }
          return symbol;
        })
  };

  logger.debug(`input.components size is ${input.components.length}`);

  const data = {
    instanceId,
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    musicInput: JSON.stringify(input)
  };

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam, recognizerContext) {
  const paperOptions = paperOptionsParam;
  const modelReference = modelParam;

  const data = buildInput(paperOptions, modelParam);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestMusicRecognizer success', response);
            modelReference.rawResult = response;
            return modelReference;
          }
      );
}
