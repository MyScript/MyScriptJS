import * as StrokeComponent from '../../../model/StrokeComponent';
import { computeLinksPoints, computeMiddlePoint, computeAxeAngle } from '../../QuadraticUtils';

/**
 * Stroker info
 * @typedef {Object} StrokerInfo
 * @property {String} type Renderer type.
 * @property {String} name Stroker name.
 * @property {String} apiVersion Supported api version.
 */

/**
 * Define how a stroke should be drawn
 * @typedef {Object} Stroker
 * @property {function(): StrokerInfo} getInfo Get some information about this stroker
 * @property {function(context: Object, stroke: Stroke)} drawStroke Render a stroke on the current context.
 */

/**
 * Get info
 * @return {StrokerInfo} Information about this stroker
 */
export function getInfo() {
  return {
    type: 'canvas',
    name: 'quadratic',
    apiVersion: 'V3'
  };
}

function renderArc(context, center, radius) {
  context.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
}

function renderLine(context, begin, end, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

  context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
  context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
}

function renderFinal(context, begin, end, width) {
  const ARCSPLIT = 6;
  const angle = computeAxeAngle(begin, end);
  const linkPoints = computeLinksPoints(end, angle, width);
  context.moveTo(linkPoints[0].x, linkPoints[0].y);
  for (let i = 1; i <= ARCSPLIT; i++) {
    const newAngle = angle - ((i * Math.PI) / ARCSPLIT);
    context.lineTo(end.x - ((end.p * width) * Math.sin(newAngle)), end.y + (end.p * width * Math.cos(newAngle)));
  }
}

function renderQuadratic(context, begin, end, ctrl, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
  const linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

  context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
  context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
  context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
  context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
}

/**
 * Draw a stroke on a canvas, using quadratics
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Current stroke to be drawn
 */
export function drawStroke(context, stroke) {
  const contextReference = context;
  const length = stroke.x.length;
  const width = stroke.width > 0 ? stroke.width : contextReference.lineWidth;
  const color = stroke.color ? stroke.color : contextReference.strokeStyle;
  const firstPoint = StrokeComponent.getPointByIndex(stroke, 0);
  const nbquadratics = length - 2;

  contextReference.save();
  try {
    contextReference.beginPath();
    if (length < 3) {
      renderArc(contextReference, firstPoint, width * 0.6);
    } else {
      renderArc(contextReference, firstPoint, width * firstPoint.p);
      renderLine(contextReference, firstPoint, computeMiddlePoint(firstPoint, StrokeComponent.getPointByIndex(stroke, 1)), width);

      // Possibility to try this (the start looks better when the ink is large)
      // var first = computeMiddlePoint(stroke[0], stroke[1]);
      // contextReference.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

      for (let i = 0; i < nbquadratics; i++) {
        renderQuadratic(contextReference, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i), StrokeComponent.getPointByIndex(stroke, i + 1)), computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i + 1), StrokeComponent.getPointByIndex(stroke, i + 2)), StrokeComponent.getPointByIndex(stroke, i + 1), width);
      }
      renderLine(contextReference, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1)), StrokeComponent.getPointByIndex(stroke, length - 1), width);
      renderFinal(contextReference, StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1), width);
    }
    contextReference.closePath();
    if (color !== undefined) {
      contextReference.fillStyle = color;
      contextReference.fill();
    }
  } finally {
    contextReference.restore();
  }
}
