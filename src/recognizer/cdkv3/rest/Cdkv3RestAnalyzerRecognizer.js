'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');


  function Cdkv3RestAnalyzerRecognizer(){
    this.type = "Cdkv3RestAnalyzerRecognizer";
  }

  Cdkv3RestAnalyzerRecognizer.prototype.getAvailableRecognitionSlots = function(){
    var availableRecognitionTypes = {};
    availableRecognitionTypes[scope.RecognitionSlot.ON_PEN_UP] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_DEMAND] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_TIME_OUT] = true;
    return availableRecognitionTypes;
  }

  /**
   * Internal fonction to build the payload to ask for a recogntion.
   * @param paperOptions
   * @param model
   * @returns {{applicationKey: string}}
   * @private
   */
  function _buildInput(paperOptions, model, analyzerInstanceId) {

    var data  = {
      "applicationKey": paperOptions.recognitonParams.server.applicationKey,
      instanceId: analyzerInstanceId
     // "instanceId": null,
    };


    var analyzerInput = {
      parameter: {
        //FIXME Manage the various parameters
        textParameter: {
          textProperties: {},
          language: "en_US",
          textInputMode: "CURSIVE"
        }
      },
      components: []
    };


    // As Rest Text recogntion is non incremental wa add the already recognized strokes
    model.recognizedStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      analyzerInput.components.push(stroke.toJSON())
    });

    //We add the pending strokes to the model
    model.pendingStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      analyzerInput.components.push(stroke.toJSON())
    });

    data.analyzerInput = JSON.stringify(analyzerInput);
    if (paperOptions.recognitonParams.server.hmacKey) {
      data.hmac = scope.CryptoHelper.computeHmac(data.analyzerInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);
    }
    return data

  }


  /**
   * Do the recogntion
   * @param paperOptionsParam
   * @param modelParam
   * @returns {Promise that return an updated model as a result}
   */
  Cdkv3RestAnalyzerRecognizer.prototype.recognize = function (paperOptionsParam, modelParam) {
    var paperOptions = paperOptionsParam;
    var model = modelParam;
    var currentRestAnalyzerRecognizer = this;

    var data = _buildInput(paperOptions, modelParam, currentRestAnalyzerRecognizer.analyzerInstanceId);

    //FIXME manage http mode
    return scope.NetworkInterface.post('https://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
        function logResponseOnSucess(response) {
          logger.debug("Cdkv3RestAnalyzerRecognizer success", response);
          return response;
        }
    ).then(
        function memorizeInstanceId(response) {
          currentRestAnalyzerRecognizer.analyzerInstanceId = response.instanceId;
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestAnalyzerRecognizer update model", response);
          model.recognizedStrokes.concat(model.pendingStrokes);
          model.result = response;
          return model;
        }
    );
  };

  // Export
  scope.Cdkv3RestAnalyzerRecognizer = Cdkv3RestAnalyzerRecognizer;
})(MyScript, logging);
