import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function getType() {
  return MyScriptJSConstants.RecognitionType.SHAPE;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}

export function populateModel(paperOptions, model) {
  const modelReference = model;

  const defaultStaff = Object.assign({}, { type: 'staff' }, paperOptions.recognitionParams.musicParameter.staff);
  const defaultClef = {
    type: 'clef',
    value: Object.assign({}, paperOptions.recognitionParams.musicParameter.clef)
  };
  defaultClef.value.yAnchor = defaultStaff.top + (defaultStaff.gap * (defaultStaff.count - defaultClef.value.line));
  delete defaultClef.value.line;
  defaultClef.boundingBox = MyScriptJSConstants.MusicClefs[defaultClef.value.symbol].getBoundingBox(defaultStaff.gap, 0, defaultClef.value.yAnchor);
  modelReference.defaultSymbols = [defaultStaff, defaultClef];
  return modelReference;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param instanceId
 * @returns {{applicationKey: string}}
 * @private
 */
function buildInput(paperOptions, model) {
  // Building the input with the suitable parameters
  const params = paperOptions.recognitionParams.musicParameter;
  const input = {
    divisions: params.divisions,
    staff: params.staff,
    scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity,
    resultTypes: params.resultTypes,
    userResources: params.userResources,
    components: []
  };

  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey
    // "instanceId": null,
  };

  // Add the default symbols
  model.defaultSymbols.forEach((symbol) => {
    if (symbol.type !== 'staff') {
      input.components.push(symbol);
    }
  });

  // As Rest Math recognition is non incremental wa add the already recognized strokes
  model.rawRecognizedStrokes.forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });

  logger.debug(`input.components size is ${input.components.length}`);
  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    input.components.push(StrokeComponent.toJSON(stroke));
  });
  logger.debug(`input.components size with non recognized strokes is ${input.components.length}`);
  data.musicInput = JSON.stringify(input);

  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam) {
  const paperOptions = paperOptionsParam;
  const modelReference = modelParam;
  const currentRestMathRecognizer = this;

  const data = buildInput(paperOptions, modelParam);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestMusicRecognizer success', response);
            modelReference.rawResult = response;
            // model.rawRecognizedStrokes = model.rawRecognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(model));
            return modelReference;
          }
      );
}
