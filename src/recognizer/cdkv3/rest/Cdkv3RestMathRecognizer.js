'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');


  function Cdkv3RestMathRecognizer(){
    this.type = "Cdkv3RestMathRecognizer";
  }

  Cdkv3RestMathRecognizer.prototype.getAvailableRecognitionSlots = function(){
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
  function _buildInput(paperOptions, model) {

    var params = paperOptions.recognitonParams.mathParameter;


    var input = {
      resultTypes: params.resultTypes,
      columnarOperation: params.isColumnar,
      userResources: params.userResources,
      scratchOutDetectionSensitivity: params.scratchOutDetectionSensitivity,
      components: [ /* Strokes */ ]
    };


    var data  = {
      "applicationKey": paperOptions.recognitonParams.server.applicationKey,
     // "instanceId": null,
    };


    // As Rest Math recognition is non incremental wa add the already recognized strokes
    model.recognizedStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      input.components.push(stroke.toJSON())
    });

    //We add the pending strokes to the model
    model.pendingStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      input.components.push(stroke.toJSON())
    });

    data.mathInput = JSON.stringify(input);
    
    if (paperOptions.recognitonParams.server.hmacKey) {
      data.hmac = scope.CryptoHelper.computeHmac(data.mathInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);
    }
    return data

  }


  /**
   * Do the recogntion
   * @param paperOptionsParam
   * @param modelParam
   * @returns {Promise that return an updated model as a result}
   */
  Cdkv3RestMathRecognizer.prototype.recognize = function (paperOptionsParam, modelParam) {
    var paperOptions = paperOptionsParam;
    var model = modelParam;


    var data = _buildInput(paperOptions, modelParam);

    //FIXME manage http mode
    return scope.NetworkInterface.post('https://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
        function logResponseOnSucess(response) {
          logger.debug("Cdkv3RestMathRecognizer success", response);
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestMathRecognizer update model", response);
          model.recognizedStrokes.concat(model.pendingStrokes);
          model.result = response;
          return model;
        }
    );
  };

  // Export
  scope.Cdkv3RestMathRecognizer = Cdkv3RestMathRecognizer;
})(MyScript, logging);
