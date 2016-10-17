import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';


export function generateRenderingResult(model) {
  const mutatedModel = model;

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = mutatedModel.rawRecognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(mutatedModel));

  if (mutatedModel.rawResult.result && mutatedModel.rawResult.result.scratchOutResults) {
    mutatedModel.rawResult.result.scratchOutResults.forEach((scratchOut) => {
      scratchOut.erasedInkRanges.forEach((inkRangeToErase) => {
        potentialStrokeList[inkRangeToErase.component].toBeRemove = true;
      });
      scratchOut.inkRanges.forEach((inkRangeToErase) => {
        potentialStrokeList[inkRangeToErase.component].toBeRemove = true;
      });
    });
  }
  mutatedModel.recognizedComponents = potentialStrokeList.filter(stroke => !stroke.toBeRemove);
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
