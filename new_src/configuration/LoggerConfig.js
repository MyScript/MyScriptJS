import * as log from 'loglevel';

const logging = log.noConflict();
logging.setDefaultLevel('INFO');
logging.setLevel('INFO');

//logging.getLogger('grabber').setLevel('error');

// TRACE
// DEBUG
// INFO
// ERROR

const grabberLogger = logging.getLogger('grabber');
grabberLogger.setLevel('INFO');

const inkpaperLogger = logging.getLogger('inkpaper');
inkpaperLogger.setLevel('INFO');

const rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel('DEBUG');

const modelLogger = logging.getLogger('model');
modelLogger.setLevel('INFO');

const recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel('DEBUG');

const testLogger = logging.getLogger('tests');
testLogger.setLevel('DEBUG');

export { grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger };
