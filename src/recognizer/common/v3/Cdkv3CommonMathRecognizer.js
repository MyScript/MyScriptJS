import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * Extract the recognized symbols
 * @param {Model} model Current model
 * @return {Array<Object>} Recognized symbols
 */
export function extractRecognizedSymbols(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const strokeList = [...model.rawStrokes];

  if (model.rawResults &&
      model.rawResults.exports &&
      model.rawResults.exports.result &&
      model.rawResults.exports.result.scratchOutResults &&
      (model.rawResults.exports.result.scratchOutResults.length > 0)) {
    const inkRanges = model.rawResults.exports.result.scratchOutResults
        .map(scratchOutResult => scratchOutResult.erasedInkRanges.concat(scratchOutResult.inkRanges))
        .reduce((a, b) => a.concat(b));
    return strokeList.filter((stroke, index) => !inkRanges.find(inkRange => inkRange.component === index));
  }
  return strokeList;
}
