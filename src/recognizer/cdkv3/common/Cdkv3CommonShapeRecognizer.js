import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';

/**
 * Extract recognized symbols from recognition output
 * @param {Model} model Current model
 * @param {Object} segment Shape recognition output
 * @return {Array<Object>} Recognized symbols
 */
export function extractSymbols(model, segment) {
  if (segment.candidates && segment.candidates.length > 0) {
    // Apply first stroke rendering params
    const style = {
      color: InkModel.extractPendingStrokes(model)[0].color,
      width: InkModel.extractPendingStrokes(model)[0].width
    };

    let strokes = [];
    if (segment.inkRanges && segment.inkRanges.length > 0) {
      strokes = segment.inkRanges
          .map(inkRange => InkModel.extractStrokesFromInkRange(model, inkRange.firstStroke, inkRange.lastStroke, inkRange.firstPoint, inkRange.lastPoint))
          .reduce((a, b) => a.concat(b));
      if (strokes.length > 0) {
        style.color = strokes[0].color;
        style.width = strokes[0].width;
      }
    }

    Object.assign(segment, style);

    const selectedCandidate = segment.candidates[segment.selectedCandidateIndex];
    switch (selectedCandidate.type) {
      case 'notRecognized':
        return strokes;
      case 'recognizedShape':
        return selectedCandidate.primitives.map(primitive => Object.assign(primitive, style));
      default:
        return [];
    }
  }
  return [];
}

function extractRecognizedSymbolsFromShapeResult(model) {
  const result = model.rawResult.result;
  if (result && result.segments) {
    return result.segments
        .map(segment => extractSymbols(model, segment))
        .reduce((a, b) => a.concat(b));
  }
  return [];
}

/**
 * Enrich the model with recognized symbols
 * @param {Model} model Current model
 * @return {Model} Updated model
 */
export function processRenderingResult(model) {
  const modelReference = model;
  logger.debug('Building the rendering model', modelReference);
  modelReference.recognizedSymbols = extractRecognizedSymbolsFromShapeResult(model);
  return modelReference;
}
