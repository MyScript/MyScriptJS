import { editorLogger as logger } from './configuration/LoggerConfig';
import { Editor } from './Editor';
import * as DefaultConfiguration from './configuration/DefaultConfiguration';
import Constants from './configuration/Constants';
import * as NetworkInterface from './recognizer/rest/networkInterface';

/**
 * Attach an Editor to a DOMElement
 * @param {Element} element DOM element to attach an editor
 * @param {Configuration} [configuration] Configuration to apply
 * @param {Styles} [customStyle] Custom style to apply
 * @param {Behaviors} [behaviors] Custom behaviors to apply
 * @return {Editor} New editor
 */
export function register(element, configuration, customStyle, behaviors) {
  logger.debug('Registering a new editor');
  return new Editor(element, configuration, customStyle, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param {Configuration} configuration Current configuration
 * @param {Boolean} [sortByValue=true] True if the language list should be sort by value, false otherwise
 * @return {Promise.<Object>} A list of languages available for the current configuration
 */
export function getAvailableLanguageList(configuration, sortByValue = true) {
  const innerConfiguration = DefaultConfiguration.overrideDefaultConfiguration(configuration);
  const data = {
    applicationKey: innerConfiguration.recognitionParams.server.applicationKey,
    sortByValue
  };

  switch (innerConfiguration.recognitionParams.type) {
    case Constants.RecognitionType.TEXT:
      data.inputMode = innerConfiguration.recognitionParams.v3.textParameter.textInputMode;
      break;
    case Constants.RecognitionType.ANALYZER:
      data.inputMode = innerConfiguration.recognitionParams.v3.analyzerParameter.textParameter.textInputMode;
      break;
    default:
      break;
  }

  return NetworkInterface.get(`${innerConfiguration.recognitionParams.server.scheme}://${innerConfiguration.recognitionParams.server.host}/api/v3.0/recognition/rest/text/availableLanguageList.json`, data);
}
