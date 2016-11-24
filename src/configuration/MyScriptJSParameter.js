import MyScriptJSConstants from '../configuration/MyScriptJSConstants';

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
    // Configure when the recognition is trigger.
    // PEN_UP : Recognition is triggered on every PenUP. This is the recommended mode for CDK V3 WebSocket recognitions.
    // QUIET_PERIOD : Recognition is triggered after a quiet period in milli-seconds on every pen up. I value is set to 2000 for example the recognition will be fired  when user stop writing 2 seconds. This is the recommended mode for all REST recognitions.
    triggerRecognitionOn: 'PEN_UP',
    triggerRecognitionQuietPeriod: 2000,
    // Recognition type TEXT, MATH, SHAPE, MUSIC, ANALYZER
    type: MyScriptJSConstants.RecognitionType.TEXT,
    // REST or WEBSOCKET to choose the API to use.
    protocol: MyScriptJSConstants.Protocol.WEBSOCKET,
    apiVersion: 'V3',
    server: {
      scheme: 'https',
      host: 'cloud-internal-stable.visionobjects.com',
      applicationKey: '64e1afbf-f3a7-4d04-bce1-24b05ee0b2d6',
      hmacKey: '88d81b71-13cd-41a0-9206-ba367c21900f'
    },
    // TODO Use this parameter : Nb of time a recognition should be retry before failing
    nbRetry: 2,
    // Integer from 0 to 10. More the value is high more precise will be the point capture but object in memory and send to the server will be heavier.
    // Precision of x and y
    xyFloatPrecision: 0,
    timestampFloatPrecision: 0,
    // Parameters of the math recognition if in use.
    mathParameter: {
      resultTypes: [],
      columnarOperation: false,
      userResources: [],
      scratchOutDetectionSensitivity: 1,
    },
    // Parameters of the text recognition if in use.
    textParameter: {
      language: 'en_US',
      textInputMode: MyScriptJSConstants.InputMode.CURSIVE,
      // "contentTypes": null,
      // "userResources": null,
      // "subsetKnowledges": null,
      // "userLkWords": null,
      resultDetail: MyScriptJSConstants.ResultDetail.TEXT,
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
    },
    analyzerParameter: {
      textParameter: {
        textProperties: {},
        language: 'en_US',
        textInputMode: MyScriptJSConstants.InputMode.CURSIVE
      }
    }
  }
};

export function enrichParametersWithDefault(myscriptJsParameter) {
  const emptyObjectIfUndefined = myscriptJsParameter === undefined ? {} : myscriptJsParameter;
  return Object.assign({}, myScriptJSDefaultParameters, emptyObjectIfUndefined);
}
