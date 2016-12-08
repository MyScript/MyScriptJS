import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import * as Grabber from '../grabber/PepjsGrabber';
import * as Renderer from '../renderer/canvas/DefaultCanvasRenderer';
import * as Stroker from '../renderer/stroker/quadratic/QuadraticCanvasStroker';
import * as Cdkv3RestTextRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestTextRecognizer';
import * as Cdkv3RestMathRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMathRecognizer';
import * as Cdkv3RestAnalyzerRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestAnalyzerRecognizer';
import * as Cdkv3RestShapeRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestShapeRecognizer';
import * as Cdkv3RestMusicRecognizer from '../recognizer/cdkv3/rest/Cdkv3RestMusicRecognizer';
import * as Cdkv3WSMathRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSMathRecognizer';
import * as Cdkv3WSTextRecognizer from '../recognizer/cdkv3/websocket/Cdkv3WSTextRecognizer';
import defaultEventCallback from '../callback/DefaultEventCallback';

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

const defaultBehaviors = {
  grabber: Grabber,
  renderer: Renderer,
  recognizer: Cdkv3WSTextRecognizer,
  optimizedParameters: {
    triggerRecognitionOn: MyScriptJSConstants.RecognitionTrigger.PEN_UP,
  },
  stroker: Stroker,
  callbacks: [defaultEventCallback]
};

export function createDefaultBehaviorsFromPaperOptions(paperOptions) {
  const requiredBehaviour = AVAILABLE_MODES[paperOptions.recognitionParams.apiVersion + '_' + paperOptions.recognitionParams.protocol + '_' + paperOptions.recognitionParams.type];
  const ret = Object.assign({}, defaultBehaviors, requiredBehaviour);
  // TODO Check values
  return ret;
}
