import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as CryptoHelper from '../../CryptoHelper';
import * as NetworkInterface from '../../networkHelper/rest/networkInterface';

export { init, close, reset } from '../../DefaultRecognizer';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonTextRecognizer'; // Re-use the recognition type for text

/**
 * Internal function to build the payload to ask for a recognition.
 * @param paperOptions
 * @param model
 * @param instanceId
 * @returns {{applicationKey: string}}
 * @private
 */
export function buildInput(paperOptions, model, instanceId) {
  const input = {
    textParameter: paperOptions.recognitionParams.textParameter,
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: [].concat(model.rawRecognizedStrokes, InkModel.extractPendingStrokes(model)).map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };

  logger.debug(`input.inputUnits[0].components size is ${input.inputUnits[0].components.length}`);

  const data = {
    instanceId,
    applicationKey: paperOptions.recognitionParams.server.applicationKey,
    textInput: JSON.stringify(input)
  };

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
