/**
 * Recognition context
 * @typedef {{recognitionContexts: Array, initPromise: undefined, lastRecognitionPositions: {lastSendPosition: number}, recognizerReadyDestructuredPromise: undefined, clearRequested: boolean}} RecognitionContext
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
