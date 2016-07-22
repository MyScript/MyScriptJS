'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var StrokeComponent = scope.StrokeComponent;

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
        function generateRenderingResult(model) {
          var recognizedComponents = {
            segmentList : [],
            // symbolList : [], no math symbol managed yet
            inkRange : {}
          };
          //We recopy the recognized strokes to flag them as toBeRemove if they are scratchouted or map with a symbol
          var potentialSegmentList = model.recognizedStrokes.concat(scope.InkModel.extractNonRecognizedStrokes(model));

          if(model.rawResult.result && model.rawResult.result.scratchOutResults){

            model.rawResult.result.scratchOutResults.forEach(function(scratchOut){
              scratchOut.erasedInkRanges.forEach(function(inkRangeToErase){
                potentialSegmentList[inkRangeToErase.component].toBeRemove = true
              });
              scratchOut.inkRanges.forEach(function(inkRangeToErase){
                potentialSegmentList[inkRangeToErase.component].toBeRemove = true
              });
            })
          }
          recognizedComponents.segmentList = potentialSegmentList.filter(segment => !segment.toBeRemove);
          recognizedComponents.inkRange.firstStroke = 0;
          recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
          model.recognizedComponents = recognizedComponents;
          logger.debug("Building the rendering model", model);
          return model;
        }
    );;
  };

  // Export
  scope.Cdkv3RestMathRecognizer = Cdkv3RestMathRecognizer;
})(MyScript, logging);
