import assign from 'assign-deep';
import * as loglevel from 'loglevel';

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
export const editorLogger = log.getLogger('editor');
editorLogger.setDefaultLevel('ERROR');

/**
 * Log model events
 * @type {Object}
 */
export const modelLogger = log.getLogger('model');
modelLogger.setDefaultLevel('ERROR');

/**
 * Log grabber events
 * @type {Object}
 */
export const grabberLogger = log.getLogger('grabber');
grabberLogger.setDefaultLevel('ERROR');

/**
 * Log grabber events
 * @type {Object}
 */
export const rendererLogger = log.getLogger('renderer');
rendererLogger.setDefaultLevel('ERROR');

/**
 * Log recognizer events
 * @type {Object}
 */
export const recognizerLogger = log.getLogger('recognizer');
recognizerLogger.setDefaultLevel('ERROR');

/**
 * Log callback events
 * @type {Object}
 */
export const callbackLogger = log.getLogger('callback');
callbackLogger.setDefaultLevel('ERROR');

/**
 * Log util events
 * @type {Object}
 */
export const utilLogger = log.getLogger('util');
utilLogger.setDefaultLevel('ERROR');

/**
 * Log tests events
 * @type {Object}
 */
export const testLogger = log.getLogger('test');
testLogger.setDefaultLevel('ERROR');
