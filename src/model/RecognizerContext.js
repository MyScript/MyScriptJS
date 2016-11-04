export function createEmptyRecognizerContext() {
  return {
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    // analyzerInstanceId
    // mahtInstanceId
    // shapeInstanceId
    recognitionIdx: 0
  };
}
