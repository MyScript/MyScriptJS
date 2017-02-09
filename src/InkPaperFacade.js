import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import { InkPaper } from './InkPaper';
import * as MyScriptJSOptions from './configuration/MyScriptJSOptions';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as NetworkInterface from './recognizer/networkHelper/rest/networkInterface';

/**
 * Attach an InkPaper to a DOMElement
 * @param {Element} element DOM element to attach an inkPaper
 * @param {Options} [options] Configuration to apply
 * @param {Styles} [customStyle] Custom style to apply
 * @param {Behaviors} [behaviors] Custom behaviors to apply
 * @return {InkPaper} New inkPaper
 */
export function register(element, options, customStyle, behaviors) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(element, options, customStyle, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param {Options} options Current configuration
 * @param {Boolean} [sortByValue=true] True if the language list should be sort by value, false otherwise
 * @return {Promise.<Object>} A list of languages available for the current configuration
 */
export function getAvailableLanguageList(options, sortByValue = true) {
  const innerOptions = MyScriptJSOptions.overrideDefaultOptions(options);
  const data = {
    applicationKey: innerOptions.recognitionParams.server.applicationKey,
    sortByValue
  };

  switch (innerOptions.recognitionParams.type) {
    case MyScriptJSConstants.RecognitionType.TEXT:
      data.inputMode = innerOptions.recognitionParams.textParameter.textInputMode;
      break;
    case MyScriptJSConstants.RecognitionType.ANALYZER:
      data.inputMode = innerOptions.recognitionParams.analyzerParameter.textParameter.textInputMode;
      break;
    default:
      break;
  }

  return NetworkInterface.get(`${innerOptions.recognitionParams.server.scheme}://${innerOptions.recognitionParams.server.host}/api/v3.0/recognition/rest/text/availableLanguageList.json`, data);
}
