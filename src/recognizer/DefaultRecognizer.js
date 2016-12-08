import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Clear server context. Currently nothing to do there.
 * @param paperOptions
 * @param model
 * @param recognizerContext
 */
export function reset(paperOptions, model, recognizerContext) {
  logger.debug('No reset behavior');
  return Promise.resolve();
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param paperOptions
 * @param model
 * @param recognizerContext
 */
export function close(paperOptions, model, recognizerContext) {
  logger.debug('No close behavior');
}

export function init(paperOptionsParam, recognizerContextParam) {
  logger.debug('No init behavior');
}
