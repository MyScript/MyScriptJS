import * as StrokeComponent from '../../../model/StrokeComponent';
import { computeLinksPoints, computeMiddlePoint, computeAxeAngle } from '../../QuadraticUtils';

/**
 * Get info
 * @return {StrokerInfo} Information about this stroker
 */
export function getInfo() {
  return {
    type: 'svg',
    name: 'quadratic',
    apiVersion: 'V4'
  };
}

function renderArc(context, center, radius) {
  const svgPath = [
    `M ${center.x},${center.y}`,
    `m ${-radius},0`,
    `a ${radius},${radius} 0 1 0 ${radius * 2},0`,
    `a ${radius},${radius} 0 1 0 ${-(radius * 2)},0`
  ].join(' ');
  return svgPath;
}

function renderLine(context, begin, end, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

  const svgPath = [
    `M ${linkPoints1[0].x},${linkPoints1[0].y}`,
    `L ${linkPoints2[0].x},${linkPoints2[0].y}`,
    `L ${linkPoints2[1].x},${linkPoints2[1].y}`,
    `L ${linkPoints1[1].x},${linkPoints1[1].y}`
  ].join(' ');
  return svgPath;
}

function renderFinal(context, begin, end, width) {
  const ARCSPLIT = 6;
  const angle = computeAxeAngle(begin, end);
  const linkPoints = computeLinksPoints(end, angle, width);

  const parts = [`M ${linkPoints[0].x},${linkPoints[0].y}`];
  for (let i = 1; i <= ARCSPLIT; i++) {
    const newAngle = angle - (i * (Math.PI / ARCSPLIT));
    parts.push(`L ${end.x - (end.p * width * Math.sin(newAngle))},${end.y + (end.p * width * Math.cos(newAngle))}`);
  }
  const svgPath = parts.join(' ');
  return svgPath;
}

function renderQuadratic(context, begin, end, ctrl, width) {
  const linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
  const linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
  const linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

  const svgPath = [
    `M ${linkPoints1[0].x},${linkPoints1[0].y}`,
    `Q ${linkPoints3[0].x},${linkPoints3[0].y} ${linkPoints2[0].x},${linkPoints2[0].y}`,
    `L ${linkPoints2[1].x},${linkPoints2[1].y}`,
    `Q ${linkPoints3[1].x},${linkPoints3[1].y} ${linkPoints1[1].x},${linkPoints1[1].y}`
  ].join(' ');
  return svgPath;
}

/**
 * Draw a stroke on a svg tag, using quadratics
 * @param {Object} context Current rendering context
 * @param {Stroke} stroke Current stroke to be drawn
 */
export function drawStroke(context, stroke) {
  const length = stroke.x.length;
  const width = stroke.width;
  const firstPoint = StrokeComponent.getPointByIndex(stroke, 0);
  const nbquadratics = length - 2;

  const parts = [];
  if (length < 3) {
    parts.push(renderArc(context, firstPoint, width * 0.6));
  } else {
    parts.push(renderArc(context, firstPoint, width * firstPoint.p));
    parts.push(renderLine(context, firstPoint, computeMiddlePoint(firstPoint, StrokeComponent.getPointByIndex(stroke, 1)), width));

    for (let i = 0; i < nbquadratics; i++) {
      parts.push(renderQuadratic(context, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i), StrokeComponent.getPointByIndex(stroke, i + 1)), computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i + 1), StrokeComponent.getPointByIndex(stroke, i + 2)), StrokeComponent.getPointByIndex(stroke, i + 1), width));
    }
    parts.push(renderLine(context, computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1)), StrokeComponent.getPointByIndex(stroke, length - 1), width));
    parts.push(renderFinal(context, StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1), width));
  }
  const svgPath = parts.join(' ');

  context
      .attr('color', stroke.color)
      .style('fill', stroke.color)
      .style('stroke', 'transparent')
      .classed('pending-stroke', true)
      .attr('d', `${svgPath}Z`);
}
