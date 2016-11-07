import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';


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
          const stroke = matchingStrokes.pop();
          symbolReference.color = stroke.color;
          symbolReference.width = stroke.width;
        });
      }
    }
  }
  return symbols;
}

export function generateRenderingResult(model) {
  const mutatedModel = model;
  let recognizedComponents = [];

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.rawRecognizedStrokes.concat(InkModel.extractPendingStrokes(mutatedModel));
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result && mutatedModel.rawResult.result.segments) {
    mutatedModel.rawResult.result.segments.forEach((segment) => {
      recognizedComponents = recognizedComponents.concat(extractSymbols(segment, potentialStrokeList));
    });
  }
  mutatedModel.recognizedSymbols.forEach((symbol, index) => {
    recognizedComponents[index] = Object.assign(recognizedComponents[index], symbol);
  });
  mutatedModel.recognizedSymbols = recognizedComponents;
  logger.debug('Building the rendering model', mutatedModel);
  return mutatedModel;
}

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function populateModel(paperOptions, model) {
  const modelReference = model;
  modelReference.defaultSymbols = [];
  return modelReference;
}
