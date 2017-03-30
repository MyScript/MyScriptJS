import { recognizerLogger as logger } from '../../configuration/LoggerConfig';

/**
 * Extract the exports
 * @param {Model} model Current model
 * @return {Object} Recognition result
 */
export function extractExports(model) {
  if (model.rawResults &&
      model.rawResults.exports &&
      model.rawResults.exports.result &&
      model.rawResults.exports.result.results) {
    return model.rawResults.exports.result.results
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
