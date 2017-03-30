/**
 * @typedef {Object} Constants
 * @property {{TEXT: String, MATH: String, SHAPE: String, MUSIC: String, ANALYZER: String}} RecognitionType
 * @property {{QUIET_PERIOD: String, POINTER_UP: String, DEMAND: String}} RecognitionTrigger
 */

const Constants = {
  EventType: {
    LOADED: 'load',
    UNLOADED: 'unload',
    CHANGED: 'change',
    EXPORTED: 'result',
    CONVERTED: 'converted',
    UNDO: 'undo',
    REDO: 'redo',
    CLEAR: 'clear',
    EXPORT: 'recognize',
    CONVERT: 'convert',
    ERROR: 'error'
  },
  RecognizerFeature: {
    UNDO_REDO: 'UNDO_REDO',
    CONVERT: 'CONVERT',
    RECOGNITION: 'RECOGNITION',
    RESIZE: 'RESIZE'
  },
  RecognitionType: {
    TEXT: 'TEXT',
    MATH: 'MATH',
    SHAPE: 'SHAPE',
    MUSIC: 'MUSIC',
    ANALYZER: 'ANALYZER',
    NEBO: 'NEBO',
    DIAGRAM: 'DIAGRAM'
  },
  Protocol: {
    WEBSOCKET: 'WEBSOCKET',
    REST: 'REST'
  },
  ModelState: {
    INITIALIZING: 'INITIALIZING',
    INITIALIZED: 'INITIALIZED',
    EXPORTING: 'EXPORTING',
    EXPORTED: 'EXPORTED',
    PENDING: 'PENDING',
    MODIFIED: 'MODIFIED',
    ERROR: 'ERROR'
  },
  Trigger: {
    QUIET_PERIOD: 'QUIET_PERIOD',
    POINTER_UP: 'POINTER_UP',
    DEMAND: 'DEMAND'
  }
};
export default Constants;
