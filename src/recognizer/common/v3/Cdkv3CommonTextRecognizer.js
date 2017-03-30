import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
export function extractExports(model) {
  const res = {};
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  if (model.rawResults &&
      model.rawResults.exports &&
      model.rawResults.exports.result &&
      model.rawResults.exports.result.textSegmentResult &&
      model.rawResults.exports.result.textSegmentResult.candidates) {
    res.TEXT = model.rawResults.exports.result.textSegmentResult.candidates[model.rawResults.exports.result.textSegmentResult.selectedCandidateIdx].label;
  }
  return res;
}
