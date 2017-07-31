import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * WebSocket configuration
 * @typedef {Object} WebSocketConf
 * @property {Boolean} pingEnabled
 * @property {Number} pingDelay
 * @property {Number} maxPingLostCount
 * @property {Boolean} autoReconnect
 * @property {Number} maxRetryCount
 */

/**
 * Server configuration
 * @typedef {Object} ServerParameters
 * @property {String} scheme Server URL scheme (http/https)
 * @property {String} host Server host (default cloud.myscript.com)
 * @property {String} applicationKey MyScript Cloud applicationKey
 * @property {String} hmacKey MyScript Cloud hmacKey
 * @property {Object} websocket WebSocket configuration.
 */

/**
 * Parameters to be used for rendering
 * @typedef {Object} RenderingParameters
 * @property {String} stroker Stroker name to used
 */

/**
 * Parameters to be used for v3 recognition
 * @typedef {Object} ApiV3RecognitionParameters
 * @property {Object} mathParameter Parameters of the math recognition if in use.
 * @property {Object} textParameter Parameters of the text recognition if in use.
 * @property {Object} shapeParameter Parameters of the shape recognition if in use.
 * @property {Object} musicParameter Parameters of the music recognition if in use.
 * @property {Object} analyzerParameter Parameters of the analyzer recognition if in use.
 */

/**
 * Parameters to be used for v4 recognition
 * @typedef {Object} ApiV4RecognitionParameters
 */

/**
 * Parameters to be used for recognition
 * @typedef {Object} RecognitionParameters
 * @property {String} type Recognition type (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol REST or WEBSOCKET to choose the API to use.
 * @property {String} apiVersion Version of the api to use.
 * @property {ServerParameters} server Server configuration
 * @property {ApiV3RecognitionParameters} v3 Parameters of the recognition api v3.
 * @property {ApiV4RecognitionParameters} v4 Parameters of the recognition api v4.
 */

/**
 * Triggers to be used for recognition
 * @typedef {Object} Triggers
 * @property {String} exportContent Trigger for export action
 * @property {String} addStrokes Trigger for addStrokes action
 */

/**
 * {@link Editor} configuration
 * @typedef {Object} Configuration
 * @property {Number} undoRedoMaxStackSize Max number of items kept in the undo/redo stack
 * @property {Number} xyFloatPrecision Precision of x and y from 0 to 10 (integer). More the value is high more precise will be the point capture but object in memory and send to the server will be heavier.
 * @property {Number} timestampFloatPrecision Precision of the timestamp
 * @property {Triggers} triggers Editor actions trigger
 * @property {Number} triggerDelay Delay in millisecond to wait before doing an action if in QUIET_PERIOD. If an other action is perform during the quiet period, timer is reset.
 * @property {Number} processDelay Quiet period duration in millisecond while editor wait for another event before triggering events
 * @property {Number} resizeTriggerDelay Quiet period to wait before triggering resize (in ms).
 * @property {RenderingParameters} renderingParams Rendering parameters.
 * @property {RecognitionParameters} recognitionParams Recognition parameters.
 */

/**
 * Default configuration
 * @type {Configuration}
 */
const defaultConfiguration = {
  // see @typedef documentation on top
  undoRedoMaxStackSize: 20, // Max number of items kept in the undo/redo stack
  xyFloatPrecision: 0, // Precision of x and y from 0 to 10 (integer). More the value is high more precise will be the point capture but object in memory and send to the server will be heavier.
  timestampFloatPrecision: 0, // Precision of the timestamp
  // Configure when the action is triggered.
  // POINTER_UP : Action is triggered on every PenUP. This is the recommended mode for CDK V3 WebSocket recognitions.
  // QUIET_PERIOD : Action is triggered after a quiet period in milli-seconds on every pointer up. I value is set to 2000 for example the recognition will be fired  when user stop writing 2 seconds. This is the recommended mode for all REST recognitions.
  triggers: {
    exportContent: 'POINTER_UP', // Trigger for export action
    addStrokes: 'POINTER_UP' // Trigger for addStrokes action
  },
  // Delay in millisecond to wait before doing an action if in QUIET_PERIOD. If an other action is perform during the quiet period, timer is reset.
  triggerDelay: 2000,
  // Quiet period duration in millisecond while editor wait for another event before triggering events.
  processDelay: 0,
  // Delay in millisecond to wait before applying a resize action. If a other resize order is perform during the quiet period, resizeTimer is clear. Prevent resize storms.
  resizeTriggerDelay: 200,
  // Rendering parameters
  renderingParams: {
    // Type of stroker. Actually only quadratic is implemented.
    stroker: 'quadratic'
  },
  recognitionParams: {
    type: 'TEXT', // Recognition type (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
    protocol: 'WEBSOCKET', // REST or WEBSOCKET to choose the API to use
    apiVersion: 'V3', // Version of the api to use
    server: { // Recognition server settings
      scheme: 'https', // Server URL scheme (http/https)
      host: 'cloud.myscript.com', // Server host (default cloud.myscript.com)
      applicationKey: undefined, // MyScript Cloud applicationKey
      hmacKey: undefined, // MyScript Cloud hmacKey
      websocket: {
        pingEnabled: true, // Enable/disable ping feature.
        pingDelay: 30000, // Delay in millisecond to wait before sending a ping.
        maxPingLostCount: 10,
        // Will try to reconnect when websocket is close or when a timeout is detected. Do not handle the case when user change network on his device.
        autoReconnect: false,
        maxRetryCount: 2 // Number of retries when auto reconnect is enabled
      }
    },
    v3: { // Recognitions parameters for v3 API
      mathParameter: { // for MATH recognition
        resultTypes: ['LATEX', 'MATHML'],
        columnarOperation: false,
        userResources: [],
        scratchOutDetectionSensitivity: 1,
      },
      textParameter: { // for TEXT recognition
        language: 'en_US', // language to be used
        textInputMode: 'CURSIVE',
        resultDetail: 'TEXT',
        contentTypes: [],
        subsetKnowledges: [],
        userLkWords: [],
        userResources: [],
        textProperties: {
          textCandidateListSize: 1,
          // You can't set a wordCandidateListSize > 0 if ResultDetail is not set to WORD or CHARACTER
          wordCandidateListSize: undefined,
          wordPredictionListSize: 0,
          wordCompletionListSize: 0,
          // You can't set a characterCandidateListSize > 0 if ResultDetail is not set to CHARACTER
          characterCandidateListSize: undefined,
          enableOutOfLexicon: false,
          discardCaseVariations: false,
          discardAccentuationVariations: false,
          // glyphdistortion is only valid with ISOLATED mode
          glyphDistortion: undefined,
          enableTagger: false,
          // spellingDistortion is only valid with ISOLATED mode
          spellingDistortion: undefined
        }
      },
      shapeParameter: { // for SHAPE recognition
        userResources: undefined,
        rejectDetectionSensitivity: 1,
        doBeautification: true
      },
      musicParameter: { // for MUSIC recognition
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
      analyzerParameter: { // for ANALYZER recognition
        textParameter: {
          textProperties: {},
          language: 'en_US', // language to be used
          textInputMode: 'CURSIVE'
        },
        coordinateResolution: undefined
      }
    },
    v4: { // Recognitions parameters for v4 API
      lang: 'en_US', // language to be used
      export: {
        'image-resolution': 300
      },
      math: { // for MATH recognition
        mimeTypes: ['application/x-latex', 'application/mathml+xml'], // Exports mimeTypes
        // https://github.com/typekit/fvd
        fonts: ['STIXGeneral:n4,i4,n7,i7', 'STIXSizeThreeSym:n4,n7'], // Fonts to be used for conversion
        solver: { // Settings of the solver
          enable: true, // Enable/disable embedded solver
          'fractional-part-digits': 3, // Number of digits to be used on fraction solving
          'decimal-separator': '.', // Decimal separator to be used (e.g. "." or ",")
          'rounding-mode': 'half up', // Rounding mode for approximations
          'angle-unit': 'deg' // Unit to be used for angles
        }
      },
      text: { // for TEXT recognition
        mimeTypes: ['text/plain'], // Exports mimeTypes
        // https://github.com/typekit/fvd
        fonts: ['Open Sans'] // Fonts to be used for conversion
      },
      diagram: { // for DIAGRAM recognition
        mimeTypes: [],
      },
      nebo: { // for TEXT_DOCUMENT recognition
        mimeTypes: [], // Exports mimeTypes
      },
      renderer: { // Settings for renderer
        debug: {
          'draw-text-boxes': false, // Draw the text bounding boxes
          'draw-image-boxes': false // Draw the images bounding boxes
        }
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

/**
 * Override exports parameters
 * @param {Configuration} configuration Configuration to be used
 * @param {...String} exports Exports to be used
 * @return {Configuration} Overridden configuration
 */
export function overrideExports(configuration, ...exports) {
  const currentConfiguration = assign({}, configuration, {
    recognitionParams: {
      v3: {
        mathParameter: {
          resultTypes: exports
        },
        musicParameter: {
          resultTypes: exports
        }
      },
      v4: {
        math: {
          mimeTypes: exports
        }
      }
    }
  });
  logger.debug('Override exports', currentConfiguration);
  return currentConfiguration;
}

export default defaultConfiguration;
