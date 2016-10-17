import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';
import { extractSymbols as extractShapeSymbols } from './Cdkv3CommonShapeRecognizer';
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
      Array.prototype.push.apply(recognizedComponents.symbolList, extractShapeSymbols(shape, potentialStrokeList));
    });
  }
  recognizedComponents.strokeList = potentialStrokeList.filter(stroke => !stroke.toBeRemove);
  recognizedComponents.inkRange.firstStroke = 0;
  recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
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
