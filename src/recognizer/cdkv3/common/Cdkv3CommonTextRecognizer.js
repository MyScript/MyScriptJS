import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function processRenderingResult(model) {
  logger.debug('Building the rendering model', model);
  return model;
}
