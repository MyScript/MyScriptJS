import { recognizerLogger as logger } from '../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../configuration/MyScriptJSConstants';

/**
 * Extract the recognition result
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
export function extractRecognitionResult(model) {
  const result = model.rawResults.recognition.result;
  if (result && result.results) {
    return result.results
        .filter(item => Object.keys(MyScriptJSConstants.MIME).includes(item.type))
        .map((item) => {
          const res = {};
          res[MyScriptJSConstants.MIME[`${item.type}`]] = item.value;
          return res;
        })
        .reduce((a, b) => Object.assign(a, b));
  }
  return {};
}
