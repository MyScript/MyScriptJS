import MyScriptJSConstants from '../../../configuration/MyScriptJSConstants';
import * as InkModel from '../../../model/InkModel';

/**
 * Common configuration
 * @type {{availableTriggers: Array<String>, preferredTrigger: String}}
 */
export const commonRestV3Configuration = {
  availableTriggers: [
    MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD,
    MyScriptJSConstants.RecognitionTrigger.DEMAND
  ],
  preferredTrigger: MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD
};

/**
 * Update model lastReceivedPosition regarding to lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
export function updateModelReceivedPosition(model) {
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = modelReference.lastRecognitionPositions.lastSentPosition;
  return modelReference;
}
