import * as log from 'loglevel';

const logging = log.noConflict();
logging.setDefaultLevel(log.levels.INFO);
logging.setLevel(log.levels.INFO);

// logging.getLogger('grabber').setLevel(log.levels.ERROR);

// TRACE
// DEBUG
// INFO
// ERROR

const grabberLogger = logging.getLogger('grabber');
grabberLogger.setLevel(log.levels.INFO);

const inkpaperLogger = logging.getLogger('inkpaper');
inkpaperLogger.setLevel(log.levels.INFO);

const rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel(log.levels.INFO);

const modelLogger = logging.getLogger('model');
modelLogger.setLevel(log.levels.INFO);

const recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel(log.levels.INFO);

const testLogger = logging.getLogger('tests');
testLogger.setLevel(log.levels.INFO);

const utilLogger = logging.getLogger('util');
utilLogger.setLevel(log.levels.INFO);

export { grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger, utilLogger };
