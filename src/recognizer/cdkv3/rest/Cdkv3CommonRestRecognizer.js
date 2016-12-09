import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * @return {Array<String>}
 */
export function getAvailableRecognitionSlots() {
  return [MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD, MyScriptJSConstants.RecognitionTrigger.DEMAND];
}
