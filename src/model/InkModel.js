'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('model');

  //Only InkModel
  function InkModel() {
    this.recognizedComponents = {};
    this.recognizedStrokes = [];
    this.nextRecognitionRequestId = 0;
    this.currentRecognitionId = undefined;
    this.lastRecognitionRequestId = -1;
    this.currentStroke = new scope.StrokeComponent();
    this.pendingStrokes = {};
    /*
      { 0  : [ ]
        recognitionId : array of strokes
        }
     */
    //TODO This may not be a good idea to have a recognize state here
    this.state = scope.ModelState.INITIALYZING;

    //The raw recogntion result is saved here
    this.rawResult = undefined;
    this.renderingResult = undefined;
    /*
        {
          segmentList : []
          symbolList : [
            {
              type :
              ...

          ]
          inkRange : {}
          }

         */

  }

  function updatePendingStrokes(pendingStrokes, pendingStrokeId, stroke){
    if(!pendingStrokes[pendingStrokeId]){
      pendingStrokes[pendingStrokeId] = []
    }
    pendingStrokes[pendingStrokeId].push(stroke)
  }

  InkModel.prototype.penUp = function (point) {
    logger.debug("penUp", point);
    this.currentStroke.addPoint(point);
    updatePendingStrokes(this.pendingStrokes, this.nextRecognitionRequestId, this.currentStroke);
    this.currentStroke = new scope.StrokeComponent();
  };

  InkModel.prototype.penDown = function (point) {
    logger.debug("penDown", point);
    this.currentStroke.addPoint(point);


  };

  InkModel.prototype.penMove = function (point) {
    logger.debug("penMove", point);
    this.currentStroke.addPoint(point);

  };

  InkModel.extractNonRecognizedStrokes = function (model){
    var nonRecognizedStrokes = [];
    for(var recognitionRequestId = (model.lastRecognitionRequestId+1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++){
      nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
    }
    return nonRecognizedStrokes;
  };

  // Export
  scope.InkModel = InkModel;
})(MyScript, logging);
