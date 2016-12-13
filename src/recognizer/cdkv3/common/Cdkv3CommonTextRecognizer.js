import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function generateRenderingResult(model) {
  const modelReference = model;

  // TEXT recognition doesn't support scratch-out, so we recopy input symbols to output
  modelReference.recognizedSymbols = model.rawStrokes.slice();
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
}
