import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Clear server context. Currently nothing to do there.
 * @param {Parameters} paperOptions
 * @param {Model} model
 * @param {RecognitionContext} recognizerContext
 */
export function reset(paperOptions, model, recognizerContext) {
  logger.debug('No reset behavior');
  return Promise.resolve();
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Parameters} paperOptions
 * @param {Model} model
 * @param {RecognitionContext} recognizerContext
 */
export function close(paperOptions, model, recognizerContext) {
  logger.debug('No close behavior');
}

/**
 * Initialize recognition
 * @param {Parameters} paperOptions
 * @param {RecognitionContext} recognizerContext
 */
export function init(paperOptions, recognizerContext) {
  logger.debug('No init behavior');
}
