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
