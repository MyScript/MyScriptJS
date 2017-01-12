import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawStroke } from './symbols/StrokeSymbolCanvasRenderer';
import { drawTextSymbol, TextSymbols } from './symbols/TextSymbolCanvasRenderer';
import { drawShapeSymbol, ShapeSymbols } from './symbols/ShapeSymbolCanvasRenderer';
import {
  drawMusicSymbol,
  preloadMusicSymbols,
  MusicSymbols
} from './symbols/MusicSymbolCanvasRenderer';
import { analyzerRestV3Configuration } from '../../recognizer/cdkv3/rest/Cdkv3RestAnalyzerRecognizer';
import { mathRestV3Configuration } from '../../recognizer/cdkv3/rest/Cdkv3RestMathRecognizer';
import { musicRestV3Configuration } from '../../recognizer/cdkv3/rest/Cdkv3RestMusicRecognizer';
import { shapeRestV3Configuration } from '../../recognizer/cdkv3/rest/Cdkv3RestShapeRecognizer';
import { textRestV3Configuration } from '../../recognizer/cdkv3/rest/Cdkv3RestTextRecognizer';
import { mathWebSocketV3Configuration } from '../../recognizer/cdkv3/websocket/Cdkv3WSMathRecognizer';
import { textWebSocketV3Configuration } from '../../recognizer/cdkv3/websocket/Cdkv3WSTextRecognizer';
import * as InkModel from '../../model/InkModel';

/**
 * Renderer info
 * @typedef {Object} RendererInfo
 * @property {String} name Renderer name.
 * @property {Array<Object>} supportedRecognitions Supported recognition configurations.
 */

/**
 * Default renderer
 * @typedef {Object} Renderer
 * @property {function(): RendererInfo} getInfo Get some information about this renderer
 * @property {function(element: Element): Object} populateDomElement Populate the DOM element to create rendering area.
 * @property {function(context: Object, model: Model, stroker: Stroker)} resize Explicitly resize the rendering area.
 * @property {function(context: Object, model: Model, stroker: Stroker)} drawCurrentStroke Draw the model currentStroke.
 * @property {function(context: Object, model: Model, stroker: Stroker)} drawModel Draw the model defaultSymbols and recognizedSymbols.
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

function detectPixelRatio(element) {
  // we are using a browser object
  // eslint-disable-next-line no-undef
  const tempCanvas = document.createElement('canvas');
  const canvasRatio = getPixelRatio(tempCanvas);
  // document.removeChild(tempCanvas);
  return canvasRatio;
}

function createCanvas(element, type) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const canvas = browserDocument.createElement('canvas');
  logger.debug(element.clientWidth);
  canvas.dataset.type = type;
  canvas.style.width = element.clientWidth + 'px';
  canvas.style.height = element.clientHeight + 'px';
  element.appendChild(canvas);
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
 * @param {Element} element DOM element to attach the rendering elements
 * @return {Object} The renderer context to give as parameter when a draw model will be call
 */
export function populateDomElement(element) {
  logger.debug(`Populate dom elements for rendering inside ${element.id}`);
  const pixelRatio = detectPixelRatio(element);
  preloadMusicSymbols(element);

  const renderingCanvas = createCanvas(element, 'ms-rendering-canvas');
  resizeCanvas(renderingCanvas, pixelRatio);
  const capturingCanvas = createCanvas(element, 'ms-capture-canvas');
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
 * Get info
 * @return {RendererInfo} Information about this renderer
 */
export function getInfo() {
  return {
    name: 'canvas',
    supportedRecognitions: [
      analyzerRestV3Configuration,
      mathRestV3Configuration,
      musicRestV3Configuration,
      shapeRestV3Configuration,
      textRestV3Configuration,
      mathWebSocketV3Configuration,
      textWebSocketV3Configuration
    ]
  };
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 */
export function resize(context, model, stroker) {
  resizeCanvas(context.renderingCanvas, context.pixelRatio);
  resizeCanvas(context.capturingCanvas, context.pixelRatio);
  this.drawModel(context, model, stroker);
}

/**
 * Draw the current stroke from the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 */
export function drawCurrentStroke(context, model, stroker) {
  // Render the current stroke
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
  logger.debug('drawing current stroke ', model.currentStroke);
  drawStroke(context.capturingCanvasContext, model.currentStroke, stroker);
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 */
export function drawModel(context, model, stroker) {
  context.renderingCanvasContext.clearRect(0, 0, context.renderingCanvas.width, context.renderingCanvas.height);

  const drawSymbol = (symbol) => {
    logger.debug(`Attempting to draw ${symbol.type} symbol`);
    if (symbol.type === 'stroke') {
      drawStroke(context.renderingCanvasContext, symbol, stroker);
    } else if (TextSymbols[symbol.type]) {
      drawTextSymbol(context.renderingCanvasContext, symbol);
    } else if (ShapeSymbols[symbol.type]) {
      drawShapeSymbol(context.renderingCanvasContext, symbol);
    } else if (MusicSymbols[symbol.type]) {
      drawMusicSymbol(context.renderingCanvasContext, symbol);
    } else {
      logger.warn(`Impossible to draw ${symbol.type} symbol`);
    }
  };

  // Displaying the default symbols and pending strokes
  const symbols = [...model.defaultSymbols];
  // Displaying the recognition symbols or raw strokes
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    symbols.push(...model.recognizedSymbols);
    symbols.push(...InkModel.extractPendingStrokes(model));
  } else {
    symbols.push(...model.rawStrokes);
  }
  symbols.forEach(drawSymbol);
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
}
