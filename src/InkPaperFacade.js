import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import { InkPaper } from './InkPaper';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as NetworkInterface from './recognizer/networkHelper/rest/networkInterface';

/**
 * Attach an InkPaper to a DOMElement
 * @param {Element} element
 * @param {Parameters} paperOptions
 * @param {Behaviors} behaviors
 * @return {InkPaper}
 */
export function register(element, paperOptions, behaviors) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(element, paperOptions, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param {Parameters} paperOptions
 * @return {Promise.<Object>}
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
