import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

export function generateRenderingResult(model) {
  const modelReference = model;

  // TEXT recognition doesn't support scratch-out, so we recopy input symbols to output
  modelReference.recognizedSymbols = model.pendingStrokes.slice();
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
}
