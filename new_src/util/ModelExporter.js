import { utilLogger as logger } from '../configuration/LoggerConfig';
import * as CanvasRenderer from '../renderer/canvas/CanvasRenderer';
import * as InkModel from '../model/InkModel';
/**
 *
 * @param marginX the horizontal margin to apply (by default 10)
 * @param marginY the vertical margin to apply (by default 10)
 * @returns {ImageData} Build an ImageData object with content shrink to border of strokes.
 * @private
 */
export function getInkAsImageData(model, stroker, marginX = 10, marginY = 10) {
  logger.debug({ marginX, marginY });
  const shrinkedModel = InkModel.shrinkToMargin(model, marginX, marginY);
  const borderCoordinates = InkModel.getBorderCoordinates(shrinkedModel);
  // eslint-disable-next-line no-undef
  const nonDisplayCanvas = document.createElement('canvas');
  nonDisplayCanvas.width = borderCoordinates.maxX + (2 * marginX);
  nonDisplayCanvas.height = borderCoordinates.maxX + (2 * marginY);
  const renderStructure = { renderingCanvas: nonDisplayCanvas };
  CanvasRenderer.drawModel(renderStructure, shrinkedModel, stroker);
  const ctx = nonDisplayCanvas.getContext('2d');
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
  return ctx.getImageData(borderCoordinates.minX - marginX, borderCoordinates.minY - marginY, (borderCoordinates.maxX - borderCoordinates.minX) + (2 * marginX), (borderCoordinates.maxY - borderCoordinates.minY) + (2 * marginY));
}

/**
 *
 * @param marginX the horizontal margin to apply (by default 10)
 * @param marginY the vertical margin to apply (by default 10)
 * @returns {String} Build an String containg dataUrl with content shrink to border of strokes.
 * @private
 */
InkPaper.prototype.getInkAsPng = function (marginX, marginY) {
  var imageRenderingCanvas = document.createElement('canvas');
  imageRenderingCanvas.style.display = 'none';

  var imageDataToRender = this.getInkAsImageData();
  imageRenderingCanvas.width = imageDataToRender.width;
  imageRenderingCanvas.style.width = imageDataToRender.width + 'px';
  imageRenderingCanvas.height = imageDataToRender.height;
  imageRenderingCanvas.style.height = imageDataToRender.height + 'px';
  var ctx = imageRenderingCanvas.getContext('2d');
  ctx.putImageData(imageDataToRender, 0, 0);
  return imageRenderingCanvas.toDataURL("image/png");
};
