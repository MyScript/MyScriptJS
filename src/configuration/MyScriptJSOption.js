MyScript.defaultOption = {
  recognitonParams: {

    server: {
      host: 'cloud.myscript.com',
      protocol: 'REST',
      applicationKey: '22eda92c-10af-40d8-abea-fd4093c17d81',
      hmacKey: 'a1fa759f-b3ce-4091-9fd4-d34bb870c601'
    },
    nbRetry : 2,
    textParameter: {
      language: "en_US",
      textInputMode: "CURSIVE",
      //"contentTypes": null,
      //"userResources": null,
      //"subsetKnowledges": null,
      //"userLkWords": null,
      resultDetail: "TEXT",
      //"textCandidateListSize": null,
      //"wordCandidateListSize": null,
      //"characterCandidateListSize": null,
      textProperties: {
      //  "enableTagger": true
        textCandidateListSize : 3
      }
    }

  }


}