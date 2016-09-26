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
inkpaperLogger.setLevel('DEBUG');

const rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel('DEBUG');

const modelLogger = logging.getLogger('model');
modelLogger.setLevel('DEBUG');

const recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel('INFO');

const testLogger = logging.getLogger('tests');
testLogger.setLevel('DEBUG');

export { grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger };
