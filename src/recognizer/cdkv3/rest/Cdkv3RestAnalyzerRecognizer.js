'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var StrokeComponent = scope.StrokeComponent;

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
      analyzerInput.components.push(StrokeComponent.toJSON(stroke))
    });

    //We add the pending strokes to the model
    scope.InkModel.extractNonRecognizedStrokes(model).forEach(function(stroke){
      analyzerInput.components.push(StrokeComponent.toJSON(stroke))
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
            //Handling text lines
            model.rawResult.result.textLines.forEach(function(textLine){
              textLine.type = 'textline';
              textLine.inkRanges.forEach((inkRange) => {
                potentialSegmentList[inkRange.stroke].toBeRemove = true;
              });
              //textLine.inkRanges = undefined;
              recognizedComponents.symbolList.push(textLine);
            });

            model.rawResult.result.shapes.forEach(function(shape){
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
  scope.Cdkv3RestAnalyzerRecognizer = Cdkv3RestAnalyzerRecognizer;
})(MyScript, logging);
