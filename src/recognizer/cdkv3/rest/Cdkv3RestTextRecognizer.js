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
export const textRestV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.TEXT,
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
  return textRestV3Configuration;
}

/**
 * Internal function to build the payload to ask for a recognition.
 * @param {Options} options
 * @param {Model} model
 * @param {RecognizerContext} recognizerContext
 * @return {Object}
 */
export function buildInput(options, model, recognizerContext) {
  const sendMessage = (message) => {
    RecognizerContext.updateSentRecognitionPositions(recognizerContext, model);
    return message;
  };

  const input = {
    inputUnits: [{
      textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
      // As Rest TEXT recognition is non incremental wa add the already recognized strokes
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    }]
  };
  Object.assign(input, { textParameter: options.recognitionParams.textParameter }); // Building the input with the suitable parameters

  logger.debug(`input.inputUnits[0].components size is ${input.inputUnits[0].components.length}`);

  const data = {
    instanceId: recognizerContext ? recognizerContext.instanceId : undefined,
    applicationKey: options.recognitionParams.server.applicationKey,
    textInput: JSON.stringify(input)
  };

  if (options.recognitionParams.server.hmacKey) {
    data.hmac = CryptoHelper.computeHmac(data.textInput, options.recognitionParams.server.applicationKey, options.recognitionParams.server.hmacKey);
  }
  return sendMessage(data);
}

function resultCallback(model) {
  logger.debug('Cdkv3RestTextRecognizer result callback', model);
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
  return Cdkv3RestRecognizerUtil.postMessage('/api/v3.0/recognition/rest/text/doSimpleRecognition.json', options, model, recognizerContext, buildInput)
      .then(resultCallback);
}
