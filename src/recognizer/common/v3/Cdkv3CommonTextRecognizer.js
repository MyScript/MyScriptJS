/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} exports
 */
export function extractExports(model) {
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  if (model.rawResults &&
    model.rawResults.exports &&
    model.rawResults.exports.result &&
    model.rawResults.exports.result.textSegmentResult &&
    model.rawResults.exports.result.textSegmentResult.candidates) {
    return {
      CANDIDATES: model.rawResults.exports.result,
      TEXT: model.rawResults.exports.result.textSegmentResult.candidates[model.rawResults.exports.result.textSegmentResult.selectedCandidateIdx].label
    };
  }
  return {};
}
