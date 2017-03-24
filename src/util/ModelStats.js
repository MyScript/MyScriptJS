import { utilLogger as logger } from '../configuration/LoggerConfig';
import * as Cdkv3RestTextRecognizer from '../recognizer/rest/v3/Cdkv3RestTextRecognizer';
import * as RecognizerContext from '../model/RecognizerContext';
import defaultOptions from '../configuration/DefaultConfiguration';

/**
 * @typedef {Object} Stats
 * @property {Number} strokesCount
 * @property {Number} pointsCount
 * @property {Number} byteSize
 * @property {Number} humanSize
 * @property {String} humanUnit
 */

/**
 * @param {Model} model Current model
 * @return {Stats} Statistics about recognition
 */
export function computeStats(model) {
  const stats = { strokesCount: 0, pointsCount: 0, byteSize: 0, humanSize: 0, humanUnit: 'BYTE' };
  if (model.rawStrokes) {
    stats.strokesCount = model.rawStrokes.length;

    const restMessage = Cdkv3RestTextRecognizer.buildInput(defaultOptions, model, RecognizerContext.createEmptyRecognizerContext());
    stats.pointsCount = model.rawStrokes.map(stroke => stroke.x.length).reduce((a, b) => a + b, 0);
    // We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecognition
    const byteSize = restMessage.textInput.length;
    stats.byteSize = byteSize;
    if (byteSize < 270) {
      stats.humanUnit = 'BYTE';
      stats.byteSize = 0;
      stats.humanSize = 0;
    } else if (byteSize < 2048) {
      stats.humanUnit = 'BYTES';
      stats.humanSize = byteSize;
    } else if (byteSize < 1024 * 1024) {
      stats.humanUnit = 'KiB';
      stats.humanSize = (byteSize / 1024).toFixed(2);
    } else {
      stats.humanUnit = 'MiB';
      stats.humanSize = (byteSize / 1024 / 1024).toFixed(2);
    }
  }
  logger.info('Stats', stats);
  return stats;
}
