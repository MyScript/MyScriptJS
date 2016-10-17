import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';


export function generateRenderingResult(model) {
  const updatedModel = InkModel.clone(model);
  const recognizedComponents = {
    strokeList: [],
    symbolList: [],
    inkRange: {}
  };
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(updatedModel));
  // TODO Check the wording compare to the SDK doc
  if (updatedModel.rawResult.result) {
    updatedModel.rawResult.result.segments.forEach((shape) => {
      if (shape.candidates && shape.candidates.length > 0 && shape.candidates[0].type !== 'notRecognized') {
        // Flagging strokes recognized as toBeRemove
        shape.inkRanges.forEach((inkRange) => {
          potentialStrokeList.slice(inkRange.firstStroke, inkRange.lastStroke + 1)
              .forEach((stroke) => {
                stroke.toBeRemove = true;
              });
        });
        // Merging the first candidate with the shape element
        const newSymbol = Object.assign(shape, shape.candidates[0]);
        newSymbol.candidates = undefined;
        recognizedComponents.symbolList.push(newSymbol);
      }
    });
  }
  recognizedComponents.strokeList = potentialStrokeList.filter(stroke => !stroke.toBeRemove);
  recognizedComponents.inkRange.firstStroke = 0;
  recognizedComponents.inkRange.lastStroke = updatedModel.recognizedStrokes.length;
  updatedModel.recognizedComponents = recognizedComponents;
  updatedModel.recognizedStrokes = updatedModel.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(updatedModel));
  logger.debug('Building the rendering model', updatedModel);
  return updatedModel;
}

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}
