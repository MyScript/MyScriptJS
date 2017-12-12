import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * WebSocket configuration
 * @typedef {Object} WebSocketConf
 * @property {Boolean} pingEnabled=true Enable/disable ping feature.
 * @property {Number} pingDelay=30000 Delay in millisecond to wait before sending a ping.
 * @property {Number} maxPingLostCount=10 Failed ping count before closing the socket
 * @property {Boolean} autoReconnect=true Will try to reconnect when websocket is close or when a timeout is detected. Do not handle the case when user change network on his device.
 * @property {Number} maxRetryCount=2 Number of retries when auto reconnect is enabled
 * @property {Number} fileChunkSize=300000 File chunk size in bytes
 */

/**
 * Server configuration
 * @typedef {Object} ServerParameters
 * @property {String} scheme=https Server URL scheme (http/https)
 * @property {String} host=cloud.myscript.com Server host
 * @property {String} applicationKey=undefined MyScript Cloud applicationKey
 * @property {String} hmacKey=undefined MyScript Cloud hmacKey
 * @property {WebSocketConf} websocket WebSocket configuration.
 */

/**
 * Parameters to be used for rendering
 * @typedef {Object} RenderingParameters
 * @property {String} stroker=quadratic Type of stroker. Actually only quadratic is implemented.
 * @property {Number} minHeight=0 Minimal height of the editor
 * @property {Number} minWidth=0 Minimal width of the editor
 */

/**
 * Math v3 parameters
 * @typedef {Object} MathV3Parameters
 * @property {Array<String>} resultTypes=['LATEX','MATHML'] Export types
 * @property {Boolean} columnarOperation=false True to activate columnar recognition
 * @property {Array<String>} userResources=[] Custom user resources to use
 * @property {Number} scratchOutDetectionSensitivity=1 Sensitivity of to scratch-out gesture
 */

/**
 * Text v3 properties
 * @typedef {Object} TextV3Properties
 * @property {Number} textCandidateListSize=1
 * @property {Number} wordCandidateListSize=undefined Can't set a wordCandidateListSize > 0 if ResultDetail is not set to WORD or CHARACTER
 * @property {Number} wordPredictionListSize=0
 * @property {Number} wordCompletionListSize=0
 * @property {Number} characterCandidateListSize=undefined Can't set a characterCandidateListSize > 0 if ResultDetail is not set to CHARACTER
 * @property {Boolean} enableOutOfLexicon=false
 * @property {Boolean} discardCaseVariations=false
 * @property {Boolean} discardAccentuationVariations=false
 * @property {Boolean} glyphDistortion=undefined Only valid with ISOLATED mode
 * @property {Boolean} enableTagger=false
 * @property {Number} spellingDistortion=undefined Only valid with ISOLATED mode
 */

/**
 * Text v3 parameters
 * @typedef {Object} TextV3Parameters
 * @property {String} language=en_US Language to be used
 * @property {String} textInputMode=CURSIVE
 * @property {String} resultDetail=TEXT
 * @property {Array<String>} contentTypes=[]
 * @property {Array<String>} subsetKnowledges=[]
 * @property {Array<String>} userLkWords=[]
 * @property {Array<String>} userResources=[]
 * @property {TextV3Properties} textProperties
 */

/**
 * Shape v3 parameters
 * @typedef {Object} ShapeV3Parameters
 * @property {Array<String>} userResources=undefined
 * @property {Boolean} rejectDetectionSensitivity=1
 * @property {Boolean} doBeautification=true
 */

/**
 * Music clef v3 parameters
 * @typedef {Object} MusicClefV3Parameters
 * @property {Number} symbol=G
 * @property {Number} octave=0
 * @property {Number} line=2
 */

/**
 * Music staff v3 parameters
 * @typedef {Object} MusicStaffV3Parameters
 * @property {Number} top=100
 * @property {Number} count=5
 * @property {Number} gap=20
 */

/**
 * Music v3 parameters
 * @typedef {Object} MusicV3Parameters
 * @property {Number} divisions=480
 * @property {Array<String>} resultTypes=['MUSICXML','SCORETREE']
 * @property {Array<String>} userResources=[]
 * @property {MusicStaffV3Parameters} staff
 * @property {MusicClefV3Parameters} clef
 * @property {Number} scratchOutDetectionSensitivity=1
 */

/**
 * Analyzer v3 parameters
 * @typedef {Object} AnalyzerV3Parameters
 * @property {TextV3Parameters} textParameter
 * @property {Number} coordinateResolution=undefined
 */

/**
 * Parameters to be used for v3 recognition
 * @typedef {Object} ApiV3RecognitionParameters
 * @property {MathV3Parameters} mathParameter Parameters of the math recognition if in use.
 * @property {TextV3Parameters} textParameter Parameters of the text recognition if in use.
 * @property {ShapeV3Parameters} shapeParameter Parameters of the shape recognition if in use.
 * @property {MusicV3Parameters} musicParameter Parameters of the music recognition if in use.
 * @property {AnalyzerV3Parameters} analyzerParameter Parameters of the analyzer recognition if in use.
 */

/**
 * Export v4 parameters
 * @typedef {Object} ExportV4Parameters
 * @property {Number} image-resolution=300
 * @property {JiixExportV4Parameters} jiix
 */

/**
 * jiix export v4 parameters
 * @typedef {Object} JiixExportV4Parameters
 * @property {Boolean} bounding-box=false
 * @property {Boolean} strokes=false
 */

/**
 * Debug renderer v4 parameters
 * @typedef {Object} DebugRendererV4Parameters
 * @property {Boolean} draw-text-boxes=false Draw the text bounding boxes
 * @property {Boolean} draw-image-boxes=false Draw the images bounding boxes
 */

/**
 * Renderer v4 parameters
 * @typedef {Object} RendererV4Parameters
 * @property {DebugRendererV4Parameters} debug
 */

/**
 * Math solver v4 parameters
 * @typedef {Object} MathSolverV4Parameters
 * @property {Boolean} enable=true Enable/disable embedded solver
 * @property {Number} fractional-part-digits=3 Number of digits to be used on fraction solving
 * @property {String} decimal-separator=. Decimal separator to be used (e.g. "." or ",")
 * @property {String} rounding-mode=half_up or truncate Rounding mode for approximations
 * @property {String} angle-unit=deg Unit to be used for angles
 */

/**
 * Math v4 parameters
 * @typedef {Object} MathV4Parameters
 * @property {Array<String>} mimeTypes=['application/x-latex','application/mathml+xml'] Exports mimeTypes
 * @property {Array<String>} fonts=['STIXGeneral:n4,i4,n7,i7','STIXSizeThreeSym:n4,n7'] Fonts to be used for conversion (https://github.com/typekit/fvd)
 * @property {MathSolverV4Parameters} solver Settings of the solver
 */

/**
 * Text margin v4 parameters
 * @typedef {Object} TextMarginV4Parameters
 * @property {Number} top=10 Margin from the top of the part to the top of the text bounding box (will be used for reflow operations)
 * @property {Number} left=15 Margin from the left of the part to the left of the text bounding box (will be used for reflow operations)
 * @property {Number} right=15 Margin from the right of the part to the right of the text bounding box (will be used for reflow operations)
 */

/**
 * Text v4 parameters
 * @typedef {Object} TextV4Parameters
 * @property {Array<String>} mimeTypes=['text/plain'] Exports mimeTypes
 * @property {Array<String>} fonts=['OpenSans'] Fonts to be used for conversion (https://github.com/typekit/fvd)
 * @property {TextMarginV4Parameters} margin Margin of the text bounding box (will be used for reflow operations)
 */

/**
 * Diagram v4 parameters
 * @typedef {Object} DiagramV4Parameters
 * @property {Array<String>} mimeTypes=[] Exports mimeTypes
 */

/**
 * Parameters to be used for v4 recognition
 * @typedef {Object} ApiV4RecognitionParameters
 * @property {String} lang=en_US Language to be used
 * @property {ExportV4Parameters} export Generic export parameters
 * @property {RendererV4Parameters} renderer iink renderer parameters
 * @property {MathV4Parameters} math Parameters of the math recognition if in use.
 * @property {TextV4Parameters} text Parameters of the text recognition if in use.
 * @property {DiagramV4Parameters} diagram Parameters of the diagram recognition if in use.
 */

/**
 * Parameters to be used for recognition
 * @typedef {Object} RecognitionParameters
 * @property {String} type=TEXT Recognition type (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol=WEBSOCKET REST or WEBSOCKET to choose the API to use.
 * @property {String} apiVersion=V4 Version of the api to use.
 * @property {ServerParameters} server Server configuration
 * @property {ApiV3RecognitionParameters} v3 Recognition parameters for v3 API
 * @property {ApiV4RecognitionParameters} v4 Recognition parameters for v4 API
 */

/**
 * Triggers to be used for recognition
 * @typedef {Object} TriggerSettings
 * @property {String} exportContent=POINTER_UP Trigger for export action
 * @property {String} addStrokes=POINTER_UP Trigger for addStrokes action
 */

/**
 * {@link Editor} configuration
 * @typedef {Object} Configuration
 * @property {Object|Boolean} listenerOptions={capture:true,passive:true} Options object that specifies characteristics about the event listener. (@see addEventListener.options for detail)
 * @property {Number} undoRedoMaxStackSize=20 Max number of items kept in the undo/redo stack
 * @property {Number} xyFloatPrecision=0 Precision of x and y from 0 to 10 (integer). More the value is high more precise will be the point capture but object in memory and send to the server will be heavier.
 * @property {Number} timestampFloatPrecision=0 Precision of the timestamp
 * @property {Number} triggerDelay=2000 Delay in millisecond to wait before doing an action if in QUIET_PERIOD. If an other action is perform during the quiet period, timer is reset.
 * @property {Number} processDelay=2000 Quiet period duration in millisecond while editor wait for another event before triggering events
 * @property {Number} resizeTriggerDelay=200 Delay in millisecond to wait before applying a resize action. If a other resize order is perform during the quiet period, resizeTimer is clear. Prevent resize storms.
 * @property {TriggerSettings} triggers Editor actions trigger
 * @property {RenderingParameters} renderingParams Rendering parameters.
 * @property {RecognitionParameters} recognitionParams Recognition parameters.
 */

/**
 * Default configuration
 * @type {Configuration}
 */
const defaultConfiguration = {
  // @see generated documentation on top
  listenerOptions: {
    capture: false,
    passive: true
  },
  undoRedoMaxStackSize: 20,
  xyFloatPrecision: 0,
  timestampFloatPrecision: 0,
  triggerDelay: 2000,
  processDelay: 0,
  resizeTriggerDelay: 200,
  // Configure when the action is triggered.
  // POINTER_UP : Action is triggered on every PenUP. This is the recommended mode for CDK V3 WebSocket recognitions.
  // QUIET_PERIOD : Action is triggered after a quiet period in milli-seconds on every pointer up. I value is set to 2000 for example the recognition will be fired  when user stop writing 2 seconds. This is the recommended mode for all REST recognitions.
  triggers: {
    exportContent: 'POINTER_UP',
    addStrokes: 'POINTER_UP'
  },
  renderingParams: {
    stroker: 'quadratic',
    minHeight: 100,
    minWidth: 100
  },
  recognitionParams: {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V4',
    server: {
      scheme: 'https',
      host: 'cloud.myscript.com',
      applicationKey: undefined,
      hmacKey: undefined,
      websocket: {
        pingEnabled: true,
        pingDelay: 30000,
        maxPingLostCount: 10,
        autoReconnect: true,
        maxRetryCount: 2,
        fileChunkSize: 300000
      }
    },
    v3: {
      mathParameter: {
        resultTypes: ['LATEX', 'MATHML'],
        columnarOperation: false,
        userResources: [],
        scratchOutDetectionSensitivity: 1,
      },
      textParameter: {
        language: 'en_US',
        textInputMode: 'CURSIVE',
        resultDetail: 'TEXT',
        contentTypes: [],
        subsetKnowledges: [],
        userLkWords: [],
        userResources: [],
        textProperties: {
          textCandidateListSize: 1,
          wordCandidateListSize: undefined,
          wordPredictionListSize: 0,
          wordCompletionListSize: 0,
          characterCandidateListSize: undefined,
          enableOutOfLexicon: false,
          discardCaseVariations: false,
          discardAccentuationVariations: false,
          glyphDistortion: undefined,
          enableTagger: false,
          spellingDistortion: undefined
        }
      },
      shapeParameter: {
        userResources: undefined,
        rejectDetectionSensitivity: 1,
        doBeautification: true
      },
      musicParameter: {
        divisions: 480,
        resultTypes: ['MUSICXML', 'SCORETREE'],
        userResources: [],
        staff: {
          top: 100,
          count: 5,
          gap: 20
        },
        clef: {
          symbol: 'G',
          octave: 0,
          line: 2
        },
        scratchOutDetectionSensitivity: 1
      },
      analyzerParameter: {
        textParameter: {
          textProperties: {},
          language: 'en_US',
          textInputMode: 'CURSIVE'
        },
        coordinateResolution: undefined
      }
    },
    v4: {
      lang: 'en_US',
      export: {
        'image-resolution': 300,
        jiix: {
          'bounding-box': false,
          strokes: false
        }
      },
      renderer: {
        debug: {
          'draw-text-boxes': false,
          'draw-image-boxes': false
        }
      },
      math: {
        mimeTypes: ['application/x-latex', 'application/mathml+xml'],
        fonts: ['STIXGeneral:n4,i4,n7,i7', 'STIXSizeThreeSym:n4,n7'], // https://github.com/typekit/fvd
        solver: {
          enable: true,
          'fractional-part-digits': 3,
          'decimal-separator': '.',
          'rounding-mode': 'half up',
          'angle-unit': 'deg'
        }
      },
      text: {
        smartGuide: true,
        smartGuideFadeOut: {
          enabled: true,
          duration: 10000
        },
        mimeTypes: ['text/plain', 'application/vnd.myscript.jiix'],
        fonts: ['Open Sans'], // https://github.com/typekit/fvd
        margin: {
          top: 20,
          left: 10,
          right: 10
        }
      },
      diagram: {
        mimeTypes: [],
      },
      nebo: {
        mimeTypes: [],
      }
    }
  }
};

/**
 * Generate parameters
 * @param {Configuration} configuration Configuration to be used
 * @return {Configuration} Overridden configuration
 */
export function overrideDefaultConfiguration(configuration) {
  const currentConfiguration = assign({}, defaultConfiguration, configuration === undefined ? {} : configuration);
  logger.debug('Override default configuration', currentConfiguration);
  return currentConfiguration;
}

export default defaultConfiguration;
