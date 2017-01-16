import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import { drawStroke } from './StrokeSymbolCanvasRenderer';
import * as InkModel from '../../../model/InkModel';

/**
 * @type {{inputCharacter: String, char: String, string: String, textLine: String}}
 */
export const MathSymbols = {
  nonTerminalNode: 'nonTerminalNode',
  terminalNode: 'terminalNode',
  rule: 'rule'
};

function drawTerminalNode(context, terminalNode, model, stroker) {
  terminalNode.inkRanges.forEach((inkRange) => {
    InkModel.extractStrokesFromInkRange(model, inkRange.component, inkRange.component, inkRange.firstItem, inkRange.lastItem)
        .forEach(stroke => drawStroke(context, stroke, stroker));
  });
}

/**
 * Draw a math symbol
 * @param {Object} context Current rendering context
 * @param {Object} symbol Symbol to draw
 * @param {Model} model Current model
 * @param {Stroker} stroker Stroker to use to render a stroke
 */
export function drawMathSymbol(context, symbol, model, stroker) {
  logger.debug(`draw ${symbol.type} text input`);
  const contextReference = context;
  contextReference.save();
  try {
    contextReference.lineWidth = symbol.width;
    contextReference.strokeStyle = symbol.color;

    switch (symbol.type) {
      case MathSymbols.nonTerminalNode:
        drawMathSymbol(contextReference, symbol.candidates[symbol.selectedCandidate], model, stroker);
        break;
      case MathSymbols.terminalNode:
        drawTerminalNode(contextReference, symbol, model, stroker);
        break;
      case MathSymbols.rule:
        symbol.children.forEach(child => drawMathSymbol(contextReference, child, model, stroker));
        break;
      default:
        logger.error(`${symbol.type} not implemented`);
    }
  } finally {
    contextReference.restore();
  }
}
