import { drawModel } from './CanvasRenderer';
import * as InkModel from '../../model/InkModel';

function createCanvas(borderCoordinates, margin = 10) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const canvas = browserDocument.createElement('canvas');
  canvas.width = Math.abs(borderCoordinates.maxX - borderCoordinates.minX) + (2 * margin);
  canvas.style.width = canvas.width + 'px';
  canvas.height = Math.abs(borderCoordinates.maxY - borderCoordinates.minY) + (2 * margin);
  canvas.style.height = canvas.height + 'px';
  return canvas;
}

/**
 * Generate a PNG image data url from the model
 * @param {Model} model Current model
 * @param {Stroker} stroker Current stroker
 * @param {Number} [margin=10] Margins to apply around the image
 * @return {String} Image data string result
 */
export function getImage(model, stroker, margin = 10) {
  if (model.rawStrokes.length > 0) {
    const borderCoordinates = InkModel.getBorderCoordinates(model);

    const capturingCanvas = createCanvas(borderCoordinates, margin);
    const renderingCanvas = createCanvas(borderCoordinates, margin);
    const renderStructure = {
      renderingCanvas,
      renderingCanvasContext: renderingCanvas.getContext('2d'),
      capturingCanvas,
      capturingCanvasContext: capturingCanvas.getContext('2d')
    };
    // Change canvas origin
    renderStructure.renderingCanvasContext.translate(-borderCoordinates.minX + margin, -borderCoordinates.minY + margin);
    drawModel(renderStructure, model, stroker);
    return renderStructure.renderingCanvas.toDataURL('image/png');
  }
  return null;
}
