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


  CanvasRender.prototype.updateCanvasSizeToParentOne = function (renderDomElement, renderStructure, model, stroker){
    _updateCanvasSizeToParentOne(renderDomElement, renderStructure.renderingCanvas);
    _updateCanvasSizeToParentOne(renderDomElement, renderStructure.capturingCanvas);
    this.drawModel(renderStructure, model, stroker);
  }

  function _updateCanvasSizeToParentOne(renderDomElement, canvas) {
    logger.info("Updating canvasSize ", canvas.id, " in ", renderDomElement.id);
    canvas.width = canvas.offsetWidth;
    //canvas.style.width = canvas.offsetWidth + 'px';
    canvas.height = canvas.offsetHeight;
    //canvas.style.height = canvas.offsetHeight + 'px';
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
  CanvasRender.prototype.clear = function (renderStructure) {
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
    renderStructure.renderingCanvasContext.clearRect(0, 0, renderStructure.renderingCanvas.width, renderStructure.renderingCanvas.height);
  };

  CanvasRender.prototype.drawModel = function(renderStructure, model, stroker){
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);


    //FIXME We need to manage parameters
    var emptyParamaters = {};
    this.clear(renderStructure);
    this.drawPendingStrokes(renderStructure, model, stroker);
    var self = this;
    
    function drawShapePrimitive(primitive){
      logger.debug('Attempting to draw shape primitive', primitive.type);
      self.drawShapePrimitive(primitive, renderStructure.renderingCanvasContext, emptyParamaters);
    }

    function drawSymbol(symbol){
      logger.debug('Attempting to draw symbol', symbol.elementType);
      //Displaying the text lines
      if(symbol.elementType === 'textLine'){
        self.drawShapeTextLine(symbol, renderStructure.renderingCanvasContext, emptyParamaters);
      }

      //Displaying the primitives
      if(symbol.primitives){
         switch (symbol.elementType){
           case 'shape':
            symbol.primitives.forEach(drawShapePrimitive);
            break;
           default:
            logger.info('Unable to draw ', symbol.elementType);
            break;
         }
      }
    }
    
    //Displaying the pending strokes
    self.drawPendingStrokes(renderStructure, model, stroker);
    
    self.drawConvertedStrokes(renderStructure, model, stroker);
    
    if(model.recognizedComponents.symbolList){
      model.recognizedComponents.symbolList.forEach(drawSymbol);
    }
      
    
  }

  CanvasRender.prototype.drawShapeSymbol = function(renderStructure, symbol){
    logger.debug("Shape primitive not managed in this mode");
  };

  CanvasRender.prototype.drawMusicSymbol = function(component){
    logger.debug("Music primitive not managed in this mode");
  };

  CanvasRender.prototype.drawMathSymbol = function() {
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
