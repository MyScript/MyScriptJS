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
