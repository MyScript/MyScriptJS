import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawStroke } from './symbols/StrokeSymbolCanvasRenderer';
import { drawTextPrimitive, TextSymbols } from './symbols/TextSymbolCanvasRenderer';
import { drawShapePrimitive, ShapeSymbols } from './symbols/ShapeSymbolCanvasRenderer';
import { drawMusicPrimitive, preloadMusicSymbols, MusicSymbols } from './symbols/MusicSymbolCanvasRenderer';
import { drawMathPrimitive, MathSymbols } from './symbols/MathSymbolCanvasRenderer';
import * as InkModel from '../../model/InkModel';

/**
 * Tool to get canvas ratio (retina display)
 *
 * @private
 * @param {Element} canvas
 * @returns {Number}
 */
function getCanvasRatio(canvas) {
  if (canvas) {
    const context = canvas.getContext('2d');
    // we are using a browser object
    // eslint-disable-next-line no-undef
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  }
  return 1;
}

export function detectPixelRatio(renderDomElement) {
  // we are using a browser object
  // eslint-disable-next-line no-undef
  const tempCanvas = document.createElement('canvas');
  const canvasRatio = getCanvasRatio(tempCanvas);
  // document.removeChild(tempCanvas);
  return canvasRatio;
}

/**
 * Tool to create canvas
 *
 * @private
 * @param {Element} renderDomElement
 * @param {String} type
 * @returns {Element}
 */
function createCanvas(renderDomElement, type) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const canvas = browserDocument.createElement('canvas');
  logger.debug(renderDomElement.clientWidth);
  canvas.dataset.type = type;
  canvas.style.width = renderDomElement.clientWidth + 'px';
  canvas.style.height = renderDomElement.clientHeight + 'px';
  renderDomElement.appendChild(canvas);
  return canvas;
}


function performUpdateCanvasSizeToParentOne(renderDomElement, canvas, pixelRatio) {
  logger.debug(`Updating canvasSize ${canvas.id} in ${renderDomElement.id}`);
  /* eslint-disable no-param-reassign */
  canvas.width = renderDomElement.clientWidth * pixelRatio;
  canvas.height = renderDomElement.clientHeight * pixelRatio;
  canvas.style.width = renderDomElement.clientWidth + 'px';
  canvas.style.height = renderDomElement.clientHeight + 'px';
  /* eslint-enable no-param-reassign */
  canvas.getContext('2d').scale(pixelRatio, pixelRatio);
}

export function updateCanvasSizeToParentOne(renderDomElement, renderStructure, model, stroker) {
  performUpdateCanvasSizeToParentOne(renderDomElement, renderStructure.renderingCanvas, renderStructure.pixelRatio);
  performUpdateCanvasSizeToParentOne(renderDomElement, renderStructure.capturingCanvas, renderStructure.pixelRatio);
  this.drawModel(renderStructure, model, stroker);
}

/**
 * Populate the dom element
 * @param renderDomElement
 * @return {{pixelRatio: *, renderingCanvas: Element, renderingCanvasContext: (CanvasRenderingContext2D|WebGLRenderingContext), capturingCanvas: Element, capturingCanvasContext: (CanvasRenderingContext2D|WebGLRenderingContext)}} The structure to give as parameter when a draw model will be call
 */
export function populateRenderDomElement(renderDomElement) {
  logger.debug(`Populate dom elements for rendering inside ${renderDomElement.id}`);
  const pixelRatio = detectPixelRatio(renderDomElement);
  preloadMusicSymbols(renderDomElement);

  const renderingCanvas = createCanvas(renderDomElement, 'ms-rendering-canvas');
  performUpdateCanvasSizeToParentOne(renderDomElement, renderingCanvas, pixelRatio);
  const capturingCanvas = createCanvas(renderDomElement, 'ms-capture-canvas');
  performUpdateCanvasSizeToParentOne(renderDomElement, capturingCanvas, pixelRatio);

  return {
    pixelRatio,
    renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d'),
    capturingCanvas,
    capturingCanvasContext: capturingCanvas.getContext('2d')
  };
}

/**
 * Clear the recognition context
 *
 * @method clear
 */
function clear(renderStructure) {
  if (renderStructure.capturingCanvasContext) {
    renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
  }
  if (renderStructure.renderingCanvasContext) {
    renderStructure.renderingCanvasContext.clearRect(0, 0, renderStructure.renderingCanvas.width, renderStructure.renderingCanvas.height);
  }
}

export function drawCurrentStroke(renderStructure, model, stroker) {
  // Render the current stroke
  renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
  logger.debug('drawing current stroke ', model.currentStroke);
  drawStroke(model.currentStroke, renderStructure.capturingCanvasContext, stroker);
}

export function drawModel(renderStructure, model, stroker) {
  clear(renderStructure);

  const drawSymbol = (symbol) => {
    logger.debug(`Attempting to draw ${symbol.type} symbol`);
    if (symbol.type === 'stroke') {
      drawStroke(symbol, renderStructure.renderingCanvasContext, stroker);
    }
    if (TextSymbols[symbol.type]) {
      drawTextPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (ShapeSymbols[symbol.type]) {
      drawShapePrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (MathSymbols[symbol.type]) {
      drawMathPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (MusicSymbols[symbol.type]) {
      drawMusicPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
  };

  // Displaying the default symbols and pending strokes
  const symbols = [].concat(model.defaultSymbols);
  // Displaying the recognition symbols or raw strokes
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    symbols.push(...model.recognizedSymbols);
  } else {
    symbols.push(...model.rawRecognizedStrokes);
  }
  symbols.push(...InkModel.extractPendingStrokes(model));
  symbols.forEach(drawSymbol);
}
