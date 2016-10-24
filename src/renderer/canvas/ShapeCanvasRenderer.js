import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import * as StrokeComponent from '../../model/StrokeComponent';

export const ShapeSymbols = {
  ellipse: 'ellipse',
  line: 'line'
};

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

function drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context) {
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

function drawArrowHead(headPoint, angle, length, context) {
  const alpha = phi((angle + Math.PI) - (Math.PI / 8));
  const beta = phi(angle - (Math.PI + (Math.PI / 8)));

  context.save();
  try {
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

function drawShapeEllipse(shapeEllipse, context) {
  const points = drawEllipseArc(
      shapeEllipse.center,
      shapeEllipse.maxRadius,
      shapeEllipse.minRadius,
      shapeEllipse.orientation,
      shapeEllipse.startAngle,
      shapeEllipse.sweepAngle,
      context);

  if (shapeEllipse.beginDecoration && shapeEllipse.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(points[0], shapeEllipse.beginTangentAngle, 12.0, context);
  }
  if (shapeEllipse.endDecoration && shapeEllipse.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(points[1], shapeEllipse.endTangentAngle, 12.0, context);
  }
}

export function drawLine(p1, p2, context) {
  context.save();
  try {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
  } finally {
    context.restore();
  }
}

function drawShapeLine(shapeLine, context) {
  drawLine(shapeLine.firstPoint, shapeLine.lastPoint, context);
  if (shapeLine.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(shapeLine.firstPoint, shapeLine.beginTangentAngle, 12.0, context);
  }
  if (shapeLine.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(shapeLine.lastPoint, shapeLine.endTangentAngle, 12.0, context);
  }
}

export function drawShapePrimitive(primitive, context) {
  logger.debug(`draw ${primitive.type} shape primitive`);
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = primitive.width;
    contextReference.strokeStyle = primitive.color;

    switch (primitive.type) {
      case ShapeSymbols.ellipse:
        drawShapeEllipse(primitive, contextReference);
        break;
      case ShapeSymbols.line:
        drawShapeLine(primitive, contextReference);
        break;
      default:
        logger.error(`${primitive.type} not implemented`);
    }
  } finally {
    contextReference.restore();
  }
}

function drawShapeNotRecognized(components, inkRanges, context) {
  drawShapePrimitive(extractComponents(components, inkRanges), context);
}

function drawShapeRecognized(shapeRecognized, context) {
  drawShapePrimitive(shapeRecognized.primitives, context);
}

function drawShapeSegment(components, segment, context) {
  const candidate = segment.candidates[segment.selectedCandidateIndex];
  switch (candidate.type) {
    case 'recognizedShape':
      return drawShapeRecognized(candidate, context);
    case 'notRecognized':
      return drawShapeNotRecognized(components, segment.inkRanges, context);
    default:
      throw new Error(`Shape ${candidate.type} candidate not implemented`);
  }
}

export function drawShapes(components, shapes, context) {
  for (let i = 0; i < shapes.length; i++) {
    drawShapeSegment(components, shapes[i], context);
  }
}

export function drawTables(components, tables, context) {
  for (let i = 0; i < tables.length; i++) {
    for (let j = 0; j < tables[i].lines.length; j++) {
      const data = tables[i].lines[j].data;
      drawLine(data.p1, data.p2, context);
    }
  }
}
