const myscriptJsDefaultOption = {
  // All sessions params
  sessionParams: {},

  renderingParams: {
    renderingType: 'canvas'

  },
  recognitonParams: {

    //server: {
    //  host: 'cloud.myscript.com',
    //  protocol: 'REST',
    //  applicationKey: '22eda92c-10af-40d8-abea-fd4093c17d81',
    //  hmacKey: 'a1fa759f-b3ce-4091-9fd4-d34bb870c601'
    //},
    server: {
      host: 'cloud-internal-stable.visionobjects.com',
      protocol: 'REST',
      applicationKey: '64e1afbf-f3a7-4d04-bce1-24b05ee0b2d6',
      hmacKey: '88d81b71-13cd-41a0-9206-ba367c21900f'
    },
    //Nb of time a recogntion should be retry before failing
    nbRetry: 2, // FIXME Use this parameter
    //Precision of x and y
    floatPrecision: 0, //FIXME Use this parameter
    mathParameter: {
      resultTypes: [],
      columnarOperation: false,
      userResources: [],
      scratchOutDetectionSensitivity: 1,
    },
    textParameter: {
      language: 'en_US',
      textInputMode: 'CURSIVE',
      //"contentTypes": null,
      //"userResources": null,
      //"subsetKnowledges": null,
      //"userLkWords": null,
      resultDetail: 'TEXT',
      //"textCandidateListSize": null,
      //"wordCandidateListSize": null,
      //"characterCandidateListSize": null,
      textProperties: {
        //  "enableTagger": true
        textCandidateListSize: 3
      }
    },
    shapeParameter: {
      rejectDetectionSensitivity: 1,
      doBeautification: true
      //,userResources: ""
    }
  }
};
export default myscriptJsDefaultOption;