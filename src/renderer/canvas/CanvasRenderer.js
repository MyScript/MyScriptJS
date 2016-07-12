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






  /**
   * Clear the recognition context
   *
   * @method clear
   */
  function clear (canvasContext) {
    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }


  CanvasRender.prototype.drawPrimitive = function(){
    this.drawShapePrimitive();
  }

  CanvasRender.prototype.drawShapePrimitive = function(component){
    logger.debug("Shape primitive not managed in this mode");
  };

  CanvasRender.prototype.drawMusicPrimitive = function(component){
    logger.debug("Music primitive not managed in this mode");
  };

  CanvasRender.prototype.drawMathPrimitive = function() {
    logging.debug("Math primitive not managed in this mode");

  };

  CanvasRender.prototype.drawTextPrimitive = function() {
    logging.debug("Text primitive not managed in this mode");

  };

  CanvasRender.prototype.drawCurrentStroke = function(renderStructure, model, stroker){
    logging.debug("drawCurrentStroke not managed in this mode");
  };

  CanvasRender.prototype.drawPendingStrokes = function(renderStructure, model, stroker){
    logging.debug("drawPendingStrokes not managed in this mode");
  };

  scope.CanvasRender = CanvasRender;
}(MyScript, logging));
