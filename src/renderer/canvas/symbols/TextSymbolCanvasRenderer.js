import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import { drawLine } from './ShapeSymbolCanvasRenderer';

/**
 * @type {{inputCharacter: String, char: String, string: String, textLine: String}}
 */
export const TextSymbols = {
  inputCharacter: 'inputCharacter',
  char: 'char',
  string: 'string',
  textLine: 'textLine'
};

function drawUnderline(underline, label, data, context) {
  const contextReference = context;

  const delta = data.width / label.length;
  const x1 = data.topLeftPoint.x + (underline.data.firstCharacter * delta);
  const x2 = data.topLeftPoint.x + (underline.data.lastCharacter * delta);

  drawLine({ x: x1, y: data.topLeftPoint.y + data.height }, { x: x2, y: data.topLeftPoint.y + data.height }, contextReference);
}

function drawText(label, data, context) {
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.font = data.textHeight + 'px serif';
    contextReference.textAlign = (data.justificationType === 'CENTER') ? 'center' : 'left';
    contextReference.textBaseline = 'bottom';
    contextReference.fillStyle = contextReference.strokeStyle;
    contextReference.fillText(label, data.topLeftPoint.x, (data.topLeftPoint.y + data.height));
  } finally {
    contextReference.restore();
  }
}

function drawTextLine(textLine, context) {
  drawText(textLine.label, textLine.data, context);
  textLine.underlineList.forEach((underline) => {
    drawUnderline(underline, textLine.label, textLine.data, context);
  });
}

/**
 * Draw a text symbol
 * @param {Object} symbol Symbol to draw
 * @param {Object} context Current rendering context
 */
export function drawTextSymbol(symbol, context) {
  logger.debug(`draw ${symbol.type} text input`);
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    switch (symbol.type) {
      case TextSymbols.textLine:
        drawTextLine(symbol, contextReference);
        break;
      default:
        logger.error(`${symbol.type} not implemented`);
    }
  } finally {
    contextReference.restore();
  }
}
