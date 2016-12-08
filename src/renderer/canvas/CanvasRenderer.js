import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawStroke } from './symbols/StrokeSymbolCanvasRenderer';
import { drawTextPrimitive, TextSymbols } from './symbols/TextSymbolCanvasRenderer';
import { drawShapePrimitive, ShapeSymbols } from './symbols/ShapeSymbolCanvasRenderer';
import { drawMusicPrimitive, preloadMusicSymbols, MusicSymbols } from './symbols/MusicSymbolCanvasRenderer';
import { drawMathPrimitive, MathSymbols } from './symbols/MathSymbolCanvasRenderer';
import * as InkModel from '../../model/InkModel';

/**
 * Tool to get pixel ratio (retina display)
 *
 * @private
 * @param {Element} canvas
 * @returns {Number}
 */
function getPixelRatio(canvas) {
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

/**
 * Detects the pixel rate of the device
 * @param renderDomElement
 * @return {Number}
 */
function detectPixelRatio(renderDomElement) {
  // we are using a browser object
  // eslint-disable-next-line no-undef
  const tempCanvas = document.createElement('canvas');
  const canvasRatio = getPixelRatio(tempCanvas);
  // document.removeChild(tempCanvas);
  return canvasRatio;
}

/**
 * Tool to create canvas
 *
 * @private
 * @param {Element} domElement
 * @param {String} type
 * @returns {Element}
 */
function createCanvas(domElement, type) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const canvas = browserDocument.createElement('canvas');
  logger.debug(domElement.clientWidth);
  canvas.dataset.type = type;
  canvas.style.width = domElement.clientWidth + 'px';
  canvas.style.height = domElement.clientHeight + 'px';
  domElement.appendChild(canvas);
  return canvas;
}

function resizeCanvas(canvas, pixelRatio) {
  const domElement = canvas.parentNode;
  logger.debug(`Updating canvasSize ${canvas.id} in ${domElement.id}`);
  /* eslint-disable no-param-reassign */
  canvas.width = domElement.clientWidth * pixelRatio;
  canvas.height = domElement.clientHeight * pixelRatio;
  canvas.style.width = `${domElement.clientWidth}px`;
  canvas.style.height = `${domElement.clientHeight}px`;
  /* eslint-enable no-param-reassign */
  canvas.getContext('2d').scale(pixelRatio, pixelRatio);
}

/**
 * Populate the dom element
 * @param domElement
 * @return {*} The rendering structure to give as parameter when a draw model will be call
 */
export function populateDomElement(domElement) {
  logger.debug(`Populate dom elements for rendering inside ${domElement.id}`);
  const pixelRatio = detectPixelRatio(domElement);
  preloadMusicSymbols(domElement);

  const renderingCanvas = createCanvas(domElement, 'ms-rendering-canvas');
  resizeCanvas(renderingCanvas, pixelRatio);
  const capturingCanvas = createCanvas(domElement, 'ms-capture-canvas');
  resizeCanvas(capturingCanvas, pixelRatio);

  return {
    pixelRatio,
    renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d'),
    capturingCanvas,
    capturingCanvasContext: capturingCanvas.getContext('2d')
  };
}

/**
 * Update the canvas size from the renderStructure
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function resize(renderStructure, model, stroker) {
  resizeCanvas(renderStructure.renderingCanvas, renderStructure.pixelRatio);
  resizeCanvas(renderStructure.capturingCanvas, renderStructure.pixelRatio);
  this.drawModel(renderStructure, model, stroker);
}

/**
 * Draw the current stroke from the model
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function drawCurrentStroke(renderStructure, model, stroker) {
  // Render the current stroke
  renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
  logger.debug('drawing current stroke ', model.currentStroke);
  drawStroke(model.currentStroke, renderStructure.capturingCanvasContext, stroker);
}

/**
 * Draw all symbols contained into the model
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function drawModel(renderStructure, model, stroker) {
  renderStructure.renderingCanvasContext.clearRect(0, 0, renderStructure.renderingCanvas.width, renderStructure.renderingCanvas.height);

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
  const symbols = [...model.defaultSymbols];
  // Displaying the recognition symbols or raw strokes
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    symbols.push(...model.recognizedSymbols);
    symbols.push(...InkModel.extractPendingStrokes(model));
  } else {
    symbols.push(...model.pendingStrokes);
  }
  symbols.forEach(drawSymbol);
  renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
}
