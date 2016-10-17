import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import cloneJSObject from '../../../util/Cloner';


export function generateRenderingResult(model) {
  const mutatedModel = InkModel.clone(model);
  const recognizedComponents = {
    strokeList: [],
    symbolList: [],
    inkRange: {}
  };
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(model));
  // TODO Check the wording compare to the SDK doc
  if (mutatedModel.rawResult.result) {
    // Handling text lines
    mutatedModel.rawResult.result.textLines.forEach((textLine) => {
      const mutatedTextLine = cloneJSObject(textLine);
      mutatedTextLine.type = 'textline';
      mutatedTextLine.inkRanges.forEach((inkRange) => {
        potentialStrokeList[inkRange.stroke].toBeRemove = true;
      });
      // textLine.inkRanges = undefined;
      recognizedComponents.symbolList.push(textLine);
    });
    mutatedModel.rawResult.result.shapes.forEach((shape) => {
      if (shape.candidates && shape.candidates.length > 0 && shape.candidates[0].type !== 'notRecognized') {
        // Flagging strokes recognized as toBeRemove
        shape.inkRanges.forEach((inkRange) => {
          potentialStrokeList.slice(inkRange.firstStroke, inkRange.lastStroke + 1).forEach((stroke) => {
            // eslint-disable-next-line no-param-reassign
            stroke.toBeRemove = true;
            // eslint-enable-next-line no-param-reassign
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
  recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
  mutatedModel.recognizedComponents = recognizedComponents;
  mutatedModel.recognizedStrokes = mutatedModel.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(mutatedModel));
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
