import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as StrokeComponent from '../../../model/StrokeComponent';

/**
 * @param shape
 * @param {Array<Stroke>} strokes
 * @return {Array}
 */
export function extractSymbols(shape, strokes) {
  let symbols = [];
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
 * @param {Model} model
 * @return {Model}
 */
export function generateRenderingResult(model) {
  const mutatedModel = model;
  let recognizedComponents = [];
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.pendingStrokes.slice();
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result && mutatedModel.rawResult.result.segments) {
    mutatedModel.rawResult.result.segments.forEach((segment) => {
      recognizedComponents = recognizedComponents.concat(extractSymbols(segment, potentialStrokeList));
    });
  }
  mutatedModel.recognizedSymbols.forEach((symbol, index) => {
    recognizedComponents[index] = Object.assign({}, symbol, recognizedComponents[index]);
  });
  mutatedModel.recognizedSymbols = recognizedComponents;
  logger.debug('Building the rendering model', mutatedModel);
  return mutatedModel;
}
