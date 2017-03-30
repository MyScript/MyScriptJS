import { recognizerLogger as logger } from '../configuration/LoggerConfig';
import * as InkModel from '../model/InkModel';
import * as RecognizerContext from '../model/RecognizerContext';

/**
 * Recognizer info
 * @typedef {Object} RecognizerInfo
 * @property {Array<String>} types Supported recognition types (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol Supported protocol (REST, WEBSOCKET).
 * @property {String} apiVersion Supported API version.
 * @property {Array<String>} availableTriggers Supported triggers for this recognizer.
 */

/**
 * Recognizer callback
 * @callback RecognizerCallback
 * @param {Object} err Error
 * @param {Model} model Result
 */

/**
 * Recognition service entry point
 * @typedef {Object} Recognizer
 * @property {function(): RecognizerInfo} getInfo Get information about the supported configuration (protocol, type, apiVersion, ...).
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} init Initialize recognition.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} clear Clear server context. Currently nothing to do there.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} close Close and free all resources that will no longer be used by the recognizer.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [undo] Undo Undo the last done action.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [redo] Redo Redo the previously undone action.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [resize] Resize.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [addStrokes] Add strokes.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [recognize] Do the recognition.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [convert] Convert.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [changeSolverConfiguration] Change solver configuration.
 */

/**
 * Initialize recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function init(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  logger.debug('Updated model', modelRef);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  logger.debug('Updated recognizer context', recognizerContextRef);
  callback(undefined, modelRef);
}

/**
 * Reset server context. Currently nothing to do there.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function reset(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  logger.debug('Updated model', modelRef);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  delete recognizerContextRef.instanceId;
  logger.debug('Updated recognizer context', recognizerContextRef);
  callback(undefined, modelRef);
}

/**
 * Clear server context. Currently nothing to do there.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.clearModel(model);
  logger.debug('Updated model', modelRef);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  delete recognizerContextRef.instanceId;
  logger.debug('Updated recognizer context', recognizerContextRef);
  callback(undefined, modelRef);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
export function close(configuration, model, recognizerContext, callback) {
  clear(configuration, model, recognizerContext, callback);
}
