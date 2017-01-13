import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';

/**
 * Extract recognized symbols from recognition output
 * @param {Model} model Current model
 * @param {Object} shape Shape recognition output
 * @return {Array<Object>} Recognized symbols
 */
export function extractSymbols(model, shape) {
  let symbols = [];
  const strokes = model.rawStrokes.slice();
  if (shape.candidates && shape.candidates.length > 0) {
    const selectedCandidate = shape.candidates[shape.selectedCandidateIndex];
    const matchingStrokes = [];
    shape.inkRanges.forEach((inkRange) => {
      strokes.slice(inkRange.firstStroke, inkRange.lastStroke + 1)
          .forEach((stroke, i) => {
            const start = (i === inkRange.firstStroke) ? inkRange.firstPoint : 0;
            const end = (i === inkRange.lastStroke) ? inkRange.lastPoint + 1 : stroke.x.length;
            matchingStrokes.push(StrokeComponent.slice(stroke, start, end));
          });
    });

    if (selectedCandidate.type === 'notRecognized') {
      // Flagging strokes recognized as notRecognized
      symbols = symbols.concat(matchingStrokes);
    } else if (selectedCandidate.type === 'erased') {
      // Flagging strokes recognized as toBeRemove
    } else {
      symbols = symbols.concat(selectedCandidate.primitives);
      // Apply first stroke rendering params
      if (matchingStrokes.length > 0) {
        symbols.forEach((symbol) => {
          const symbolReference = symbol;
          const stroke = matchingStrokes[0];
          symbolReference.color = stroke.color;
          symbolReference.width = stroke.width;
        });
      }
    }
  }
  return symbols;
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function processRenderingResult(model) {
  const mutatedModel = model;
  let recognizedComponents = [];
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result && mutatedModel.rawResult.result.segments) {
    mutatedModel.rawResult.result.segments.forEach((segment) => {
      recognizedComponents = recognizedComponents.concat(extractSymbols(model, segment));
    });
  }
  mutatedModel.recognizedSymbols.forEach((symbol, index) => {
    recognizedComponents[index] = Object.assign({}, symbol, recognizedComponents[index]);
  });
  mutatedModel.recognizedSymbols = recognizedComponents;
  logger.debug('Building the rendering model', mutatedModel);
  return mutatedModel;
}
