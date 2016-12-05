import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';
import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

export function getAvailableRecognitionSlots() {
  const availableRecognitionTypes = {};
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_PEN_UP] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_DEMAND] = true;
  availableRecognitionTypes[MyScriptJSConstants.RecognitionSlot.ON_TIME_OUT] = true;
  return availableRecognitionTypes;
}

export function generateRenderingResult(model) {
  const modelReference = model;

  // TEXT recognition doesn't support scratch-out, so we recopy input symbols to output
  modelReference.recognizedSymbols = model.pendingStrokes.slice();
  logger.debug('Building the rendering model', modelReference);
  return modelReference;
}
