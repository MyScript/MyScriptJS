/**
 * Created by padewitte on 04/11/16.
 */
import { recognizerLogger as logger } from '../configuration/LoggerConfig';
/**
 * Clear server context. Currently nothing to do there.
 * @param args
 */
export function reset(paperOptionsParam, modelParam, recognizerContextParam) {
}

/**
 * Close and free all ressources that will no longuer be used by the recognizer.
 * @param paperOptionsParam
 * @param modelParam
 */
export function close(paperOptionsParam, modelParam, recognizerContextParam) {
}


export function init(paperOptionsParam, recognizerContextParam) {
  logger.debug('No init behavior');
}

