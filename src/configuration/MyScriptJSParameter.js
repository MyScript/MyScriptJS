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
import eventCallback from '../callback/EventCallback';


// FIXME Maybe we can just keep the recognizer
export const AVAILABLES_MODES = {
  CDK_V3_REST_TEXT: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3RestTextRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_REST_MATH: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3RestMathRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_REST_ANALYZER: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3RestAnalyzerRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_REST_SHAPE: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3RestShapeRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_REST_MUSIC: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3RestMusicRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_WS_TEXT: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3WSTextRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  },
  CDK_V3_WS_MATH: {
    grabber: Grabber,
    renderer: Renderer,
    recognizer: Cdkv3WSMathRecognizer,
    stroker: Stroker,
    callbacks: [eventCallback]
  }
};

const myScriptJSDefaultBehaviors = {
  grabber: Grabber,
  renderer: Renderer,
  recognizer: Cdkv3RestTextRecognizer,
  stroker: Stroker,
  callbacks: [eventCallback]
};

const myScriptJSDefaultParameters = {
  // All sessions params
  sessionParams: {},

  renderingParams: {
    renderingType: 'canvas', // FIXME Use this parameter
    strokeStyle: {
      color: '#000F55',
      width: 3
    }
  },
  recognitionParams: {
    // server: {
    //   scheme: 'https',
    //   host: 'webdemoapi.myscript.com',
    //   protocol: 'REST',
    //   applicationKey: '22eda92c-10af-40d8-abea-fd4093c17d81',
    //   hmacKey: 'a1fa759f-b3ce-4091-9fd4-d34bb870c601'
    // },
    server: {
      scheme: 'https',
      host: 'cloud-internal-stable.visionobjects.com',
      protocol: 'REST',
      applicationKey: '64e1afbf-f3a7-4d04-bce1-24b05ee0b2d6',
      hmacKey: '88d81b71-13cd-41a0-9206-ba367c21900f'
    },
    // Nb of time a recognition should be retry before failing
    nbRetry: 2, // Integer from 0 to 10. More the value is hight more precise will be the point capture but object in memory and send to the server will be more light.
    // Precision of x and y
    xyFloatPrecision: 0,
    timestampFloatPrecision: 0,
    mathParameter: {
      resultTypes: [],
      columnarOperation: false,
      userResources: [],
      scratchOutDetectionSensitivity: 1,
    },
    textParameter: {
      language: 'en_US',
      textInputMode: 'CURSIVE',
      // "contentTypes": null,
      // "userResources": null,
      // "subsetKnowledges": null,
      // "userLkWords": null,
      resultDetail: 'TEXT',
      // "textCandidateListSize": null,
      // "wordCandidateListSize": null,
      // "characterCandidateListSize": null,
      textProperties: {
        //  "enableTagger": true
        textCandidateListSize: 3
      }
    },
    shapeParameter: {
      rejectDetectionSensitivity: 1,
      doBeautification: true
      // ,userResources: ""
    },
    musicParameter: {
      divisions: 480,
      staff: {
        top: 100,
        count: 5,
        gap: 20
      },
      clef: {
        symbol: 'G',
        octave: 0,
        line: 2
      }
    }
  }
};

export function mergeParameters(existingParameters, newParameters) {
  return Object.assign(existingParameters, newParameters);
}

export function enrichParametersWithDefault(myscriptJsParameter) {
  const emptyObjectIfUndefined = myscriptJsParameter === undefined ? {} : myscriptJsParameter;
  return Object.assign(emptyObjectIfUndefined, myScriptJSDefaultParameters);
}

export function mergeBehaviors(existingBehaviors, newBehaviors) {
  return Object.assign(existingBehaviors, newBehaviors);
}

export function enrichBehaviorsWithDefault(myscriptJsBehavior) {
  const emptyObjectIfUndefined = myscriptJsBehavior === undefined ? {} : myscriptJsBehavior;
  return Object.assign(emptyObjectIfUndefined, myScriptJSDefaultBehaviors);
}
