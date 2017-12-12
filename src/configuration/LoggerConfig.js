import * as loglevel from 'loglevel';
import Constants from './Constants';

/**
 * Main log instance
 * @type {Object}
 */
const log = loglevel.noConflict();
export default log;

/**
 * Log editor events
 * @type {Object}
 */
export const editorLogger = log.getLogger(Constants.Logger.EDITOR);
editorLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log editor events
 * @type {Object}
 */
export const smartGuideLogger = log.getLogger(Constants.Logger.SMARTGUIDE);
editorLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log model events
 * @type {Object}
 */
export const modelLogger = log.getLogger(Constants.Logger.MODEL);
modelLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log grabber events
 * @type {Object}
 */
export const grabberLogger = log.getLogger(Constants.Logger.GRABBER);
grabberLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log grabber events
 * @type {Object}
 */
export const rendererLogger = log.getLogger(Constants.Logger.RENDERER);
rendererLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log recognizer events
 * @type {Object}
 */
export const recognizerLogger = log.getLogger(Constants.Logger.RECOGNIZER);
recognizerLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log callback events
 * @type {Object}
 */
export const callbackLogger = log.getLogger(Constants.Logger.CALLBACK);
callbackLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log util events
 * @type {Object}
 */
export const utilLogger = log.getLogger(Constants.Logger.UTIL);
utilLogger.setDefaultLevel(Constants.LogLevel.ERROR);

/**
 * Log tests events
 * @type {Object}
 */
export const testLogger = log.getLogger('test');
testLogger.setDefaultLevel(Constants.LogLevel.ERROR);
