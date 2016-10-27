import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import { drawRawRecognizedStrokes, drawPendingStrokes } from './symbols/StrokeSymbolCanvasRenderer';
import { drawTextPrimitive, TextSymbols } from './symbols/TextSymbolCanvasRenderer';
import { drawShapePrimitive, ShapeSymbols } from './symbols/ShapeSymbolCanvasRenderer';
import { drawMusicPrimitive, MusicSymbols } from './symbols/MusicSymbolCanvasRenderer';
import { drawMathPrimitive, MathSymbols } from './symbols/MathSymbolCanvasRenderer';
import * as InkModel from '../../model/InkModel';

export * from './symbols/StrokeSymbolCanvasRenderer';

function createCanvas(borderCoordinates, margin = 10) {
  // eslint-disable-next-line no-undef
  const browserDocument = document;
  const canvas = browserDocument.createElement('canvas');
  canvas.width = Math.abs(borderCoordinates.maxX - borderCoordinates.minX) + (2 * margin);
  canvas.style.width = canvas.width + 'px';
  canvas.height = Math.abs(borderCoordinates.maxY - borderCoordinates.minY) + (2 * margin);
  canvas.style.height = canvas.height + 'px';
  return canvas;
}

// TODO: find a way to factorize DefaultCanvasRenderer.drawModel
function drawModel(renderStructure, model, stroker) {
  // clear(renderStructure);

  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };

  const drawSymbol = (symbol) => {
    logger.debug(`Attempting to draw ${symbol.type} symbol`);
    if (symbol.type === 'stroke') {
      drawStroke(symbol);
    }
    if (TextSymbols[symbol.type]) {
      drawTextPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (ShapeSymbols[symbol.type]) {
      drawShapePrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (MathSymbols[symbol.type]) {
      drawMathPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
    if (MusicSymbols[symbol.type]) {
      drawMusicPrimitive(symbol, renderStructure.renderingCanvasContext);
    }
  };

  // Displaying the default symbols
  if (model.defaultSymbols && model.defaultSymbols.length > 0) {
    model.defaultSymbols.forEach(drawSymbol);
  }
  // Displaying the pending strokes
  drawPendingStrokes(renderStructure, model, stroker);
  // Displaying the symbols
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    model.recognizedSymbols.forEach(drawSymbol);
  } else {
    drawRawRecognizedStrokes(renderStructure, model, stroker);
  }
}

export function getImage(model, stroker, margin = 10) {
  const borderCoordinates = InkModel.getBorderCoordinates(model);
  const renderingCanvas = createCanvas(borderCoordinates, margin);
  const renderStructure = {
    renderingCanvas,
    renderingCanvasContext: renderingCanvas.getContext('2d')
  };
  // Change canvas origin
  renderStructure.renderingCanvasContext.translate(-borderCoordinates.minX, -borderCoordinates.minY);
  drawModel(renderStructure, model, stroker);
  return renderStructure.renderingCanvas.toDataURL('image/png');
}
