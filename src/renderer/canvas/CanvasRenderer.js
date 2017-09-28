import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawStroke } from './symbols/StrokeSymbolCanvasRenderer';
import { drawTextSymbol, TextSymbols } from './symbols/TextSymbolCanvasRenderer';
import { drawShapeSymbol, ShapeSymbols } from './symbols/ShapeSymbolCanvasRenderer';
import {
  drawMusicSymbol,
  getMusicClefElements,
  MusicSymbols
} from './symbols/MusicSymbolCanvasRenderer';
import * as InkModel from '../../model/InkModel';

/**
 * Renderer info
 * @typedef {Object} RendererInfo
 * @property {String} type Renderer type.
 * @property {String} apiVersion Supported api version.
 */

/**
 * Default renderer
 * @typedef {Object} Renderer
 * @property {function(): RendererInfo} getInfo Get some information about this renderer
 * @property {function(element: Element, minHeight: Number, minWidth: Number): Object} attach Populate the DOM element to create rendering area.
 * @property {function(element: Element, context: Object)} detach Remove rendering area from the DOM element.
 * @property {function(context: Object, model: Model, stroker: Stroker)} resize Explicitly resize the rendering area.
 * @property {function(context: Object, model: Model, stroker: Stroker): Model} drawCurrentStroke Draw the model currentStroke.
 * @property {function(context: Object, model: Model, stroker: Stroker): Model} drawModel Draw the model defaultSymbols and recognizedSymbols.
 */

/**
 * Get info
 * @return {RendererInfo} Information about this renderer
 */
export function getInfo() {
  return {
    type: 'canvas',
    apiVersion: 'V3'
  };
}

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
  canvas.classList.add(type);
  canvas.classList.add('ms-canvas');
  element.appendChild(canvas);
  logger.debug('canvas created', canvas);
  return canvas;
}

function resizeContent(context) {
  const elements = [context.renderingCanvas, context.capturingCanvas];
  elements.forEach((canvas) => {
    const domElement = canvas.parentNode;
    const width = domElement.clientWidth < context.minWidth ? context.minWidth : domElement.clientWidth;
    const height = domElement.clientHeight < context.minHeight ? context.minHeight : domElement.clientHeight;
    /* eslint-disable no-param-reassign */
    canvas.width = width * context.pixelRatio;
    canvas.height = height * context.pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    /* eslint-enable no-param-reassign */
    canvas.getContext('2d').scale(context.pixelRatio, context.pixelRatio);
    logger.debug('canvas size changed', canvas);
  });
  return context;
}

/**
 * Attach the renderer to the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Number} [minHeight=0] Minimal height of the editor
 * @param {Number} [minWidth=0] Minimal width of the editor
 * @return {Object} The renderer context to give as parameter when a draw model will be call
 */
export function attach(element, minHeight = 0, minWidth = 0) {
  logger.debug('attach renderer', element);
  const pixelRatio = detectPixelRatio(element);
  const resources = getMusicClefElements();
  resources.forEach(clef => element.appendChild(clef));

  const renderingCanvas = createCanvas(element, 'ms-rendering-canvas');
  const capturingCanvas = createCanvas(element, 'ms-capture-canvas');

  const context = {
    pixelRatio,
    minHeight,
    minWidth,
    renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d'),
    capturingCanvas,
    capturingCanvasContext: capturingCanvas.getContext('2d'),
    resources
  };

  return resizeContent(context);
}

/**
 * Detach the renderer from the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Object} context Current rendering context
 */
export function detach(element, context) {
  logger.debug('detach renderer', element);
  context.resources.forEach(res => element.removeChild(res));
  element.removeChild(context.renderingCanvas);
  element.removeChild(context.capturingCanvas);
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function resize(context, model, stroker) {
  return this.drawModel(resizeContent(context), model, stroker);
}

function drawSymbol(context, symbol, stroker) {
  const type = symbol.elementType ? symbol.elementType : symbol.type;
  logger.trace(`attempting to draw ${type} symbol`);
  if (type === 'stroke') {
    drawStroke(context, symbol, stroker);
  } else if (TextSymbols[type]) {
    drawTextSymbol(context, symbol);
  } else if (ShapeSymbols[type]) {
    drawShapeSymbol(context, symbol);
  } else if (MusicSymbols[type]) {
    drawMusicSymbol(context, symbol);
  } else {
    logger.warn(`impossible to draw ${type} symbol`);
  }
}

/**
 * Draw the current stroke from the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function drawCurrentStroke(context, model, stroker) {
  // Render the current stroke
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
  logger.trace('drawing current stroke ', model.currentStroke);
  drawStroke(context.capturingCanvasContext, model.currentStroke, stroker);
  return model;
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function drawModel(context, model, stroker) {
  context.renderingCanvasContext.clearRect(0, 0, context.renderingCanvas.width, context.renderingCanvas.height);
  // Displaying the default symbols and pending strokes
  const symbols = [...model.defaultSymbols];
  // Displaying the recognition symbols or raw strokes
  if (model.recognizedSymbols) {
    symbols.push(...model.recognizedSymbols);
    symbols.push(...InkModel.extractPendingStrokes(model));
  } else {
    symbols.push(...model.rawStrokes);
  }
  symbols.forEach(symbol => drawSymbol(context.renderingCanvasContext, symbol, stroker));
  context.capturingCanvasContext.clearRect(0, 0, context.capturingCanvas.width, context.capturingCanvas.height);
  return model;
}
