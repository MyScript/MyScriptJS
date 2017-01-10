/** ===============================================================================================
 * Compute quadratics control points
 * ============================================================================================= */

/**
 *
 * @param {{x: Number, y: Number, p: Number}} point
 * @param angle
 * @param width
 * @return {[{x: Number, y: Number},{x: Number, y: Number}]}
 */
export function computeLinksPoints(point, angle, width) {
  const radius = point.p * width;
  return [{
    x: (point.x - (Math.sin(angle) * radius)),
    y: (point.y + (Math.cos(angle) * radius))
  }, {
    x: (point.x + (Math.sin(angle) * radius)),
    y: (point.y - (Math.cos(angle) * radius))
  }];
}

/**
 *
 * @param {{x: Number, y: Number, p: Number}} point1
 * @param {{x: Number, y: Number, p: Number}} point2
 * @return {{x: Number, y: Number, p: Number}}
 */
export function computeMiddlePoint(point1, point2) {
  return {
    x: ((point2.x + point1.x) / 2),
    y: ((point2.y + point1.y) / 2),
    p: ((point2.p + point1.p) / 2)
  };
}

/**
 *
 * @param {{x: Number, y: Number}} begin
 * @param {{x: Number, y: Number}} end
 * @return {Number}
 */
export function computeAxeAngle(begin, end) {
  return Math.atan2(end.y - begin.y, end.x - begin.x);
}
