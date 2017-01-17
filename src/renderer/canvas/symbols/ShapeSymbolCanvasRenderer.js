import { rendererLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * @type {{table: String, shape: String, recognizedShape: String, ellipse: String, line: String}}
 */
export const ShapeSymbols = {
  table: 'table',
  shape: 'shape',
  recognizedShape: 'recognizedShape',
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

function drawEllipseArc(context, centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle) {
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

function drawArrowHead(context, headPoint, angle, length) {
  const alpha = phi(angle + (Math.PI * (7 / 8)));
  const beta = phi(angle - (Math.PI * (7 / 8)));

  const contextReference = context;
  contextReference.save();
  try {
    contextReference.fillStyle = contextReference.strokeStyle;

    contextReference.moveTo(headPoint.x, headPoint.y);
    contextReference.beginPath();
    contextReference.lineTo(headPoint.x + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
    contextReference.lineTo(headPoint.x + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
    contextReference.lineTo(headPoint.x, headPoint.y);
    contextReference.fill();
  } finally {
    contextReference.restore();
  }
}

function drawShapeEllipse(context, shapeEllipse) {
  const points = drawEllipseArc(
      context,
      shapeEllipse.center,
      shapeEllipse.maxRadius,
      shapeEllipse.minRadius,
      shapeEllipse.orientation,
      shapeEllipse.startAngle,
      shapeEllipse.sweepAngle);

  if (shapeEllipse.beginDecoration && shapeEllipse.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, points[0], shapeEllipse.beginTangentAngle, 12.0);
  }
  if (shapeEllipse.endDecoration && shapeEllipse.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, points[1], shapeEllipse.endTangentAngle, 12.0);
  }
}

/**
 * Draw a line
 * @param {Object} context Current rendering context
 * @param {{x: Number, y: Number}} p1 Origin point
 * @param {{x: Number, y: Number}} p2 Destination point
 */
export function drawLine(context, p1, p2) {
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

function drawShapeLine(context, shapeLine) {
  drawLine(context, shapeLine.firstPoint, shapeLine.lastPoint);
  if (shapeLine.beginDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, shapeLine.firstPoint, shapeLine.beginTangentAngle, 12.0);
  }
  if (shapeLine.endDecoration === 'ARROW_HEAD') {
    drawArrowHead(context, shapeLine.lastPoint, shapeLine.endTangentAngle, 12.0);
  }
}

/**
 * Draw a shape symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
export function drawShapeSymbol(context, symbol) {
  logger.debug(`draw ${symbol.type} symbol`);
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    if (symbol.elementType) {
      switch (symbol.elementType) {
        case ShapeSymbols.shape:
          drawShapeSymbol(contextReference, symbol.candidates[symbol.selectedCandidateIndex]);
          break;
        case ShapeSymbols.table:
          symbol.lines.forEach(line => drawShapeSymbol(contextReference, line));
          break;
        case ShapeSymbols.line:
          drawLine(contextReference, symbol.data.p1, symbol.data.p2);
          break;
        default:
          logger.error(`${symbol.elementType} not implemented`);
          break;
      }
    } else {
      switch (symbol.type) {
        case ShapeSymbols.ellipse:
          drawShapeEllipse(contextReference, symbol);
          break;
        case ShapeSymbols.line:
          drawShapeLine(contextReference, symbol);
          break;
        case ShapeSymbols.recognizedShape:
          symbol.primitives.forEach(primitive => drawShapeSymbol(contextReference, primitive));
          break;
        default:
          logger.error(`${symbol.type} not implemented`);
          break;
      }
    }
  } finally {
    contextReference.restore();
  }
}
