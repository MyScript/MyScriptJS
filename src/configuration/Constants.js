/**
 * @typedef {Object} Constants
 */

const Constants = {
  EventType: {
    CHANGED: 'change',
    EXPORTED: 'exported',
    CONVERTED: 'converted',
    LOADED: 'loaded',
    UNDO: 'undo',
    REDO: 'redo',
    CLEAR: 'clear',
    IMPORT: 'import',
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
  },
  Error: {
    NOT_REACHABLE: 'MyScript recognition server is not reachable. Please reload once you are connected.',
    WRONG_CREDENTIALS: 'Application credentials are invalid. Please check or regenerate your application key and hmackey.'
  }
};
export default Constants;
