'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('renderer');



  scope.CanvasRender.prototype.drawCurrentStroke = function(renderStructure, model, stroker){
    //Render the current stroke
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
    if(model.currentStroke && scope.StrokeComponent.getLength(model.currentStroke) > 0){
      stroker.renderStroke(renderStructure.capturingCanvasContext, model.currentStroke);
    }
  }


  /**
   * Update the render structure with the model
   * @param renderStructure
   * @param model
   * @param stroker
   */
  scope.CanvasRender.prototype.drawConvertedStrokes = function(renderStructureParam, model, strokerParam){
    var stroker = strokerParam;
    var renderStructure = renderStructureParam;
    logger.debug('Drawing recognized strokes');
  
    function drawStroke(stroke){
        stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
    }

    if( model.recognizedComponents && model.recognizedComponents.segmentList){
        model.recognizedComponents.segmentList.forEach(drawStroke);     
    } else {
        model.recognizedStrokes.forEach(drawStroke);
    }
    
    
 
  };

  /**
   * Update the render structure with the model
   * @param renderStructure
   * @param model
   * @param stroker
   */
  scope.CanvasRender.prototype.drawPendingStrokes = function(renderStructureParam, model, strokerParam){
    var stroker = strokerParam;
    var renderStructure = renderStructureParam;
    logger.debug('Drawing pending strokes');

    function drawStroke(stroke){
        stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
    }

    iterateOverAttribute(model.pendingStrokes, function(strokeArray){
      strokeArray.forEach(drawStroke)
    });
    
  }

}(MyScript, logging))
