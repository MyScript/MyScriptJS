import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import * as StrokeComponent from '../../model/StrokeComponent';

function phi(angle) {
  let returnedAngle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (returnedAngle < -Math.PI) {
    returnedAngle += Math.PI * 2;
  }
  return returnedAngle;
}

function extractComponents(components, inkRanges) {
  const result = [];

  for (let i = 0; i < inkRanges.length; i++) {
    const inkRange = inkRanges[i];

    const firstPointIndex = Math.floor(inkRange.firstPoint);
    const lastPointIndex = Math.ceil(inkRange.lastPoint);

    for (let strokeIndex = inkRange.firstStroke; strokeIndex <= inkRange.lastStroke; strokeIndex++) {
      const currentStroke = components[strokeIndex];
      const currentStrokePointCount = currentStroke.getX().length;

      const newStroke = StrokeComponent.createStrokeComponent();
      newStroke.color = currentStroke.color;
      newStroke.width = currentStroke.width;

      for (let pointIndex = firstPointIndex; (strokeIndex === inkRange.lastStroke && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.lastStroke && pointIndex < currentStrokePointCount); pointIndex++) {
        newStroke.addPoint(currentStroke.x[pointIndex], currentStroke.y[pointIndex], currentStroke.t[pointIndex]);
      }
      result.push(newStroke);
    }
  }
  return result;
}

function drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {
  const angleStep = 0.02; // angle delta between interpolated

  let z1 = Math.cos(orientation);
  let z3 = Math.sin(orientation);
  let z2 = z1;
  let z4 = z3;
  z1 *= maxRadius;
  z2 *= minRadius;
  z3 *= maxRadius;
  z4 *= minRadius;

  const n = Math.floor(Math.abs(sweepAngle) / angleStep);

  const boundariesPoints = [];

  context.save();
  try {
    /* eslint-disable no-param-reassign */
    context.fillStyle = parameters.fillStyle;
    context.strokeStyle = parameters.strokeStyle;
    context.lineWidth = parameters.lineWidth;
    /* eslint-enable no-param-reassign */

    context.beginPath();

    for (let i = 0; i <= n; i++) {
      const angle = startAngle + ((i / n) * sweepAngle); // points on the arc, in radian
      const alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

      const cosAlpha = Math.cos(alpha);
      const sinAlpha = Math.sin(alpha);

      // current point
      const x = (centerPoint.x + (z1 * cosAlpha)) - (z4 * sinAlpha);
      const y = (centerPoint.y + (z2 * sinAlpha)) + (z3 * cosAlpha);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }

      if (i === 0 || i === n) {
        boundariesPoints.push({ x, y });
      }
    }

    context.stroke();
  } finally {
    context.restore();
  }

  return boundariesPoints;
}


function drawArrowHead(headPoint, angle, length, context, parameters) {
  const alpha = phi((angle + Math.PI) - (Math.PI / 8));
  const beta = phi(angle - (Math.PI + (Math.PI / 8)));

  context.save();
  try {
    /* eslint-disable no-param-reassign */
    context.fillStyle = parameters.fillStyle;
    context.strokeStyle = parameters.fillStyle;
    context.lineWidth = parameters.lineWidth;
    /* eslint-enable no-param-reassign */

    context.moveTo(headPoint.x, headPoint.y);
    context.beginPath();
    context.lineTo(headPoint.x + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
    context.lineTo(headPoint.x + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
    context.lineTo(headPoint.x, headPoint.y);
    context.fill();
  } finally {
    context.restore();
  }
}

function drawShapeEllipse(shapeEllipse, context, parameters) {
  const points = drawEllipseArc(
      shapeEllipse.center,
      shapeEllipse.maxRadius,
      shapeEllipse.minRadius,
      shapeEllipse.orientation,
      shapeEllipse.startAngle,
      shapeEllipse.sweepAngle,
      context, parameters);

  if (shapeEllipse.beginDecoration && shapeEllipse.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(points[0], shapeEllipse.beginTangentAngle, 12.0, context, parameters);
  }
  if (shapeEllipse.endDecoration && shapeEllipse.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(points[1], shapeEllipse.endTangentAngle, 12.0, context, parameters);
  }
}

export function drawLine(p1, p2, context, parameters) {
  context.save();
  try {
    /* eslint-disable no-param-reassign */
    context.fillStyle = parameters.fillStyle;
    context.strokeStyle = parameters.strokeStyle;
    context.lineWidth = parameters.lineWidth;
    /* eslint-enable no-param-reassign */

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
  } finally {
    context.restore();
  }
}

function drawShapeLine(shapeLine, context, parameters) {
  drawLine(shapeLine.firstPoint, shapeLine.lastPoint, context, parameters);
  if (shapeLine.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(shapeLine.firstPoint, shapeLine.beginTangentAngle, 12.0, context, parameters);
  }
  if (shapeLine.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(shapeLine.lastPoint, shapeLine.endTangentAngle, 12.0, context, parameters);
  }
}

export function drawShapePrimitive(primitive, context, parameters) {
  switch (primitive.type) {
    case 'ellipse':
      drawShapeEllipse(primitive, context, parameters);
      break;
    case 'line':
      drawShapeLine(primitive, context, parameters);
      break;
    default:
      logger.error(primitive.type + 'not implemented', primitive);
      break;
  }
}

function drawShapeNotRecognized(components, inkRanges, context, parameters) {
  drawShapePrimitive(extractComponents(components, inkRanges), context, parameters);
}

function drawShapeRecognized(shapeRecognized, context, parameters) {
  drawShapePrimitive(shapeRecognized.primitives, context, parameters);
}

function drawShapeSegment(components, segment, context, parameters) {
  const candidate = segment.candidates[segment.selectedCandidateIndex];
  switch (candidate.type) {
    case 'recognizedShape':
      return drawShapeRecognized(candidate, context, parameters);
    case 'notRecognized':
      return drawShapeNotRecognized(components, segment.inkRanges, context, parameters);
    default:
      throw new Error('Shape candidate not implemented: ' + candidate.type);
  }
}

export function drawShapes(components, shapes, context, parameters) {
  for (let i = 0; i < shapes.length; i++) {
    drawShapeSegment(components, shapes[i], context, parameters);
  }
}

export function drawTables(components, tables, context, parameters) {
  for (let i = 0; i < tables.length; i++) {
    for (let j = 0; j < tables[i].lines.length; j++) {
      const data = tables[i].lines[j].data;
      drawLine(data.p1, data.p2, context, parameters);
    }
  }
}
