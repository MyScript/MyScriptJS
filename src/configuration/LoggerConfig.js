import * as log from 'loglevel';

const logging = log.noConflict();
logging.setDefaultLevel(log.levels.ERROR); // TRACE,DEBUG,INFO,ERROR
logging.setLevel(log.levels.ERROR);

/**
 * Log inkPaper events
 * @type {Object}
 */
const inkpaperLogger = logging.getLogger('inkpaper');
inkpaperLogger.setLevel(log.levels.INFO);

/**
 * Log model events
 * @type {Object}
 */
const modelLogger = logging.getLogger('model');
modelLogger.setLevel(log.levels.INFO);

/**
 * Log grabber events
 * @type {Object}
 */
const grabberLogger = logging.getLogger('grabber');
grabberLogger.setLevel(log.levels.INFO);

/**
 * Log grabber events
 * @type {Object}
 */
const rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel(log.levels.INFO);

/**
 * Log recognizer events
 * @type {Object}
 */
const recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel(log.levels.INFO);

/**
 * Log callback events
 * @type {Object}
 */
const callbackLogger = logging.getLogger('callback');
callbackLogger.setLevel(log.levels.DEBUG);

/**
 * Log tests events
 * @type {Object}
 */
const testLogger = logging.getLogger('tests');
testLogger.setLevel(log.levels.INFO);

/**
 * Log util events
 * @type {Object}
 */
const utilLogger = logging.getLogger('util');
utilLogger.setLevel(log.levels.INFO);

export { grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, callbackLogger, testLogger, utilLogger };
