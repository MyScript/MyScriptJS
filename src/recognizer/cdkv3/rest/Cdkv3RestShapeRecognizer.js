'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');


  function Cdkv3RestShapeRecognizer(){
    this.type = "Cdkv3RestShapeRecognizer";
  }

  Cdkv3RestShapeRecognizer.prototype.getAvailableRecognitionSlots = function(){
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

    var data  = {
      "applicationKey": paperOptions.recognitonParams.server.applicationKey,
     // "instanceId": null,
    };


    var textInput = {
      textParameter: null,
          inputUnits: [
        {
          textInputType: "MULTI_LINE_TEXT",
          components: [ /* Strokes */ ]
        }
      ]
    };

    //We recopy the text parameters
    textInput.textParameter = paperOptions.recognitonParams.textParameter;

    // As Rest Text recogntion is non incremental wa add the already recognized strokes
    model.recognizedStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      textInput.inputUnits[0].components.push(stroke.toJSON())
    });

    //We add the pending strokes to the model
    model.pendingStrokes.forEach(function(stroke){
      //FIXME Should it be better to avoid this toJSON
      textInput.inputUnits[0].components.push(stroke.toJSON())
    });

    data.textInput = JSON.stringify(textInput);
    data.hmac = scope.CryptoHelper.computeHmac(data.textInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);

    return data

  }


  /**
   * Do the recogntion
   * @param paperOptionsParam
   * @param modelParam
   * @returns {Promise that return an updated model as a result}
   */
  Cdkv3RestShapeRecognizer.prototype.recognize = function (paperOptionsParam, modelParam) {
    var paperOptions = paperOptionsParam;
    var model = modelParam;


    var data = _buildInput(paperOptions, modelParam);

    //FIXME manage http mode
    return scope.NetworkInterface.post('https://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
        function logResponseOnSucess(response) {
          logger.debug("Cdkv3RestTextRecognizer success", response);
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestTextRecognizer update model", response);
          model.recognizedStrokes.concat(model.pendingStrokes);
          model.result = response;
          return model;
        }
    );
  };

  // Export
  scope.Cdkv3RestShapeRecognizer = Cdkv3RestShapeRecognizer;
})(MyScript, logging);
