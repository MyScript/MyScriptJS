import { rendererLogger as logger } from '../../configuration/LoggerConfig';
import * as StrokeComponent from '../../model/StrokeComponent';

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
export function drawRecognizedStrokes(renderStructure, model, stroker) {
  logger.debug('Drawing recognized strokes');

  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };

  if (model.recognizedComponents && model.recognizedComponents.strokeList) {
    model.recognizedComponents.strokeList.forEach(drawStroke);
  } else {
    model.recognizedStrokes.forEach(drawStroke);
  }
}

/**
 * Update the render structure with the model
 * @param renderStructure
 * @param model
 * @param stroker
 */
export function drawPendingStrokes(renderStructure, model, stroker) {
  logger.debug('Drawing pending strokes', model.pendingStrokes);

  const drawStroke = (stroke) => {
    stroker.renderStroke(renderStructure.renderingCanvasContext, stroke);
  };

  Object.keys(model.pendingStrokes).forEach((strokeId) => {
    if (model.pendingStrokes[strokeId] !== undefined) {
      model.pendingStrokes[strokeId].forEach(drawStroke);
    }
  });
}
