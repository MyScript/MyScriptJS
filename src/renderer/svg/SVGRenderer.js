import * as d3 from 'd3-selection';
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
export function attach(element) {
  const elementRef = element;
  logger.debug('populate root element', elementRef);
  elementRef.style.fontSize = '10px';
  return d3.select(elementRef);
}

/**
 * Detach the renderer from the DOM element
 * @param {Element} element DOM element to attach the rendering elements
 * @param {Object} context Current rendering context
 */
export function detach(element, context) {
  logger.debug('detach renderer', element);
  context.select('svg').remove();
}

/**
 * Update the rendering context size
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @param {Number} minHeight Minimal height for resize
 * @param {Number} minWidth Minimal Width for resize
 * @return {Model}
 */
export function resize(context, model, stroker, minHeight, minWidth) {
  const rect = context.node().getBoundingClientRect();
  const svg = context.selectAll('svg');
  const width = rect.width < minWidth ? minWidth : rect.width;
  const height = rect.height < minHeight ? minHeight : rect.height;
  svg.attr('viewBox', `0 0 ${width}, ${height}`);
  svg.attr('width', `${width}px`);
  svg.attr('height', `${height}px`);
  logger.debug('svg viewBox changed', svg);
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
  // Add a pending id for pending strokes rendering
  modelRef.currentStroke.id = `pendingStroke-${model.rawStrokes.length}`;
  // Render the current stroke
  logger.trace('drawing current stroke ', model.currentStroke);
  context.select(`#pendingStrokes #${modelRef.currentStroke.id}`).remove();
  drawStroke(context.select('#pendingStrokes').append('path').attr('id', model.currentStroke.id), model.currentStroke, stroker);
  return modelRef;
}

function insertAdjacentSVG(element, position, html) {
  const container = element.ownerDocument.createElementNS('http://www.w3.org/2000/svg', '_');
  container.innerHTML = html;

  switch (position.toLowerCase()) {
    case 'beforebegin':
      element.parentNode.insertBefore(container.firstChild, element);
      break;
    case 'afterbegin':
      element.insertBefore(container.lastChild, element.firstChild);
      break;
    case 'beforeend':
      element.appendChild(container.firstChild);
      break;
    case 'afterend':
      element.parentNode.insertBefore(container.lastChild, element.nextSibling);
      break;
    default:
      logger.warn('Invalid insertAdjacentHTML position');
      break;
  }
}

/**
 * Draw all symbols contained into the model
 * @param {Object} context Current rendering context
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @return {Model}
 */
export function drawModel(context, model, stroker) {
  const drawSymbol = (symbol, symbolContext) => {
    logger.trace(`attempting to draw ${symbol.type} symbol`);
    if (symbol.type === 'stroke' && !symbolContext.select('id', symbol.id)) {
      drawStroke(symbolContext.append('path').attr('id', symbol.id), symbol, stroker);
    } else {
      logger.warn(`impossible to draw ${symbol.type} symbol`);
    }
  };

  const updateView = (patchUpdate) => {
    // We only add in the stack patch with updates
    patchUpdate.updates.forEach((update) => {
      try {
        const svgElementSelector = 'svg[data-layer="' + patchUpdate.layer + '"]';
        switch (update.type) {
          case 'REPLACE_ALL': {
            context.select(svgElementSelector).remove();
            const parent = context.node();
            if (parent.insertAdjacentHTML) {
              parent.insertAdjacentHTML('beforeEnd', update.svg);
            } else {
              insertAdjacentSVG(parent, 'beforeEnd', update.svg);
            }
            if (patchUpdate.layer === 'MODEL') {
              context.select(svgElementSelector).append('g').attr('id', 'pendingStrokes');
            }
          }
            break;
          case 'REMOVE_ELEMENT': {
            if (update.id.includes('s') || update.id.includes('MODEL')) {
              context.select(`#${update.id}`).remove();
            } else {
              context.select(`#${update.id}`).attr('class', 'removed-stroke');
              setTimeout(() => {
                context.select(`#${update.id}`).remove();
              }, 100);
            }
            break;
          }
          case 'REPLACE_ELEMENT': {
            const parent = context.select(`#${update.id}`).node().parentNode;
            context.select(`#${update.id}`).remove();
            if (parent.insertAdjacentHTML) {
              parent.insertAdjacentHTML('beforeEnd', update.svg);
            } else {
              insertAdjacentSVG(parent, 'beforeEnd', update.svg);
              context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
            }
          }
            break;
          case 'REMOVE_CHILD':
            context.select(`#${update.parentId} > *:nth-child(${update.index + 1})`).remove();
            break;
          case 'APPEND_CHILD': {
            const parent = context.select(update.parentId ? `#${update.parentId}` : svgElementSelector).node();
            if (parent.insertAdjacentHTML) {
              parent.insertAdjacentHTML('beforeEnd', update.svg);
            } else {
              insertAdjacentSVG(parent, 'beforeEnd', update.svg);
              context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
            }
          }
            break;
          case 'INSERT_BEFORE': {
            const parent = context.select(`#${update.refId}`).node();
            if (parent.insertAdjacentHTML) {
              parent.insertAdjacentHTML('beforeBegin', update.svg);
            } else {
              insertAdjacentSVG(parent, 'beforeBegin', update.svg);
              context.node().insertAdjacentHTML('beforeEnd', context.select(svgElementSelector).remove().node().outerHTML);
            }
          }
            break;
          case 'REMOVE_ATTRIBUTE':
            context.selectAll(update.id ? `#${update.id}` : 'svg').attr(update.name, null);
            break;
          case 'SET_ATTRIBUTE': {
            // We ignore setAttributes on the svg element because we handle the resize elsewhere to prevent a blink effect
            // that occurs if we are waiting for the server to resize.
            if (update.id) {
              context.selectAll(`#${update.id}`).attr(update.name, update.value);
            }
            break;
          }
          default:
            logger.debug(`unknown update ${update.type} action`);
            break;
        }
      } catch (e) {
        logger.error(`Invalid update ${update.type}`, update);
        logger.error('Error on svg patch', e);
      }
    });
  };

  const pendingRecognizedSymbols = InkModel.extractPendingRecognizedSymbols(model);
  if (pendingRecognizedSymbols) {
    pendingRecognizedSymbols.forEach(patch => updateView(patch));
    InkModel.updateModelRenderedPosition(model);
  }

  const pendingStrokes = InkModel.extractPendingStrokes(model);
  if (pendingStrokes) {
    pendingStrokes.forEach(stroke => drawSymbol(stroke, context.select('#pendingStrokes')));
  }
  return model;
}
