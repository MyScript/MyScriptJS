import { recognizerLogger as logger } from '../configuration/LoggerConfig';
import * as InkModel from '../model/InkModel';
import * as RecognizerContext from '../model/RecognizerContext';
import Constants from '../configuration/Constants';

/**
 * Triggers
 * @typedef {Object} Triggers
 * @property {Array<String>} exportContent Supported triggers for exporting content.
 * @property {Array<String>} [addStrokes] Supported triggers for adding strokes.
 */

/**
 * Recognizer info
 * @typedef {Object} RecognizerInfo
 * @property {Array<String>} types Supported recognition types (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol Supported protocol (REST, WEBSOCKET).
 * @property {String} apiVersion Supported API version.
 * @property {Triggers} availableTriggers Supported triggers for this recognizer.
 */

/**
 * Recognizer callback
 * @callback RecognizerCallback
 * @param {Object} err Error
 * @param {Model} model Result
 * @param {...String} types Result types
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
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [exportContent] Export content.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [convert] Convert.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [waitForIdle] Wait for idle.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [setPenStyle] Set pen style.
 * @property {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: RecognizerCallback)} [setTheme] Set theme.
 */

/**
 * Initialize recognition
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function init(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.resetModelPositions(model);
  logger.debug('Updated model', modelRef);
  const recognizerContextRef = RecognizerContext.updateRecognitionPositions(recognizerContext, modelRef);
  recognizerContextRef.initPromise = Promise.resolve(modelRef);
  recognizerContextRef.initPromise
    .then((res) => {
      recognizerContextRef.initialized = true;
      logger.debug('Updated recognizer context', recognizerContextRef);
      callback(undefined, res, Constants.EventType.LOADED);
    });
}

/**
 * Reset server context. Currently nothing to do there.
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object, types: ...String)} callback
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
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function clear(configuration, model, recognizerContext, callback) {
  const modelRef = InkModel.cloneModel(model);
  InkModel.clearModel(modelRef);
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
 * @param {function(err: Object, res: Object, types: ...String)} callback
 */
export function close(configuration, model, recognizerContext, callback) {
  clear(configuration, model, recognizerContext, callback);
}
