import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * @typedef {Object} Recognizer
 * @property {function()} getAvailableRecognitionSlots
 * @property {function(options: Parameters, recognizerContext: RecognizerContext)} init
 * @property {function(options: Parameters, model: Model, recognizer: Recognizer, recognizerContext: RecognizerContext)} manageResetState
 * @property {function(options: Parameters, model: Model, recognizerContext: RecognizerContext)} reset
 * @property {function(options: Parameters, model: Model, recognizerContext: RecognizerContext)} recognize
 * @property {function(options: Parameters, model: Model, recognizerContext: RecognizerContext)} close
 */

/**
 * Clear server context. Currently nothing to do there.
 * @param {Parameters} paperOptions Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function reset(paperOptions, model, recognizerContext) {
  logger.debug('No reset behavior');
  return Promise.resolve();
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Parameters} paperOptions Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function close(paperOptions, model, recognizerContext) {
  logger.debug('No close behavior');
}

/**
 * Initialize recognition
 * @param {Parameters} paperOptions Current configuration
 * @param {RecognizerContext} recognizerContext Current recognition context
 */
export function init(paperOptions, recognizerContext) {
  logger.debug('No init behavior');
}
