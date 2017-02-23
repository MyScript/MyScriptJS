import * as d3 from 'd3';
import * as webfontloader from 'webfont-loader';
import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawStroke } from './symbols/StrokeSymbolSVGRenderer';
import * as InkModel from '../../model/InkModel';


/**
 * Get info
 * @return {RendererInfo} Information about this renderer
 */
export function getInfo() {
  return {
    type: 'svg',
    apiVersion: 'V4'
  };
}

/**
 * Populate the dom element
 * @param {Element} element DOM element to attach the rendering elements
 * @return {Object} The renderer context to give as parameter when a draw model will be call
 */
export function populateDomElement(element) {
  logger.debug(`Populate dom elements for rendering inside ${element.id}`);
  return d3.select('.ms-ink-paper');
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function resize(context, model, stroker) {
  logger.debug('Nothing to resize in svg');
  return model;
}

/**
 * Draw the current stroke from the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function drawCurrentStroke(context, model, stroker) {
  const modelRef = model;
  // Render the current stroke
  logger.debug('drawing current stroke ', model.currentStroke);
  context.select('#currentStroke').attr('visibility', 'visible');
  drawStroke(context.select('#currentStroke'), model.currentStroke, stroker);
  // Add a pending id for pending strokes rendering
  modelRef.currentStroke.id = `pendingStroke-${model.lastRecognitionPositions.lastReceivedPosition + 1}`;
  return modelRef;
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function drawModel(context, model, stroker) {
  context.select('#currentStroke').attr('visibility', 'hidden');

  const drawSymbol = (symbol, symbolContext) => {
    logger.debug(`Attempting to draw ${symbol.type} symbol`);

    if (symbol.type === 'stroke') {
      drawStroke(symbolContext.append('path').attr('id', symbol.id), symbol, stroker);
    } else {
      logger.warn(`Impossible to draw ${symbol.type} symbol`);
    }
  };

  const updateView = (update) => {
    switch (update.type) {
      case 'REPLACE_ALL': {
        context.html(update.svg);
        const svg = context.select('svg');
        svg.append('path').attr('id', 'currentStroke');
        svg.append('g').attr('id', 'pendingStrokes');
      }
        break;
      case 'REMOVE_ELEMENT':
        context.selectAll(`#${update.id}`).remove();
        break;
      case 'REPLACE_ELEMENT': {
        const parent = context.select(`#${update.id}`).node().parentNode;
        context.selectAll(`#${update.id}`).remove();
        parent.innerHTML += update.svg;
      }
        break;
      case 'REMOVE_CHILD':
        context.select(`#${update.parentId}:nth-child(${update.index + 1})`).remove();
        break;
      case 'APPEND_CHILD': {
        const parent = context.select(update.parentId ? `#${update.parentId}` : 'svg');
        parent.html(parent.html() + update.svg);
      }
        break;
      case 'INSERT_BEFORE':
        logger.debug('Inserting before');
        break;
      case 'REMOVE_ATTRIBUTE':
        context.select(update.id ? `#${update.id}` : 'svg').attr(update.name, null);
        break;
      case 'SET_ATTRIBUTE':
        context.select(update.id ? `#${update.id}` : 'svg').attr(update.name, update.value);
        break;
      default:
        logger.debug(`Unknown update ${update.type} action`);
        break;
    }
  };

  const pendingRecognizedSymbols = InkModel.extractPendingRecognizedSymbols(model);
  if (pendingRecognizedSymbols) {
    logger.debug(`pendingRecognizedSymbols.length = ${pendingRecognizedSymbols.length}`);
    pendingRecognizedSymbols.forEach(patch => updateView(patch));
    InkModel.updateModelRenderedPosition(model);
  }

  const pendingStrokes = InkModel.extractPendingStrokes(model);
  if (pendingStrokes) {
    logger.debug(`pendingStrokes.length = ${pendingStrokes.length}`);
    pendingStrokes.forEach(stroke => drawSymbol(stroke, context.select('#pendingStrokes')));
  }
  return model;
}
