/**
 * @typedef {Object} Constants
 * @property {{TEXT: String, MATH: String, SHAPE: String, MUSIC: String, ANALYZER: String}} RecognitionType
 * @property {{CURSIVE: String, ISOLATED: String, SUPERIMPOSED: String, VERTICAL: String}} InputMode
 * @property {{CHAR: String, WORD: String, SINGLE_LINE_TEXT: String, MULTI_LINE_TEXT: String}} InputType
 * @property {{TEXT: String, WORD: String, CHARACTER: String}} ResultDetail
 * @property {{Math: {LATEX: String, MATHML: String, SYMBOLTREE: String, OFFICEOPENXMLMATH: String}, Music: {MUSICXML: String, SCORETREE: String}}} ResultType
 * @property {{WEBSOCKET: String, REST: String}} Protocol
 * @property {{INITIALIZING: String, ASKING_FOR_RECOGNITION: String, PROCESSING_RECOGNITION_RESULT: String, RENDERING_RECOGNITION: String, RECOGNITION_ERROR: String, RECOGNITION_OVER: String}} ModelState
 * @property {{QUIET_PERIOD: String, PEN_UP: String, DEMAND: String}} RecognitionTrigger
 */

const Constants = {
  EventType: {
    CHANGE: 'change',
    RECOGNITION_RESULT: 'result',
    TYPESET: 'typeset',
    ERROR: 'error'
  },
  RecognizerFeature: {
    UNDO_REDO: 'UNDO_REDO',
    TYPESET: 'TYPESET',
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
  InputType: {
    CHAR: 'CHAR',
    WORD: 'WORD',
    SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
    MULTI_LINE_TEXT: 'MULTI_LINE_TEXT'
  },
  Protocol: {
    WEBSOCKET: 'WEBSOCKET',
    REST: 'REST'
  },
  ModelState: {
    INITIALIZING: 'INITIALIZING',
    PENDING: 'PENDING',
    ASKING_FOR_RECOGNITION: 'ASKING FOR RECOGNITION',
    PROCESSING_RECOGNITION_RESULT: 'PROCESSING RECOGNITION RECOGNITION_RESULT',
    RECOGNITION_ERROR: 'RECOGNITION ERROR',
    RECOGNITION_OVER: 'RECOGNITION OVER'
  },
  RecognitionTrigger: {
    QUIET_PERIOD: 'QUIET_PERIOD',
    PEN_UP: 'PEN_UP',
    DEMAND: 'DEMAND'
  }
};
export default Constants;
