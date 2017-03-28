import { recognizerLogger as logger } from '../../configuration/LoggerConfig';

/**
 * Extract the recognition result
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
export function extractRecognitionResult(model) {
  if (model.rawResults &&
      model.rawResults.recognition &&
      model.rawResults.recognition.result &&
      model.rawResults.recognition.result.results) {
    return model.rawResults.recognition.result.results
        .map((item) => {
          const res = {};
          if (Object.keys(item).includes('root')) {
            res[`${item.type}`] = item.root;
          } else {
            res[`${item.type}`] = item.value;
          }
          return res;
        })
        .reduce((a, b) => Object.assign(a, b));
  }
  return {};
}
