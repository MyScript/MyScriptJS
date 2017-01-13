import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function processRenderingResult(model) {
  const modelReference = model;

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.rawStrokes.slice();

  const result = modelReference.rawResult.result;
  if (result && result.scratchOutResults && (result.scratchOutResults.length > 0)) {
    const scratchedInkRanges = result.scratchOutResults
        .map(scratchOutResult => scratchOutResult.erasedInkRanges.concat(scratchOutResult.inkRanges))
        .reduce((a, b) => a.concat(b));

    scratchedInkRanges.forEach((scratchedInkRange) => {
      potentialStrokeList[scratchedInkRange.component].toBeRemove = true;
    });
  }
  modelReference.recognizedSymbols = potentialStrokeList.filter(stroke => !stroke.toBeRemove);
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
}
