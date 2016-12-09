import { recognizerLogger as logger } from '../../../configuration/LoggerConfig';

/**
 * @param {Model} model
 * @param {RecognitionContext} recognizerContext
 * @return {Boolean}
 */
function isResetRequired(model, recognizerContext) {
  let ret = false;
  if (recognizerContext.lastRecognitionPositions) {
    ret = recognizerContext.lastRecognitionPositions.lastSendPosition >= model.lastRecognitionPositions.lastSendPosition;
  }
  return ret;
}

const resolvedPromise = Promise.resolve();

/**
 * @param {Parameters} paperOptions
 * @param {Model} model
 * @param {Recognizer} recognizer
 * @param {RecognitionContext} recognizerContext
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
 * @param {RecognitionContext} recognizerContext
 * @param {Model} model
 */
export function updateRecognizerPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  recognizerContext.lastRecognitionPositions.lastSendPosition = model.lastRecognitionPositions.lastSendPosition;
}

