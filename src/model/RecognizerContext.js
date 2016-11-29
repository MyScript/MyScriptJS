export function createEmptyRecognizerContext() {
  return {
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    // analyzerInstanceId
    // mathInstanceId
    // shapeInstanceId
    recognitionIdx: 0,
    resetRequested: false,
    recognizerReadyDestructuredPromise: undefined,
    clearRequested: false,
  };
}
