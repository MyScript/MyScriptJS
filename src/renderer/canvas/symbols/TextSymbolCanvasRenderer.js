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

function drawUnderline(context, underline, label, data) {
  const delta = data.width / label.length;
  const p1 = {
    x: data.topLeftPoint.x + (underline.data.firstCharacter * delta),
    y: data.topLeftPoint.y + data.height
  };
  const p2 = {
    x: data.topLeftPoint.x + (underline.data.lastCharacter * delta),
    y: data.topLeftPoint.y + data.height
  };
  drawLine(context, p1, p2);
}

function drawText(context, label, data) {
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.font = `${data.textHeight}px serif`;
    contextReference.textAlign = (data.justificationType === 'CENTER') ? 'center' : 'left';
    contextReference.textBaseline = 'bottom';
    contextReference.fillStyle = contextReference.strokeStyle;
    contextReference.fillText(label, data.topLeftPoint.x, (data.topLeftPoint.y + data.height));
  } finally {
    contextReference.restore();
  }
}

function drawTextLine(context, textLine) {
  drawText(context, textLine.label, textLine.data);
  textLine.underlineList.forEach((underline) => {
    drawUnderline(context, underline, textLine.label, textLine.data);
  });
}

/**
 * Draw a text symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 */
export function drawTextSymbol(context, symbol) {
  logger.debug(`draw ${symbol.type} symbol`);
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    if (symbol.elementType) {
      switch (symbol.elementType) {
        case TextSymbols.textLine:
          drawTextLine(contextReference, symbol);
          break;
        default:
          logger.error(`${symbol.elementType} not implemented`);
          break;
      }
    } else {
      switch (symbol.type) {
        case TextSymbols.textLine:
          drawTextLine(contextReference, symbol);
          break;
        default:
          logger.error(`${symbol.type} not implemented`);
      }
    }
  } finally {
    contextReference.restore();
  }
}
