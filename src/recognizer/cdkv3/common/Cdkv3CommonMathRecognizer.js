import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';


export function generateRenderingResult(model) {
  const muttatedModel = InkModel.clone(model);
  const recognizedComponents = {
    segmentList: [],
    // symbolList : [], no math symbol managed yet
    inkRange: {}
  };
  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialSegmentList = muttatedModel.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(muttatedModel));

  if (muttatedModel.rawResult.result && muttatedModel.rawResult.result.scratchOutResults) {
    muttatedModel.rawResult.result.scratchOutResults.forEach((scratchOut) => {
      scratchOut.erasedInkRanges.forEach((inkRangeToErase) => {
        potentialSegmentList[inkRangeToErase.component - 1].toBeRemove = true;
      });
      scratchOut.inkRanges.forEach((inkRangeToErase) => {
        potentialSegmentList[inkRangeToErase.component - 1].toBeRemove = true;
      });
    });
  }
  recognizedComponents.segmentList = potentialSegmentList.filter(segment => !segment.toBeRemove);
  recognizedComponents.inkRange.firstStroke = 0;
  recognizedComponents.inkRange.lastStroke = model.recognizedStrokes.length;
  muttatedModel.recognizedComponents = recognizedComponents;
  logger.debug('Building the rendering model', model);
  return model;
}

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}
