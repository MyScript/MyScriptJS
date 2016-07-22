'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var StrokeComponent = scope.StrokeComponent;

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
    scope.InkModel.extractNonRecognizedStrokes(model).forEach(function(stroke){
      input.components.push(StrokeComponent.toJSON(stroke))
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
        function memorizeInstanceId(response) {
          currentRestShapeRecognizer.shapeInstanceId = response.instanceId;
          return response;
        }
    ).then(
        function updateModel(response) {
          logger.debug("Cdkv3RestShapeRecognizer update model", response);
          model.rawResult = response;
          return model;
        }
    ).then(
        function generateRenderingResult(model) {
          var recognizedComponents = {
            segmentList : [],
            symbolList : [],
            inkRange : {}
          };
          //We recopy the recognized strokes to flag them as toBeRemove if they are scratchouted or map with a symbol
          var potentialSegmentList = model.recognizedStrokes.concat(scope.InkModel.extractNonRecognizedStrokes(model));
          //TODO Check the wording compare to the SDK doc
          if(model.rawResult.result){
            model.rawResult.result.segments.forEach(function(shape){
              if(shape.candidates && shape.candidates.length > 0 && shape.candidates[0].type !== "notRecognized"){
                //Flagging strokes recognized as toBeRemove
                shape.inkRanges.forEach(function(inkRange){
                  potentialSegmentList.slice(inkRange.firstStroke, inkRange.lastStroke+1).forEach(function(segment){
                    segment.toBeRemove = true;
                  });
                } );
                //Merging the first candidate with the shape element
                var newSymbol = Object.assign(shape, shape.candidates[0]);
                newSymbol.candidates = undefined;
                recognizedComponents.symbolList.push(newSymbol);
              }
            })
          }
          recognizedComponents.segmentList = potentialSegmentList.filter(segment => !segment.toBeRemove);
          recognizedComponents.inkRange.firstStroke = 0;
          recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
          model.recognizedComponents = recognizedComponents;
          logger.debug("Building the rendering model", model);
          return model;
        }
    );
  };

  // Export
  scope.Cdkv3RestShapeRecognizer = Cdkv3RestShapeRecognizer;
})(MyScript, logging);
