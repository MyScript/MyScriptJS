import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import * as StrokeComponent from '../../model/StrokeComponent';
import { drawTextPrimitive } from './TextCanvasRenderer';


function phi(angle) {
  let returnedAngle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (returnedAngle < -Math.PI) {
    returnedAngle += Math.PI * 2;
  }
  return returnedAngle;
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
    context.fillStyle = parameters.color;
    context.strokeStyle = parameters.color;
    context.lineWidth = 0.5 * parameters.width;

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
    context.fillStyle = parameters.color;
    context.strokeStyle = parameters.color;
    context.lineWidth = 0.5 * parameters.width;

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

//GOOD
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




function drawShapeNotRecognized(components, inkRanges, context, parameters) {
  drawComponents(_extractComponents(components, inkRanges), context, parameters);
}

function drawShapeRecognized(shapeRecognized, context, parameters) {
  drawComponents(shapeRecognized.primitives, context, parameters);
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

function drawShapes(components, shapes, context, parameters) {
  for (const i in shapes) {
    drawShapeSegment(components, shapes[i], context, parameters);
  }
}




function drawLine(p1, p2, context, parameters) {
  context.save();
  try {
    context.fillStyle = parameters.color;
    context.strokeStyle = parameters.color;
    context.lineWidth = 0.5 * parameters.width;

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


function populateAnalyzerTextLineData(textLineData) {
  textLineData.boundingBox = {
    x: textLineData.topLeftPoint.x,
    y: textLineData.topLeftPoint.y,
    width: textLineData.width,
    height: textLineData.height
  };
  return textLineData;
}


export function drawUnderline(boundingBox, underline, label, textHeight, baseline, context, parameters) {
  const topLeft = { x: boundingBox.x, y: boundingBox.y };
  const firstCharacter = underline.data.firstCharacter;
  const lastCharacter = underline.data.lastCharacter;

  context.font = textHeight + 'px' + ' ' + parameters.font;

  let textMetrics = context.measureText(label.substring(0, firstCharacter));
  const x1 = topLeft.x + textMetrics.width;

  textMetrics = context.measureText(label.substring(firstCharacter, lastCharacter + 1));
  const x2 = x1 + textMetrics.width;
  drawLine({ x: x1, y: baseline }, { x: x2, y: baseline }, context, parameters);
}

export function drawText(boundingBox, textLineResult, justificationType, textHeight, baseline, context, parameters) {
  context.save();
  try {
    context.fillStyle = parameters.color;
    context.strokeStyle = parameters.color;
    context.lineWidth = 0.5 * parameters.width;
    context.font = textHeight + 'px ' + parameters.font;
    context.textAlign = (justificationType === 'CENTER') ? 'center' : 'left';

    const index = textLineResult.textSegmentResult.selectedCandidateIdx;
    context.fillText(textLineResult.textSegmentResult.candidates[index].label, boundingBox.x, baseline);
  } finally {
    context.restore();
  }
}

export function drawShapeTextLine(textLine, context, parameters) {
  const data = populateAnalyzerTextLineData(textLine.data);

  if (data) {
    drawText(data.boundingBox, textLine.result, data.justificationType, data.textHeight, data.baselinePos, context, parameters);

    const index = textLine.result.textSegmentResult.selectedCandidateIdx;
    const label = textLine.result.textSegmentResult.candidates[index].label;
    const underlines = textLine.underlineList;
    for (const j in underlines) {
      drawUnderline(data.boundingBox, underlines[j], label, data.textHeight, data.baselinePos + data.textHeight / 10, context, parameters);
    }
  }
}




export function drawShapePrimitive(primitive, context, parameters) {
  switch (primitive.type) {
    case 'inputCharacter':
      //FIXME This sound not rendere yet
      drawCharacter(primitive, context, parameters);
      break;
    case 'ellipse':
      drawShapeEllipse(primitive, context, parameters);
      break;
    case 'line':
      drawShapeLine(primitive, context, parameters);
      break;
    default:
      logger.error('Could not display primitive type', primitive);
      break;
  }
}