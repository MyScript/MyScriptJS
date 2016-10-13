import * as log from 'loglevel';

const logging = log.noConflict();
logging.setDefaultLevel('INFO');
logging.setLevel('INFO');

// logging.getLogger('grabber').setLevel('error');

// TRACE
// DEBUG
// INFO
// ERROR

const grabberLogger = logging.getLogger('grabber');
grabberLogger.setLevel('INFO');

const inkpaperLogger = logging.getLogger('inkpaper');
inkpaperLogger.setLevel('DEBUG');

const rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel('INFO');

const modelLogger = logging.getLogger('model');
modelLogger.setLevel('INFO');

const recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel('DEBUG');

const testLogger = logging.getLogger('tests');
testLogger.setLevel('INFO');

const utilLogger = logging.getLogger('util');
utilLogger.setLevel('INFO');

export { grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger, utilLogger };
