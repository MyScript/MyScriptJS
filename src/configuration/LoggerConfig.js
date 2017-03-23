import * as log from 'loglevel';

const logger = log.noConflict();
logger.setDefaultLevel(log.levels.ERROR);
logger.setLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR

/**
 * Log editor events
 * @type {Object}
 */
const editorLogger = logger.getLogger('editor');
editorLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
editorLogger.setLevel(logger.getLevel());

/**
 * Log model events
 * @type {Object}
 */
const modelLogger = logger.getLogger('model');
modelLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
modelLogger.setLevel(logger.getLevel());

/**
 * Log grabber events
 * @type {Object}
 */
const grabberLogger = logger.getLogger('grabber');
grabberLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
grabberLogger.setLevel(logger.getLevel());

/**
 * Log grabber events
 * @type {Object}
 */
const rendererLogger = logger.getLogger('renderer');
rendererLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
rendererLogger.setLevel(logger.getLevel());

/**
 * Log recognizer events
 * @type {Object}
 */
const recognizerLogger = logger.getLogger('recognizer');
recognizerLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
recognizerLogger.setLevel(logger.getLevel());

/**
 * Log callback events
 * @type {Object}
 */
const callbackLogger = logger.getLogger('callback');
callbackLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
callbackLogger.setLevel(logger.getLevel());

/**
 * Log util events
 * @type {Object}
 */
const utilLogger = logger.getLogger('util');
utilLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
utilLogger.setLevel(logger.getLevel());

/**
 * Log tests events
 * @type {Object}
 */
const testLogger = logger.getLogger('tests');
testLogger.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
testLogger.setLevel(logger.getLevel());

export { logger, grabberLogger, editorLogger, rendererLogger, modelLogger, recognizerLogger, callbackLogger, testLogger, utilLogger };
