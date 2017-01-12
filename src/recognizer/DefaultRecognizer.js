import { recognizerLogger as logger } from '../configuration/LoggerConfig';

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
 * @property {function(options: Options, recognizerContext: RecognizerContext): Promise} init Initialize recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise} reset Clear server context. Currently nothing to do there.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise} recognize Do the recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise} close Close and free all resources that will no longer be used by the recognizer.
 */

/**
 * Clear server context. Currently nothing to do there.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise}
 */
export function reset(options, model, recognizerContext) {
  logger.debug('No reset behavior');
  return Promise.resolve();
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 */
export function close(options, model, recognizerContext) {
  logger.debug('No close behavior');
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {RecognizerContext} recognizerContext Current recognizer context
 */
export function init(options, recognizerContext) {
  logger.debug('No init behavior');
}
