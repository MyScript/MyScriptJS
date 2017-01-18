import { recognizerLogger as logger } from '../configuration/LoggerConfig';
import * as InkModel from '../model/InkModel';
import * as RecognizerContext from '../model/RecognizerContext';

/**
 * Recognizer info
 * @typedef {Object} RecognizerInfo
 * @property {String} type Supported recognition type (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol Supported protocol (REST, WEBSOCKET).
 * @property {String} apiVersion Supported API version.
 * @property {Array<String>} availableTriggers Supported triggers for this recognizer.
 * @property {String} preferredTrigger Preferred recognition trigger for this recognizer.
 */

/**
 * Recognition service entry point
 * @typedef {Object} Recognizer
 * @property {function(): RecognizerInfo} getInfo Get information about the supported configuration (protocol, type, apiVersion, ...).
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} init Initialize recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} reset Clear server context. Currently nothing to do there.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} recognize Do the recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} close Close and free all resources that will no longer be used by the recognizer.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} [undo] Undo Undo the last done action.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} [redo] Redo Redo the previously undone action.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} [clear] Clear Clear the current model.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} [resize] Resize.
 */

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  const modelRef = InkModel.resetModelPositions(model);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  delete recognizerContextRef.instanceId;
  logger.debug('No reset behavior', modelRef);
  return Promise.resolve(modelRef);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the close phase is over.
 */
export function close(options, model, recognizerContext) {
  const modelRef = InkModel.resetModelPositions(model);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  delete recognizerContextRef.instanceId;
  logger.debug('No close behavior', modelRef);
  return Promise.resolve(modelRef);
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(options, model, recognizerContext) {
  const modelRef = InkModel.resetModelPositions(model);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  logger.debug('No init behavior', modelRef);
  return Promise.resolve(modelRef);
}
