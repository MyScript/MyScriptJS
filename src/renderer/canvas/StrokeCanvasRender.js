'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('renderer');



  scope.CanvasRender.prototype.drawCurrentStroke = function(renderStructure, model, stroker){
    //Render the current stroke
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
    if(model.currentStroke && model.currentStroke.getLength() > 0){
      stroker.renderStroke(renderStructure.capturingCanvasContext, model.currentStroke);
    }
  }


  /**
   * Update the render structure with the model
   * @param renderStructure
   * @param model
   * @param stroker
   */
  scope.CanvasRender.prototype.drawPendingStrokes = function(renderStructure, model, stroker){
    logger.debug('Drawing ', model.pendingStrokes.length, ' pending strokes');
    //drawShapePrimitive();
    //TODO Maybe we should write the current stroke
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);

    model.pendingStrokes.forEach(function(stroke){
      stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
    });
  };

}(MyScript, logging))
