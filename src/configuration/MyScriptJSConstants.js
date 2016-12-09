/**
 * @typedef {Object} Constants
 * @property {{TEXT: string, MATH: string, SHAPE: string, MUSIC: string, ANALYZER: string}} RecognitionType
 * @property {{CURSIVE: string, ISOLATED: string, SUPERIMPOSED: string, VERTICAL: string}} InputMode
 * @property {{CHAR: string, WORD: string, SINGLE_LINE_TEXT: string, MULTI_LINE_TEXT: string}} InputType
 * @property {{TEXT: string, WORD: string, CHARACTER: string}} ResultDetail
 * @property {{Math: {LATEX: string, MATHML: string, SYMBOLTREE: string, OFFICEOPENXMLMATH: string}, Music: {MUSICXML: string, SCORETREE: string}}} ResultType
 * @property {{WEBSOCKET: string, REST: string}} Protocol
 * @property {{INITIALIZING: string, ASKING_FOR_RECOGNITION: string, PROCESSING_RECOGNITION_RESULT: string, RENDERING_RECOGNITION: string, RECOGNITION_ERROR: string, RECOGNITION_OVER: string}} ModelState
 * @property {{QUIET_PERIOD: string, PEN_UP: string, DEMAND: string}} RecognitionTrigger
 */

const MyScriptJSConstants = {
  RecognitionType: {
    TEXT: 'TEXT',
    MATH: 'MATH',
    SHAPE: 'SHAPE',
    MUSIC: 'MUSIC',
    ANALYZER: 'ANALYZER'
  },
  InputMode: {
    CURSIVE: 'CURSIVE',
    ISOLATED: 'ISOLATED',
    SUPERIMPOSED: 'SUPERIMPOSED',
    VERTICAL: 'VERTICAL'
  },
  InputType: {
    CHAR: 'CHAR',
    WORD: 'WORD',
    SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
    MULTI_LINE_TEXT: 'MULTI_LINE_TEXT'
  },
  ResultDetail: {
    TEXT: 'TEXT',
    WORD: 'WORD',
    CHARACTER: 'CHARACTER'
  },
  ResultType: {
    Math: {
      LATEX: 'LATEX',
      MATHML: 'MATHML',
      SYMBOLTREE: 'SYMBOLTREE',
      OFFICEOPENXMLMATH: 'OFFICEOPENXMLMATH'
    },
    Music: {
      MUSICXML: 'MUSICXML',
      SCORETREE: 'SCORETREE'
    }
  },
  Protocol: {
    WEBSOCKET: 'WEBSOCKET',
    REST: 'REST'
  },
  ModelState: {
    INITIALIZING: 'INITIALIZING',
    ASKING_FOR_RECOGNITION: 'ASKING FOR RECOGNITION',
    PROCESSING_RECOGNITION_RESULT: 'PROCESSING RECOGNITION RESULT',
    RENDERING_RECOGNITION: 'RENDERING RECOGNITION',
    RECOGNITION_ERROR: 'RECOGNITION ERROR',
    RECOGNITION_OVER: 'RECOGNITION OVER'
  },
  RecognitionTrigger: {
    QUIET_PERIOD: 'QUIET_PERIOD',
    PEN_UP: 'PEN_UP',
    DEMAND: 'DEMAND'
  }
};
export default MyScriptJSConstants;
