import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * Reset the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function resetRecognizerPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.lastRecognitionPositions.lastSentPosition = -1;
  recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = 0;
  logger.debug('Reset recognition positions');
}

/**
 * Update the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function updateRecognizerPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  recognizerContext.lastRecognitionPositions.lastSentPosition = model.lastRecognitionPositions.lastSentPosition;
}
