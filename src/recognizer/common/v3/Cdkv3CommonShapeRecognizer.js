import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import * as InkModel from '../../../model/InkModel';

/**
 * Get style for the strokes matching the ink ranges
 * @param {Model} model
 * @param {Array<Object>} inkRanges
 * @return {{color: String, width: Number}} Style to apply
 */
export function getStyleFromInkRanges(model, inkRanges) {
  let strokes = model.rawStrokes;
  if (inkRanges && (inkRanges.length > 0)) {
    strokes = inkRanges
        .map(inkRange => InkModel.extractStrokesFromInkRange(model, inkRange.stroke ? inkRange.stroke : inkRange.firstStroke, inkRange.stroke ? inkRange.stroke : inkRange.lastStroke, inkRange.firstPoint, inkRange.lastPoint))
        .reduce((a, b) => a.concat(b));
  }
  // FIXME hack to apply the rendering param of the first element' stroke
  return {
    color: strokes[0].color,
    width: strokes[0].width
  };
}

/**
 * Extract recognized symbols from recognition output
 * @param {Model} model Current model
 * @param {Object} segment Shape recognition output
 * @return {Array<Object>} Recognized symbols
 */
export function extractShapeSymbols(model, segment) {
  if (segment.candidates && segment.candidates.length > 0) {
    const selectedCandidate = segment.candidates[segment.selectedCandidateIndex];
    switch (selectedCandidate.type) {
      case 'notRecognized':
        if (segment.inkRanges && segment.inkRanges.length > 0) {
          return segment.inkRanges
              .map(inkRange => InkModel.extractStrokesFromInkRange(model, inkRange.firstStroke, inkRange.lastStroke, inkRange.firstPoint, inkRange.lastPoint))
              .reduce((a, b) => a.concat(b));
        }
        return [];
      case 'recognizedShape':
        return selectedCandidate.primitives;
      default:
        return [];
    }
  }
  return [];
}

/**
 * Extract the recognized symbols
 * @param {Model} model Current model
 * @return {Array<Object>} Recognized symbols
 */
export function extractRecognizedSymbols(model) {
  const result = model.rawResults.recognition.result;
  if (result && result.segments) {
    return result.segments
        .map((segment) => {
          const style = getStyleFromInkRanges(model, segment.inkRanges);
          return extractShapeSymbols(model, segment).map(primitive => Object.assign(primitive, style));
        })
        .reduce((a, b) => a.concat(b));
  }
  return [];
}
