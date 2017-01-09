import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

function isResetRequired(model, recognizerContext) {
  let ret = false;
  if (recognizerContext.lastRecognitionPositions) {
    ret = recognizerContext.lastRecognitionPositions.lastSendPosition >= model.lastRecognitionPositions.lastSendPosition;
  }
  return ret;
}

/**
 * Check if a reset is required, and does it if it is
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {Recognizer} recognizer Current recognizer
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise}
 */
export function manageResetState(options, model, recognizer, recognizerContext) {
  if (isResetRequired(model, recognizerContext)) {
    logger.debug('Reset is needed');
    return recognizer.reset(options, model, recognizerContext);
  }
  return Promise.resolve();
}

/**
 * Reset the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function resetRecognizerPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.lastRecognitionPositions.lastSendPosition = -1;
  recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = 0;
}

/**
 * Update the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @param {Model} model Current model
 */
export function updateRecognizerPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  recognizerContext.lastRecognitionPositions.lastSendPosition = model.lastRecognitionPositions.lastSendPosition;
}
