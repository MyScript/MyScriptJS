'use strict';
import * as log from '../../bower_components/loglevel/dist/loglevel.min';

let logging = log.noConflict();
logging.setDefaultLevel("INFO");
logging.setLevel("INFO");

//logging.getLogger('grabber').setLevel("error");

// TRACE
// DEBUG
// INFO
// ERROR

let grabberLogger = logging.getLogger('grabber');
grabberLogger.setLevel("INFO");

let inkpaperLogger =  logging.getLogger('inkpaper');
inkpaperLogger.setLevel("DEBUG");

let  rendererLogger = logging.getLogger('renderer');
rendererLogger.setLevel("INFO");

let  modelLogger = logging.getLogger('model');
modelLogger.setLevel("INFO");

let  recognizerLogger = logging.getLogger('recognizer');
recognizerLogger.setLevel("INFO");

let testLogger = logging.getLogger('tests');
testLogger.setLevel("INFO");

export {grabberLogger, inkpaperLogger, rendererLogger, modelLogger, recognizerLogger, testLogger};
