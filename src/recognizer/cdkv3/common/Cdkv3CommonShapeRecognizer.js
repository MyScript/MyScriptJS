import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import * as StrokeComponent from '../../../model/StrokeComponent';


export function extractSymbols(shape, strokes) {
  const symbols = [];
  if (shape.candidates && shape.candidates.length > 0) {
    const selectedCandidate = shape.candidates[shape.selectedCandidateIndex];

    if (selectedCandidate.type === 'notRecognized') {
      // Flagging strokes recognized as notRecognized
      shape.inkRanges.forEach((inkRange) => {
        strokes.slice(inkRange.firstStroke, inkRange.lastStroke + 1)
            .forEach((stroke, i) => {
              const start = (i === inkRange.firstStroke) ? inkRange.firstPoint : 0;
              const end = (i === inkRange.lastStroke) ? inkRange.lastPoint + 1 : stroke.x.length;
              const slicedStroke = StrokeComponent.slice(stroke, start, end);

              // eslint-disable-next-line no-param-reassign
              slicedStroke.notRecognized = true;
              // eslint-enable-next-line no-param-reassign
              symbols.push(slicedStroke);
            });
      });
    } else if (selectedCandidate.type === 'erased') {
      // Flagging strokes recognized as toBeRemove
    } else {
      symbols.push(selectedCandidate);
    }
  }
  return symbols;
}

export function generateRenderingResult(model) {
  const mutatedModel = model;
  const recognizedComponents = [];

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(mutatedModel));
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result && mutatedModel.rawResult.result.segments) {
    mutatedModel.rawResult.result.segments.forEach((segment) => {
      recognizedComponents.push(extractSymbols(segment, potentialStrokeList));
    });
  }
  mutatedModel.recognizedComponents = recognizedComponents;
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
