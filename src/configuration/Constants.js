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
    IDLE: 'idle',
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
    ADD_STROKE: 'ADD_STROKE',
    DEMAND: 'DEMAND'
  },
  Logger: {
    EDITOR: 'editor',
    MODEL: 'model',
    GRABBER: 'grabber',
    RENDERER: 'renderer',
    RECOGNIZER: 'recognizer',
    CALLBACK: 'callback',
    UTIL: 'util'
  },
  LogLevel: {
    TRACE: 'TRACE',
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
  }
};
export default Constants;
