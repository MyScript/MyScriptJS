/**
 * Constants
 * @type {{RecognitionType: {TEXT: string, MATH: string, SHAPE: string, MUSIC: string, ANALYZER: string}, InputMode: {CURSIVE: string, ISOLATED: string, SUPERIMPOSED: string, VERTICAL: string}, InputType: {CHAR: string, WORD: string, SINGLE_LINE_TEXT: string, MULTI_LINE_TEXT: string}, ResultDetail: {TEXT: string, WORD: string, CHARACTER: string}, ResultType: {Math: {LATEX: string, MATHML: string, SYMBOLTREE: string, OFFICEOPENXMLMATH: string}, Music: {MUSICXML: string, SCORETREE: string}}, Protocol: {WEBSOCKET: string, REST: string}, ModelState: {INITIALIZING: string, ASKING_FOR_RECOGNITION: string, PROCESSING_RECOGNITION_RESULT: string, RENDERING_RECOGNITION: string, RECOGNITION_ERROR: string, RECOGNITION_OVER: string}, RecognitionTrigger: {QUIET_PERIOD: string, PEN_UP: string, DEMAND: string}}}
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
