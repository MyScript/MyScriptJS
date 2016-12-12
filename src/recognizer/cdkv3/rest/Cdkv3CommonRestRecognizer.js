import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * Get the triggers authorized
 * @return {Array<String>} Available recognition slots
 */
export function getAvailableRecognitionSlots() {
  return [MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD, MyScriptJSConstants.RecognitionTrigger.DEMAND];
}
