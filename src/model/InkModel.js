'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('model');

  //Only InkModel
  function InkModel() {
    this.recognizedStrokes = [];
    this.currentStroke = new scope.StrokeComponent();
    this.pendingStrokes = [];
    //TODO This may not be a good idea to have a recognize state here
    this.state = scope.ModelState.INITIALYZING;
  }

  InkModel.prototype.penUp = function (point) {
    logger.debug("penUp", point);
    this.currentStroke.addPoint(point);
    this.pendingStrokes.push(this.currentStroke);
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


  // Export
  scope.InkModel = InkModel;
})(MyScript, logging);
