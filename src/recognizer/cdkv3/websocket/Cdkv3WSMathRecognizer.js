import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';
import * as RecognizerContext from '../../../model/RecognizerContext';
import { processRenderingResult } from '../common/Cdkv3CommonMathRecognizer';

export { reset, close } from './Cdkv3WSRecognizerUtil';

/**
 * Recognizer configuration
 * @type {RecognizerInfo}
 */
export const mathWebSocketV3Configuration = {
  type: MyScriptJSConstants.RecognitionType.MATH,
  protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
  apiVersion: 'V3',
  availableTriggers: [MyScriptJSConstants.RecognitionTrigger.PEN_UP],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.PEN_UP
};

/**
 * Get the configuration supported by this recognizer
 * @return {RecognizerInfo}
 */
export function getInfo() {
  return mathWebSocketV3Configuration;
}

function buildMathInput(recognizerContext, model, options) {
  const sendMessage = (message) => {
    RecognizerContext.updateSentRecognitionPositions(recognizerContext, model);
    return message;
  };

  if (recognizerContext.lastRecognitionPositions.lastSentPosition < 0) {
    return sendMessage({
      type: 'start',
      parameters: options.recognitionParams.mathParameter,
      components: model.rawStrokes.map(stroke => StrokeComponent.toJSON(stroke))
    });
  }

  return sendMessage({
    type: 'continue',
    components: InkModel.extractPendingStrokes(model, -1).map(stroke => StrokeComponent.toJSON(stroke))
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
  return Cdkv3WSRecognizerUtil.init('/api/v3.0/recognition/ws/math', options, model, recognizerContext);
}

/**
 * Do the recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Promise that return an updated model as a result
 */
export function recognize(options, model, recognizerContext) {
  return Cdkv3WSRecognizerUtil.sendMessages(options, recognizerContext, model, buildMathInput)
      .then(processRenderingResult)
      .then(InkModel.updateModelReceivedPosition);
}
