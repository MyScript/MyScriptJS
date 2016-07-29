'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var StrokeComponent = scope.StrokeComponent;

  function Cdkv3RestMathRecognizer(){
    this.type = "Cdkv3RestMathRecognizer";
  }

  Cdkv3RestMathRecognizer.prototype.getAvailableRecognitionSlots = scope.Cdkv3CommonMathRecognizer.getAvailableRecognitionSlots;

  /**
   * Internal fonction to build the payload to ask for a recogntion.
   * @param paperOptions
   * @param model
   * @returns {{applicationKey: string}}
   * @private
   */
  function _buildInput(paperOptions, model, instanceId) {

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
      "instanceId": instanceId
    };

    // As Rest Math recognition is non incremental wa add the already recognized strokes
    model.recognizedStrokes.forEach(function(stroke){
      input.components.push(StrokeComponent.toJSON(stroke))
    });

    //We add the pending strokes to the model
    scope.InkModel.extractNonRecognizedStrokes(model).forEach(function(stroke){
      input.components.push(StrokeComponent.toJSON(stroke))
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
    var currentRestMathRecognizer = this;

    var data = _buildInput(paperOptions, modelParam, currentRestMathRecognizer.instanceId);

    //FIXME manage http mode
    return scope.NetworkInterface.post('https://' + paperOptions.recognitonParams.server.host + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
        function logResponseOnSucess(response) {
          logger.debug("Cdkv3RestMathRecognizer success", response);
          return response;
        }
    ).then(
        function memorizeInstanceId(response) {
          currentRestMathRecognizer.instanceId = response.instanceId;
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestMathRecognizer update model", response);
          model.rawResult = response;
          return model;
        }
    ).then(
        //Generate the rendering result
      scope.Cdkv3CommonMathRecognizer.generateRenderingResult
    );
  };

  // Export
  scope.Cdkv3RestMathRecognizer = Cdkv3RestMathRecognizer;
})(MyScript, logging);
