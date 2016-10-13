import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';

function computeLinksPoints(point, angle, width) {
  const radius = point.p * width;
  return [
    { x: (point.x - (Math.sin(angle) * radius)),
      y: (point.y + (Math.cos(angle) * radius)) },
    { x: (point.x + (Math.sin(angle) * radius)),
      y: (point.y - (Math.cos(angle) * radius))
    }
  ];
}

function computeMiddlePoint(point1, point2) {
  return {
    x: ((point2.x + point1.x) / 2),
    y: ((point2.y + point1.y) / 2),
    p: ((point2.p + point1.p) / 2)
  };
}

function computeAxeAngle(begin, end) {
  return Math.atan2(end.y - begin.y, end.x - begin.x);
}

function fill(context, color) {
  if (color !== undefined) {
    // We are dealing with browser objects there
    // eslint-disable-next-line no-param-reassign
    context.fillStyle = color;
    context.fill();
  }
}

function renderLine(canvasContext, begin, end, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

  canvasContext.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  canvasContext.lineTo(linkPoints2[0].x, linkPoints2[0].y);
  canvasContext.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  canvasContext.lineTo(linkPoints1[1].x, linkPoints1[1].y);
}

function renderFinal(canvasContext, begin, end, width) {
  const ARCSPLIT = 6;
  const angle = computeAxeAngle(begin, end);
  const linkPoints = computeLinksPoints(end, angle, width);
  canvasContext.moveTo(linkPoints[0].x, linkPoints[0].y);
  for (let i = 1; i <= ARCSPLIT; i++) {
    const newAngle = angle - ((i * Math.PI) / ARCSPLIT);
    canvasContext.lineTo(end.x - ((end.p * width) * Math.sin(newAngle)), end.y + (end.p * width * Math.cos(newAngle)));
  }
}

function renderQuadratic(canvasContext, begin, end, ctrl, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
  const linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

  canvasContext.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  canvasContext.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
  canvasContext.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  canvasContext.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
}

/**
 *
 * @param stroke
 * @param canvasContext
 * @param stroke
 * @private
 */
export function renderStroke(canvasContext, stroke) {
  canvasContext.beginPath();
  const length = StrokeComponent.getLength(stroke);
  // FIXME this should be a parameter
  const width = stroke.width && stroke.width > 0 ? stroke.width : 3;
  const color = stroke.color ? stroke.color : 'black';
  const firstPoint = StrokeComponent.getPointByIndex(stroke, 0);
  if (length < 3) {
    canvasContext.arc(firstPoint.x, firstPoint.y, width * 0.6, 0, Math.PI * 2, true);
  } else {
    canvasContext.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
    renderLine(canvasContext, firstPoint, computeMiddlePoint(firstPoint, StrokeComponent.getPointByIndex(stroke, 1)), width);

    // Possibility to try this (the start looks better when the ink is large)
    // var first = computeMiddlePoint(stroke[0], stroke[1]);
    // context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

    const nbquadratics = length - 2;
    for (let i = 0; i < nbquadratics; i++) {
      renderQuadratic(canvasContext, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i), StrokeComponent.getPointByIndex(stroke, i + 1)), computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i + 1), StrokeComponent.getPointByIndex(stroke, i + 2)), StrokeComponent.getPointByIndex(stroke, i + 1), width);
    }
    renderLine(canvasContext, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1)), StrokeComponent.getPointByIndex(stroke, length - 1), width);
    renderFinal(canvasContext, StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1), width);
  }
  canvasContext.closePath();
  fill(canvasContext, color);
}
