import { recognizerLogger as logger } from '../configuration/LoggerConfig';
import * as InkModel from '../model/InkModel';
import { resetRecognitionPositions } from '../model/RecognizerContext';

/**
 * Recognizer info
 * @typedef {Object} RecognizerInfo
 * @property {String} type Supported recognition type (TEXT, MATH, SHAPE, MUSIC, ANALYZER).
 * @property {String} protocol Supported protocol (REST, WEBSOCKET).
 * @property {String} apiVersion Supported API version.
 * @property {Array<String>} availableTriggers Supported triggers for this recognizer.
 * @property {String} preferredTrigger Preferred recognition trigger for this recognizer.
 */

/**
 * Recognition service entry point
 * @typedef {Object} Recognizer
 * @property {function(): RecognizerInfo} getInfo Get information about the supported configuration (protocol, type, apiVersion, ...).
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} init Initialize recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} reset Clear server context. Currently nothing to do there.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} recognize Do the recognition.
 * @property {function(options: Options, model: Model, recognizerContext: RecognizerContext): Promise.<Model>} close Close and free all resources that will no longer be used by the recognizer.
 */

/**
 * Do what is needed to clean the server context.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
export function reset(options, model, recognizerContext) {
  resetRecognitionPositions(recognizerContext);
  // We are explicitly manipulating a reference here.
  // eslint-disable-next-line no-param-reassign
  delete recognizerContext.instanceId;
  return Promise.resolve(model).then(InkModel.resetModelPositions);
}

/**
 * Close and free all resources that will no longer be used by the recognizer.
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the close phase is over.
 */
export function close(options, model, recognizerContext) {
  logger.debug('No close behavior');
  return Promise.resolve(model).then(InkModel.resetModelPositions);
}

/**
 * Initialize recognition
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>} Fulfilled when the init phase is over.
 */
export function init(options, model, recognizerContext) {
  logger.debug('No init behavior');
  return Promise.resolve(model);
}
