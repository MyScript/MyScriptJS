import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';

// Re-use the recognition type for text
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonTextRecognizer';
export { init, close, reset } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';

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
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: [].concat(model.rawRecognizedStrokes, InkModel.extractPendingStrokes(model)).map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };

  // We recopy the text parameters
  textInput.textParameter = paperOptions.recognitionParams.textParameter;

  data.textInput = JSON.stringify(textInput);
  if (paperOptions.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.textInput, paperOptions.recognitionParams.server.applicationKey, paperOptions.recognitionParams.server.hmacKey);
  }
  return data;
}


/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelClone
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelClone, recognizerContext) {
  const paperOptions = paperOptionsParam;
  const modelCloneReference = modelClone;

  const data = buildInput(paperOptions, modelCloneReference);

  return NetworkInterface.post(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data)
      .then(
          (response) => {
            logger.debug('Cdkv3RestTextRecognizer success', response);
            modelCloneReference.rawResult = response;
            return modelCloneReference;
          }
      );
}
