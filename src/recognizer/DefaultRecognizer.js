import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognition service entry point
 * @typedef {Object} Recognizer
 * @property {function()} getAvailableRecognitionSlots Get the authorized triggers.
 * @property {function(options: Options, recognizerContext: RecognizerContext)} init Initialize recognition.
 * @property {function(options: Options, model: Model, recognizer: Recognizer, recognizerContext: RecognizerContext)} manageResetState Check if a reset is required, and does it if it is.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext)} reset Clear server context. Currently nothing to do there.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext)} recognize Do the recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext)} close Close and free all resources that will no longer be used by the recognizer.
 */

/**
 * Clear server context. Currently nothing to do there.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function reset(options, model, recognizerContext) {
  logger.debug('No reset behavior');
  return Promise.resolve();
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function close(options, model, recognizerContext) {
  logger.debug('No close behavior');
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function init(options, recognizerContext) {
  logger.debug('No init behavior');
}
