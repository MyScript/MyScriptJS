/** ===============================================================================================
 * Compute quadratics control points
 * ============================================================================================= */

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

export function computeMiddlePoint(point1, point2) {
  return {
    x: ((point2.x + point1.x) / 2),
    y: ((point2.y + point1.y) / 2),
    p: ((point2.p + point1.p) / 2)
  };
}

export function computeAxeAngle(begin, end) {
  return Math.atan2(end.y - begin.y, end.x - begin.x);
}
