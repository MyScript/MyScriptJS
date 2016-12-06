import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import { InkPaper } from './InkPaper';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as NetworkInterface from './recognizer/networkHelper/rest/networkInterface';

export function register(domElement, paperOptions, behaviors) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(domElement, paperOptions, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param paperOptions
 * @return {Promise}
 */
export function getAvailableLanguageList(paperOptions) {
  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey
  };

  switch (paperOptions.recognitionParams.type) {
    case MyScriptJSConstants.RecognitionType.TEXT:
      data.inputMode = paperOptions.recognitionParams.textParameter.textInputMode;
      break;
    case MyScriptJSConstants.RecognitionType.ANALYZER:
      data.inputMode = paperOptions.recognitionParams.analyzerParameter.textParameter.textInputMode;
      break;
    default:
      break;
  }

  return NetworkInterface.get(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/text/languages.json', data);
}
