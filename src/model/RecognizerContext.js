/**
 * @typedef {Object} RecognizerContext
 * @property {Array} recognitionContexts
 * @property {Object} initPromise
 * @property {{lastSendPosition: Number}} lastRecognitionPositions
 * @property {Object} recognizerReadyDestructuredPromise
 * @property {Boolean} clearRequested
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
    // analyzerInstanceId
    // mathInstanceId
    // shapeInstanceId
    lastRecognitionPositions: {
      lastSendPosition: -1
    },
    recognizerReadyDestructuredPromise: undefined,
    clearRequested: false,
  };
}
