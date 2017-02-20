/**
 * Draw a stroke symbol
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Stroke to be drawn
 * @param {Stroker} stroker Stroker to use to render a stroke
 */
export function drawStroke(context, stroke, stroker) {
  if (stroker) {
    stroker.drawStroke(context, stroke);
  }
}
