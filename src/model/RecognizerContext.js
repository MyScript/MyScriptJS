/**
 * @typedef {Object} RecognitionContext
 * @property {Array} recognitionContexts
 * @property {Object} initPromise
 * @property {{lastSendPosition: number}} lastRecognitionPositions
 * @property {Object} recognizerReadyDestructuredPromise
 * @property {boolean} clearRequested
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
