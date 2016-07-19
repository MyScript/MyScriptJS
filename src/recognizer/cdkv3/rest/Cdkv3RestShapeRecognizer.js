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
  function _buildInput(paperOptions, model, shapeInstanceId) {

    //Building the input with the suitable parameters
    var params = paperOptions.recognitonParams.shapeParameter;
    var input = {
      rejectDetectionSensitivity: params.rejectDetectionSensitivity,
      doBeautification: params.doBeautification,
      userResources: params.userResources,
      components : []
    };


    //We add the pending strokes to the model
    model.pendingStrokes.forEach(function(stroke){
      input.components.push(stroke.toJSON())
    });

    var data = {
      shapeInput: JSON.stringify(input),
      applicationKey: paperOptions.recognitonParams.server.applicationKey,
      instanceId: shapeInstanceId
    };

    if (paperOptions.recognitonParams.server.hmacKey) {
      data.hmac = scope.CryptoHelper.computeHmac(data.shapeInput, paperOptions.recognitonParams.server.applicationKey, paperOptions.recognitonParams.server.hmacKey);
    }

    return data;

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
    var currentRestShapeRecognizer = this;

    var data = _buildInput(paperOptions, modelParam, currentRestShapeRecognizer.shapeInstanceId);

    //FIXME manage http mode
    return scope.NetworkInterface.post('http://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
        function logResponseOnSucess(response) {
          logger.debug("Cdkv3RestShapeRecognizer success", response);
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestShapeRecognizer update model", response);
          currentRestShapeRecognizer.shapeInstanceId = response.instanceId; //TODO Recopy the shapeInstanceId
          model.recognizedStrokes.concat(model.pendingStrokes);
          model.result = response;
          return model;
        }
    );
  };

  // Export
  scope.Cdkv3RestShapeRecognizer = Cdkv3RestShapeRecognizer;
})(MyScript, logging);
