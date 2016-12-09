/**
 * @typedef {Object} RecognitionContext
 * @property {Array} recognitionContexts
 * @property {Object} initPromise
 * @property {{lastSendPosition: Number}} lastRecognitionPositions
 * @property {Object} recognizerReadyDestructuredPromise
 * @property {Boolean} clearRequested
 */

/**
 * Create a new recognition context
 * @return {RecognitionContext}
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
