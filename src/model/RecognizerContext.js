import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognition context
 * @typedef {Object} RecognizerContext
 * @property {Array} recognitionContexts
 * @property {Promise} initPromise
 * @property {RecognitionPositions} lastRecognitionPositions  Last recognition sent/received stroke indexes.
 */

/**
 * Create a new recognition context
 * @return {RecognizerContext} An object that contains all recognition context
 */
export function createEmptyRecognizerContext() {
  return {
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastRecognitionPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    }
  };
}

/**
 * Reset the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function resetRecognitionPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.lastRecognitionPositions.lastSentPosition = -1;
  recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = 0;
  logger.debug('Reset recognition positions');
}

/**
 * Update the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function updateRecognitionPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  recognizerContext.lastRecognitionPositions.lastSentPosition = model.lastRecognitionPositions.lastSentPosition;
}
