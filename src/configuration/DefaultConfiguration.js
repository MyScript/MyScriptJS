import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} ServerParameters
 * @property {String} scheme
 * @property {String} host
 * @property {String} applicationKey
 * @property {String} hmacKey
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
 * @property {ServerParameters} server
 * @property {ApiV3RecognitionParameters} v3 Parameters of the recognition api v3.
 * @property {ApiV4RecognitionParameters} v4 Parameters of the recognition api v4.
 */

/**
 * {@link Editor} configuration
 * @typedef {Object} Configuration
 * @property {Number} undoRedoMaxStackSize Number of strokes keep in undo redo stack.
 * @property {Number} xyFloatPrecision Precision of x and y from 0 to 10 (integer). More the value is high more precise will be the point capture but object in memory and send to the server will be heavier.
 * @property {Number} timestampFloatPrecision
 * @property {Number} resizeTriggerDelay Quiet period to wait before triggering resize (in ms).
 * @property {String} recognitionTriggerOn
 * @property {Number} recognitionTriggerDelay
 * @property {Number} recognitionProcessDelay
 * @property {RenderingParameters} renderingParams Rendering parameters.
 * @property {RecognitionParameters} recognitionParams Recognition parameters.
 */

/**
 * Default configuration
 * @type {Configuration}
 */
const defaultConfiguration = {
  // see @typedef documentation on top
  undoRedoMaxStackSize: 20,
  xyFloatPrecision: 0,
  timestampFloatPrecision: 0,
  // Delay in millisecond to wait before applying a resize action. If a other resize order is perform during the quiet period, resizeTimer is clear. Prevent resize storms.
  resizeTriggerDelay: 200,
  // Configure when the recognition is trigger.
  // POINTER_UP : Recognition is triggered on every PenUP. This is the recommended mode for CDK V3 WebSocket recognitions.
  // QUIET_PERIOD : Recognition is triggered after a quiet period in milli-seconds on every pointer up. I value is set to 2000 for example the recognition will be fired  when user stop writing 2 seconds. This is the recommended mode for all REST recognitions.
  recognitionTriggerOn: 'POINTER_UP',
  // Delay in millisecond to wait before applying a resize action. If a other resize order is perform during the quiet period, resizeTimer is clear. Prevent resize storms.
  recognitionTriggerDelay: 2000,
  // When recognition is in POINTER_UP mode, quiet period duration in millisecond while editor wait for another recognition before triggering the display and the call to configured callbacks.
  recognitionProcessDelay: 1000,
  // Rendering parameters
  renderingParams: {
    // Type of stroker. Actually only quadratic is implemented.
    stroker: 'quadratic'
  },
  recognitionParams: {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V3',
    server: {
      scheme: 'https',
      host: 'cloud-internal-stable.visionobjects.com',
      applicationKey: '64e1afbf-f3a7-4d04-bce1-24b05ee0b2d6',
      hmacKey: '88d81b71-13cd-41a0-9206-ba367c21900f',
      websocket: {
        pingPongActivated: false,
        maxPingLostCount: 10,
        pingIntervalMillis: 5000,
        // Will try to reconnect when websocket is close or when a timeout is detected. Do not handle the case when user change network on his device.
        autoReconnect: true,
        maxRetryCount: 2
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
      math: {
        mimeTypes: ['application/x-latex', 'application/mathml+xml'],
        solver: {
          enable: true,
          'fractional-part-digits': 3,
          'decimal-separator': '.',
          'rounding-mode': 'half up',
          'angle-unit': 'deg'
        }
      },
      nebo: {
        mimeTypes: [],
      },
      diagram: {
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
