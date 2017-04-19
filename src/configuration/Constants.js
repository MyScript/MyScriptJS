/**
 * @typedef {Object} Constants
 */

const Constants = {
  EventType: {
    LOADED: 'load',
    CHANGED: 'change',
    EXPORTED: 'exported',
    CONVERTED: 'converted',
    UNDO: 'undo',
    REDO: 'redo',
    CLEAR: 'clear',
    EXPORT: 'export',
    CONVERT: 'convert',
    ERROR: 'error'
  },
  RecognitionType: {
    TEXT: 'TEXT',
    MATH: 'MATH',
    SHAPE: 'SHAPE',
    MUSIC: 'MUSIC',
    ANALYZER: 'ANALYZER',
    DIAGRAM: 'DIAGRAM',
    NEBO: 'NEBO'
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
