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

// FIXME Maybe we can just keep the recognizer
const AVAILABLE_MODES = {
  V3_REST_TEXT: {
    recognizer: Cdkv3RestTextRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'QUIET_PERIOD',
    }
  },
  V3_REST_MATH: {
    recognizer: Cdkv3RestMathRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'QUIET_PERIOD',
    }
  },
  V3_REST_ANALYZER: {
    recognizer: Cdkv3RestAnalyzerRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'QUIET_PERIOD',
    }
  },
  V3_REST_SHAPE: {
    recognizer: Cdkv3RestShapeRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'QUIET_PERIOD',
    }
  },
  V3_REST_MUSIC: {
    recognizer: Cdkv3RestMusicRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'QUIET_PERIOD',
    }
  },
  V3_WEBSOCKET_TEXT: {
    recognizer: Cdkv3WSTextRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'PEN_UP',
    }
  },
  V3_WEBSOCKET_MATH: {
    recognizer: Cdkv3WSMathRecognizer,
    optimizedParameters: {
      triggerRecognitionOn: 'PEN_UP',
    }
  }
};

const myScriptJSDefaultBehaviors = {
  grabber: Grabber,
  renderer: Renderer,
  recognizer: Cdkv3WSTextRecognizer,
  optimizedParameters: {
    triggerRecognitionOn: 'PEN_UP',
  },
  stroker: Stroker,
  callbacks: [defaultEventCallback]
};

export function createDefaultBehavioursFromPaperOptions(paperOptions) {
  const requiredBehaviour = AVAILABLE_MODES[paperOptions.recognitionParams.apiVersion + '_' + paperOptions.recognitionParams.protocol + '_' + paperOptions.recognitionParams.type];
  const ret = Object.assign({}, myScriptJSDefaultBehaviors, requiredBehaviour);
  // TODO Check values
  return ret;
}
