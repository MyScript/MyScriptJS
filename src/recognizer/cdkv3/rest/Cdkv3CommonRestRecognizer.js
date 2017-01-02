import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';

/**
 * Get the authorized triggers
 * @return {Array<String>} Available recognition triggers
 */
export function getAvailableRecognitionTriggers() {
  return [MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD, MyScriptJSConstants.RecognitionTrigger.DEMAND];
}
