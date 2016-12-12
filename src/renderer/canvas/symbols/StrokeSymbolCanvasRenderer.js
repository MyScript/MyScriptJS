/**
 * Draw a stroke symbol
 * @param {Stroke} stroke Stroke to be drawn
 * @param {Object} context Current rendering context
 * @param {Stroker} stroker Stroker to use to render a stroke
 */
export function drawStroke(stroke, context, stroker) {
  if (stroker) {
    stroker.drawStroke(context, stroke);
  }
}
