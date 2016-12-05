import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function generateRenderingResult(model) {
  const modelReference = model;

  // We recopy the recognized strokes to flag them as toBeRemove if they are scratched out or map with a symbol
  const potentialStrokeList = model.pendingStrokes.slice();

  const result = modelReference.rawResult.result;
  if (result && result.scratchOutResults && (result.scratchOutResults.length > 0)) {
    const scratchedInkRanges = result.scratchOutResults
        .map(scratchOutResult => [].concat(scratchOutResult.erasedInkRanges, scratchOutResult.inkRanges))
        .reduce((a, b) => a.concat(b));

    scratchedInkRanges.forEach((scratchedInkRange) => {
      potentialStrokeList[scratchedInkRange.component].toBeRemove = true;
    });
  }
  modelReference.recognizedSymbols = potentialStrokeList.filter(stroke => !stroke.toBeRemove);
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
}
