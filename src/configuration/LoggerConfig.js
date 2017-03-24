import * as loglevel from 'loglevel';

/**
 * Main log instance
 * @type {Object}
 */
const log = loglevel.noConflict();
log.setDefaultLevel('ERROR');

/**
 * Log editor events
 * @type {Object}
 */
const editorLogger = log.getLogger('editor');
editorLogger.setDefaultLevel('ERROR');

/**
 * Log model events
 * @type {Object}
 */
const modelLogger = log.getLogger('model');
modelLogger.setDefaultLevel('ERROR');

/**
 * Log grabber events
 * @type {Object}
 */
const grabberLogger = log.getLogger('grabber');
grabberLogger.setDefaultLevel('ERROR');

/**
 * Log grabber events
 * @type {Object}
 */
const rendererLogger = log.getLogger('renderer');
rendererLogger.setDefaultLevel('ERROR');

/**
 * Log recognizer events
 * @type {Object}
 */
const recognizerLogger = log.getLogger('recognizer');
recognizerLogger.setDefaultLevel('ERROR');

/**
 * Log callback events
 * @type {Object}
 */
const callbackLogger = log.getLogger('callback');
callbackLogger.setDefaultLevel('ERROR');

/**
 * Log util events
 * @type {Object}
 */
const utilLogger = log.getLogger('util');
utilLogger.setDefaultLevel('ERROR');

/**
 * Log tests events
 * @type {Object}
 */
const testLogger = log.getLogger('test');
testLogger.setDefaultLevel('ERROR');

export { log, grabberLogger, editorLogger, rendererLogger, modelLogger, recognizerLogger, callbackLogger, testLogger, utilLogger };
