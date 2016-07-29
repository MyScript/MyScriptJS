'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('recognizer');
  var StrokeComponent = scope.StrokeComponent;


  function Cdkv3CommonMathRecognizer(){
    this.type = "Cdkv3CommonMathRecognizer";
  }


  Cdkv3CommonMathRecognizer.generateRenderingResult = function (model) {
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
  };

  Cdkv3CommonMathRecognizer.getAvailableRecognitionSlots = function () {
    var availableRecognitionTypes = {};
    availableRecognitionTypes[scope.RecognitionSlot.ON_PEN_UP] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_DEMAND] = true;
    availableRecognitionTypes[scope.RecognitionSlot.ON_TIME_OUT] = true;
    return availableRecognitionTypes;
  }

  // Export
  scope.Cdkv3CommonMathRecognizer = Cdkv3CommonMathRecognizer;
})(MyScript, logging);
