import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

function extractRecognizedSymbolsFromMathResult(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const strokeList = [...model.rawStrokes];

  const result = model.rawResult.result;
  if (result && result.scratchOutResults && (result.scratchOutResults.length > 0)) {
    const inkRanges = result.scratchOutResults
        .map(scratchOutResult => scratchOutResult.erasedInkRanges.concat(scratchOutResult.inkRanges))
        .reduce((a, b) => a.concat(b));
    return strokeList.filter((stroke, index) => !inkRanges.find(inkRange => inkRange.component === index));
  }
  return strokeList;
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function processRenderingResult(model) {
  const modelReference = model;
  logger.debug('Building the rendering model', modelReference);
  modelReference.recognizedSymbols = extractRecognizedSymbolsFromMathResult(model);
  logger.debug('MathRecognizer model updated', modelReference);
  return modelReference;
}
