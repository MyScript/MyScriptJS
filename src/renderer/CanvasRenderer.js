'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('renderer');


  function CanvasRender () {
    this.type = "CanvasRender";
  }

  /**
   * Tool to create canvas
   *
   * @private
   * @param {Element} parent
   * @param {String} id
   * @returns {Element}
   */
  function _createCanvas(renderDomElement, id) {
    var count = document.querySelectorAll('canvas[id^=' + id + ']').length;
    var canvas = document.createElement('canvas');
    canvas.id = id + '-' + count;
    renderDomElement.appendChild(canvas);
    return canvas;
  }


  function _updateCanvasSizeToParentOne(renderDomElement, canvas) {
    logger.info("Updating canvasSize ", canvas.id, " in ", renderDomElement.id);
    canvas.width = renderDomElement.offsetWidth;
    canvas.style.width = renderDomElement.offsetWidth + 'px';
    canvas.height = renderDomElement.offsetHeight;
    canvas.style.height = renderDomElement.offsetHeight + 'px';
    canvas.getContext('2d').scale(1, 1);
    //TODO Manage a ration for retina devices
  }

  /**
   * Populate the dom element
   * @param renderDomElement
   * @returns The structure to give as paramter when a draw model will be call {{renderingCanvas: Element, renderingCanvasContext: CanvasRenderingContext2D, capturingCanvas: Element, capturingCanvasContext: CanvasRenderingContext2D}}
   */
  CanvasRender.prototype.populateRenderDomElement = function (renderDomElement){
    logger.debug("Populate dom elements for rendering inside  ", renderDomElement.id);
    var renderingCanvas = _createCanvas(renderDomElement, "ms-rendering-canvas");
    _updateCanvasSizeToParentOne(renderDomElement, renderingCanvas);
    var capturingCanvas = _createCanvas(renderDomElement, "ms-capture-canvas");
    _updateCanvasSizeToParentOne(renderDomElement, capturingCanvas);
    return {
      renderingCanvas : renderingCanvas,
      renderingCanvasContext : renderingCanvas.getContext("2d"),
      capturingCanvas : capturingCanvas,
      capturingCanvasContext : capturingCanvas.getContext("2d")
    }
  };



  CanvasRender.prototype.drawCurrentStroke = function(renderStructure, model, stroker){
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
  CanvasRender.prototype.drawPendingStrokes = function(renderStructure, model, stroker){
    logger.debug('Drawing ', model.pendingStrokes.length, ' pending strokes');

    //TODO Maybe we should write the current stroke
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);

    model.pendingStrokes.forEach(function(stroke){
      stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
    });
  };



  /**
   * Clear the recognition context
   *
   * @method clear
   */
  function clear (canvasContext) {
    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }



  /**
   * Draw a rectangle on context
   *
   * @method drawRectangle
   * @param {Rectangle} rectangle
   */
  function drawRectangle (canvasContext, rectangle, canvasParam) {
    var params = this.getParameters();
    canvasContext.save();
    try {
      canvasContext.fillStyle = canvasParam.getRectColor();
      canvasContext.strokeStyle = canvasParam.getColor();
      canvasContext.lineWidth = 0.5 * canvasParam.getWidth();
      canvasContext.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
    } finally {
      canvasContext.restore();
    }
  };



  /**
   * Draw stroke component
   *
   * @private
   * @method drawStroke
   * @param {StrokeComponent} stroke
   */
  function drawStroke (stroke) {
    if (stroke && stroke.getLength() > 0) {
      _renderStroke(stroke, this.getContext());
    }
  };

  scope.CanvasRender = CanvasRender;
}(MyScript, logging))
