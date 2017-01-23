import { recognizerLogger as logger } from '../configuration/LoggerConfig';

/**
 * Recognizer context
 * @typedef {Object} RecognizerContext
 * @property {Array<RecognitionContext>} recognitionContexts
 * @property {Promise} initPromise
 * @property {RecognitionPositions} lastRecognitionPositions  Last recognition sent/received stroke indexes.
 */

/**
 * Create a new recognizer context
 * @return {RecognizerContext} An object that contains all recognizer context
 */
export function createEmptyRecognizerContext() {
  return {
    // websocket
    recognitionContexts: [],
    initPromise: undefined,
    lastRecognitionPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    }
  };
}

/**
 * Reset the recognition context positions
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 */
export function resetRecognitionPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  const recognizerContextReference = recognizerContext;
  recognizerContextReference.lastRecognitionPositions.lastSentPosition = -1;
  recognizerContextReference.lastRecognitionPositions.lastReceivedPosition = -1;
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = 0;
  logger.debug('Reset recognition positions');
}

/**
 * Update the recognition context sent position
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 */
export function updateSentRecognitionPositions(recognizerContext, model) {
  // eslint-disable-next-line no-param-reassign
  recognizerContext.lastRecognitionPositions.lastSentPosition = model.lastRecognitionPositions.lastSentPosition;
}

export function shouldAttemptImmediateReconnect(recognizerContextParam) {
  const recognizerContext = recognizerContextParam;
  return recognizerContext.websocket.autoReconnect === true && recognizerContext.currentReconnexionCount++ <= recognizerContext.websocket.maxRetryCount;
}

export const LOST_CONNEXION_MESSAGE = { type: 'LOST_CONNEXION' };

