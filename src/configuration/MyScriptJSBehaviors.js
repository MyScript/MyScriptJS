import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import * as Grabber from '../grabber/PepjsGrabber';
import * as CanvasRenderer from '../renderer/canvas/CanvasRenderer';
import * as QuadraticStroker from '../renderer/canvas/stroker/QuadraticCanvasStroker';
import * as Cdkv3RestTextRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestTextRecognizer';
import * as Cdkv3RestMathRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMathRecognizer';
import * as Cdkv3RestAnalyzerRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestAnalyzerRecognizer';
import * as Cdkv3RestShapeRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestShapeRecognizer';
import * as Cdkv3RestMusicRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMusicRecognizer';
import * as Cdkv3WSMathRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSMathRecognizer';
import * as Cdkv3WSTextRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSTextRecognizer';
import eventCallback from '../callback/EventCallback';

/**
 * @typedef {Object} Behaviors
 * @property {Grabber} grabber
 * @property {Renderer} renderer
 * @property {Recognizer} recognizer
 * @property {Stroker} stroker
 * @property {Array} callbacks
 * @property {{triggerRecognitionOn: String}} optimizedParameters
 */

const AVAILABLE_MODES = {
  V3_REST_TEXT: {
    recognizer: Cdkv3RestTextRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    }
  },
  V3_REST_MATH: {
    recognizer: Cdkv3RestMathRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    }
  },
  V3_REST_ANALYZER: {
    recognizer: Cdkv3RestAnalyzerRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    }
  },
  V3_REST_SHAPE: {
    recognizer: Cdkv3RestShapeRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    }
  },
  V3_REST_MUSIC: {
    recognizer: Cdkv3RestMusicRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    }
  },
  V3_WEBSOCKET_TEXT: {
    recognizer: Cdkv3WSTextRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.PEN_UP,
    }
  },
  V3_WEBSOCKET_MATH: {
    recognizer: Cdkv3WSMathRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.PEN_UP,
    }
  }
};

/**
 * Default behaviors
 * @type {Behaviors}
 */
const defaultBehaviors = {
  grabber: Grabber,
  renderer: CanvasRenderer,
  recognizer: Cdkv3WSTextRecognizer,
  optimizedParameters: {
    triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.PEN_UP,
  },
  stroker: QuadraticStroker,
  callbacks: [eventCallback]
};

/**
 * Get the behavior to be used with the current configuration
 * @param {Parameters} paperOptions Current configuration
 * @return {Behaviors} Behaviors to be used
 */
export function getBehaviorsFromPaperOptions(paperOptions) {
  const requiredBehaviour = AVAILABLE_MODES[paperOptions.recognitionParams.apiVersion + '_' + paperOptions.recognitionParams.protocol + '_' + paperOptions.recognitionParams.type];
  const ret = Object.assign({}, defaultBehaviors, requiredBehaviour);
  // TODO Check values
  return ret;
}
