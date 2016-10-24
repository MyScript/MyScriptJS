import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawRawRecognizedStrokes, drawPendingStrokes } from './StrokeCanvasRenderer';
import { drawTextLine, drawTextPrimitive, TextSymbols } from './TextCanvasRenderer';
import { drawShapePrimitive, ShapeSymbols } from './ShapeCanvasRenderer';
import { drawMusicPrimitive, MusicSymbols } from './MusicCanvasRenderer';
import { drawMathPrimitive, MathSymbols } from './MathCanvasRenderer';

export * from './StrokeCanvasRenderer';


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

function detectPixelRatio(renderDomElement) {
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
 * @param {String} id
 * @returns {Element}
 */
function createCanvas(renderDomElement, id) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const count = browserDocument.querySelectorAll('canvas[id^=' + id + ']').length;
  const canvas = browserDocument.createElement('canvas');
  logger.debug(renderDomElement.clientWidth);
  canvas.id = id + '-' + count;
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

export function setStyle(renderStructure, style) {
  Object.assign(renderStructure.capturingCanvasContext, style);
}

/**
 * Populate the dom element
 * @param renderDomElement
 * @returns The structure to give as parameter when a draw model will be call {{renderingCanvas: Element, renderingCanvasContext: CanvasRenderingContext2D, capturingCanvas: Element, capturingCanvasContext: CanvasRenderingContext2D}}
 */
export function populateRenderDomElement(renderDomElement) {
  logger.debug(`Populate dom elements for rendering inside ${renderDomElement.id}`);
  const pixelRatio = detectPixelRatio(renderDomElement);

  const renderingCanvas = createCanvas(renderDomElement, 'ms-rendering-canvas');
  performUpdateCanvasSizeToParentOne(renderDomElement, renderingCanvas, pixelRatio);
  const capturingCanvas = createCanvas(renderDomElement, 'ms-capture-canvas');
  performUpdateCanvasSizeToParentOne(renderDomElement, capturingCanvas, pixelRatio);

  const renderStructure = {
    pixelRatio,
    renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d'),
    capturingCanvas,
    capturingCanvasContext: capturingCanvas.getContext('2d')
  };
  return renderStructure;
}

/**
 * Clear the recognition context
 *
 * @method clear
 */
export function clear(renderStructure) {
  renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
  renderStructure.renderingCanvasContext.clearRect(0, 0, renderStructure.renderingCanvas.width, renderStructure.renderingCanvas.height);
}

export function drawModel(renderStructure, model, stroker) {
  clear(renderStructure);

  // drawPendingStrokes(renderStructure, model, stroker);

  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };

  const drawSymbol = (symbol) => {
    logger.debug(`Attempting to draw ${symbol.type} symbol`);
    if (symbol.type === 'stroke') {
      drawStroke(symbol);
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

  // Displaying the pending strokes
  drawPendingStrokes(renderStructure, model, stroker);
  // Displaying the symbols
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    model.recognizedSymbols.forEach(drawSymbol);
  } else {
    drawRawRecognizedStrokes(renderStructure, model, stroker);
  }
}
