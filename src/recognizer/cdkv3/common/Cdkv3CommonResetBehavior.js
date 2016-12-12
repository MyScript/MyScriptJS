import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

function isResetRequired(model, recognizerContext) {
  let ret = false;
  if (recognizerContext.lastRecognitionPositions) {
    ret = recognizerContext.lastRecognitionPositions.lastSendPosition >= model.lastRecognitionPositions.lastSendPosition;
  }
  return ret;
}

const resolvedPromise = Promise.resolve();

/**
 * Check if a reset is required, and does it if it is
 * @param {Parameters} paperOptions Current configuration
 * @param {Model} model Current model
 * @param {Recognizer} recognizer Current recognizer
 * @param {RecognizerContext} recognizerContext Current recognition context
 * @return {Promise}
 */
export function manageResetState(paperOptions, model, recognizer, recognizerContext) {
  const modelReference = model;
  const recognizerContextReference = recognizerContext;
  let ret = resolvedPromise;
  if (isResetRequired(model, recognizerContext)) {
    logger.debug('Reset is needed');
    recognizerContextReference.lastRecognitionPositions.lastSendPosition = -1;
    recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
    modelReference.lastRecognitionPositions.lastReceivedPosition = 0;
    ret = recognizer.reset(paperOptions, model, recognizerContext);
  }
  return ret;
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

