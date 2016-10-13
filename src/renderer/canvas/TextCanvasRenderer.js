import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawLine } from './ShapeCanvasRenderer';

export function drawTextPrimitive(component) {
  logger.debug('text rendering on');
  switch (component.type) {
    case 'inputCharacter':
      logger.info('inputCharacter are not yet render');
      break;
    case 'char':
      logger.info('char are not yet render');
      break;
    case 'string':
      logger.info('string are not yet render');
      break;
    default:
      logger.error(component.type + 'not implemented', component);
      break;
  }
}

function populateTextLineData(textLineDataParam) {
  const textLineData = textLineDataParam;
  textLineData.boundingBox = {
    x: textLineData.topLeftPoint.x,
    y: textLineData.topLeftPoint.y,
    width: textLineData.width,
    height: textLineData.height
  };
  return textLineData;
}

function drawUnderline(boundingBox, underline, label, textHeight, baseline, contextParam, parameters) {
  const topLeft = { x: boundingBox.x, y: boundingBox.y };
  const firstCharacter = underline.data.firstCharacter;
  const lastCharacter = underline.data.lastCharacter;

  const context = contextParam;
  context.font = textHeight + 'px ' + parameters.font;

  let textMetrics = context.measureText(label.substring(0, firstCharacter));
  const x1 = topLeft.x + textMetrics.width;

  textMetrics = context.measureText(label.substring(firstCharacter, lastCharacter + 1));
  const x2 = x1 + textMetrics.width;
  drawLine({ x: x1, y: baseline }, { x: x2, y: baseline }, context, parameters);
}

function drawText(boundingBox, textLineResult, justificationType, textHeight, baseline, contextParam, parameters) {
  const context = contextParam;
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

export function drawTextLine(textLine, context, parameters) {
  const data = populateTextLineData(textLine.data);

  if (data) {
    drawText(data.boundingBox, textLine.result, data.justificationType, data.textHeight, data.baselinePos, context, parameters);

    const index = textLine.result.textSegmentResult.selectedCandidateIdx;
    const label = textLine.result.textSegmentResult.candidates[index].label;
    const underlines = textLine.underlineList;
    for (let j = 0; j < underlines.length; j++) {
      drawUnderline(data.boundingBox, underlines[j], label, data.textHeight, data.baselinePos + (data.textHeight / 10), context, parameters);
    }
  }
}
