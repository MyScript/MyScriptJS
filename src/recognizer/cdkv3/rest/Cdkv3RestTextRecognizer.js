import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';
import cloneJSObject from '../../../util/Cloner';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function getType() {
  return MyScriptJSConstants.RecognitionType.TEXT;
}

export function getProtocol() {
  return MyScriptJSConstants.Protocol.REST;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @returns {{applicationKey: string}}
 * @private
 */
export function buildInput(paperOptions, model) {
  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    // "instanceId": null,
  };
  const textInput = {
    textParameter: null,
    inputUnits: [
      {
        textInputType: 'MULTI_LINE_TEXT',
        components: [/* Strokes */]
      }
    ]
  };

  // We recopy the text parameters
  textInput.textParameter = paperOptions.recognitionParams.textParameter;

  // As Rest Text recognition is non incremental wa add the already recognized strokes
  model.recognizedStrokes.forEach((stroke) => {
    textInput.inputUnits[0].components.push(StrokeComponent.toJSON(stroke));
  });

  // We add the pending strokes to the model
  InkModel.extractNonRecognizedStrokes(model).forEach((stroke) => {
    textInput.inputUnits[0].components.push(StrokeComponent.toJSON(stroke));
  });

  data.textInput = JSON.stringify(textInput);
  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.textInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
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
  const model = modelParam;

  const data = buildInput(paperOptions, modelParam);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestTextRecognizer success', response);
            return response;
          }
      )
      .then(
          (response) => {
            logger.debug('Cdkv3RestTextRecognizer update model', response);
            model.rawResult = response;
            model.recognizedStrokes = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(model));
            return model;
          }
      );
}
