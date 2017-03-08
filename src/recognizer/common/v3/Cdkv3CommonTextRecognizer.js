import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * Extract the recognition result
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
export function extractRecognitionResult(model) {
  const res = {};
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  if (model.rawResults &&
      model.rawResults.recognition &&
      model.rawResults.recognition.result &&
      model.rawResults.recognition.result.textSegmentResult &&
      model.rawResults.recognition.result.textSegmentResult.candidates) {
    res[MyScriptJSConstants.MIME.TEXT] = model.rawResults.recognition.result.textSegmentResult.candidates[model.rawResults.recognition.result.textSegmentResult.selectedCandidateIdx].label;
  }
  return res;
}
