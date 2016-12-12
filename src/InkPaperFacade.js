import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import { InkPaper } from './InkPaper';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as NetworkInterface from './recognizer/networkHelper/rest/networkInterface';

/**
 * Attach an InkPaper to a DOMElement
 * @param {Element} element DOM element to attach an inkPaper
 * @param {Parameters} [paperOptions] Configuration to apply
 * @param {Styles} [style] Style to apply
 * @return {InkPaper} New inkPaper
 */
export function register(element, paperOptions, style) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(element, paperOptions, style);
}

/**
 * Return the list of available recognition languages
 * @param {Parameters} paperOptions Current configuration
 * @return {Promise.<Object>} A list of languages available for the current configuration
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
