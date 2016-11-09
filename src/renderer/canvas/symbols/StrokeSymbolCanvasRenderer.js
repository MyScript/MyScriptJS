import { rendererLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';
import * as InkModel from '../../../model/InkModel';

export function drawCurrentStroke(renderStructure, model, stroker) {
  // Render the current stroke
  renderStructure.capturingCanvasContext.clearRect(0, 0, renderStructure.capturingCanvas.width, renderStructure.capturingCanvas.height);
  logger.debug('drawing current stroke ', model.currentStroke, StrokeComponent.getLength(model.currentStroke));
  if (model.currentStroke && StrokeComponent.getLength(model.currentStroke) > 0) {
    stroker.renderStroke(renderStructure.capturingCanvasContext, model.currentStroke);
  }
}

/**
 * Update the render structure with the model
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function drawRawRecognizedStrokes(renderStructure, model, stroker) {
  logger.debug('Drawing raw recognized strokes');

  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };

  model.rawRecognizedStrokes.forEach(drawStroke);
}

/**
 * Update the render structure with the model
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function drawPendingStrokes(renderStructure, model, stroker) {
  logger.debug('Drawing pending strokes');
  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };
  InkModel.extractPendingStrokes(model).forEach(drawStroke);
}
