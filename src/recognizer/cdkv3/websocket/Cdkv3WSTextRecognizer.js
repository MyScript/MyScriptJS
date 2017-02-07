import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import * as RecognizerContext from '../../../model/RecognizerContext';
import { processRenderingResult } from '../common/Cdkv3CommonTextRecognizer';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {{type: String, protocol: String, apiVersion: String}}
 */
export const textWebSocketV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.TEXT,
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V3'
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return Object.assign({}, Cdkv3WSRecognizerUtil.commonWebSocketV3Configuration, textWebSocketV3Configuration);
}

function buildTextInput(recognizerContext, model, options) {
  const sendMessage = (message) => {
    RecognizerContext.updateSentRecognitionPositions(recognizerContext, model);
    return message;
  };

  if (recognizerContext.lastRecognitionPositions.lastSentPosition < 0) {
    return sendMessage({
      type: 'start',
      textParameter: options.recognitionParams.textParameter,
      inputUnits: [{
        textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
        components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
      }]
    });
  }

  return sendMessage({
    type: 'continue',
    inputUnits: [{
      textInputType: MyScriptJSConstants.InputType.MULTI_LINE_TEXT,
      components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
    }]
  });
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(options, model, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/text';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, options, model, recognizerContext);
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(options, recognizerContext, model, buildTextInput)
      .then(processRenderingResult)
      .then(Cdkv3WSRecognizerUtil.updateModelReceivedPosition);
}

