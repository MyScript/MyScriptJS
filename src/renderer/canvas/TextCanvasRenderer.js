import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawLine } from './ShapeCanvasRenderer';

export const TextSymbols = {
  inputCharacter: 'inputCharacter',
  char: 'char',
  string: 'string'
};

export function drawTextPrimitive(component) {
  logger.debug('draw ' + component.type + ' text input', component);
  switch (component.type) {
    default:
      logger.error(component.type + 'not implemented', component);
  }
}

function populateTextLineData(textLineData) {
  /* eslint-disable no-param-reassign */
  textLineData.boundingBox = {
    x: textLineData.topLeftPoint.x,
    y: textLineData.topLeftPoint.y,
    width: textLineData.width,
    height: textLineData.height
  };
  /* eslint-enable no-param-reassign */
  return textLineData;
}

function drawUnderline(boundingBox, underline, label, textHeight, baseline, context) {
  const topLeft = { x: boundingBox.x, y: boundingBox.y };
  const firstCharacter = underline.data.firstCharacter;
  const lastCharacter = underline.data.lastCharacter;

  /* eslint-disable no-param-reassign */
  context.font = textHeight + 'px serif';
  /* eslint-enable no-param-reassign */

  let textMetrics = context.measureText(label.substring(0, firstCharacter));
  const x1 = topLeft.x + textMetrics.width;

  textMetrics = context.measureText(label.substring(firstCharacter, lastCharacter + 1));
  const x2 = x1 + textMetrics.width;
  drawLine({ x: x1, y: baseline }, { x: x2, y: baseline }, context);
}

function drawText(boundingBox, textLineResult, justificationType, textHeight, baseline, context) {
  context.save();
  try {
    /* eslint-disable no-param-reassign */
    context.font = textHeight + 'px serif';
    context.textAlign = (justificationType === 'CENTER') ? 'center' : 'left';
    /* eslint-enable no-param-reassign */

    const index = textLineResult.textSegmentResult.selectedCandidateIdx;
    context.fillText(textLineResult.textSegmentResult.candidates[index].label, boundingBox.x, baseline);
  } finally {
    context.restore();
  }
}

export function drawTextLine(textLine, context) {
  const data = populateTextLineData(textLine.data);

  if (data) {
    drawText(data.boundingBox, textLine.result, data.justificationType, data.textHeight, data.baselinePos, context);

    const index = textLine.result.textSegmentResult.selectedCandidateIdx;
    const label = textLine.result.textSegmentResult.candidates[index].label;
    const underlines = textLine.underlineList;
    for (let j = 0; j < underlines.length; j++) {
      drawUnderline(data.boundingBox, underlines[j], label, data.textHeight, data.baselinePos + (data.textHeight / 10), context);
    }
  }
}
