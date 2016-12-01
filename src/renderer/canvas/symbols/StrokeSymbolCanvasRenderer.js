import * as StrokeComponent from '../../../model/StrokeComponent';

export function drawStroke(stroke, context, stroker) {
  if (stroke && StrokeComponent.getLength(stroke) > 0) {
    stroker.drawStroke(context, stroke);
  }
}
