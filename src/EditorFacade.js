import * as languagesJson from './configuration/languages.json';
import * as languagesJsonV3 from './configuration/languagesV3.json';
import { editorLogger as logger } from './configuration/LoggerConfig';
import { Editor } from './Editor';
import * as DefaultConfiguration from './configuration/DefaultConfiguration';

/**
 * Attach an Editor to a DOMElement
 * @param {Element} element DOM element to attach an editor
 * @param {Configuration} [configuration] Configuration to apply
 * @param {PenStyle} [penStyle] Pen style to apply
 * @param {Theme} [theme] Theme to apply
 * @param {Behaviors} [behaviors] Custom behaviors to apply
 * @return {Editor} New editor
 */
export function register(element, configuration, penStyle, theme, behaviors) {
  logger.debug('Registering a new editor');
  return new Editor(element, configuration, penStyle, theme, behaviors);
}

/**
 * Return the list of available recognition languages
 * @param {Configuration} [configuration] Configuration to get the languages
 * @return {JSON} A list of available languages
 */
export function getAvailableLanguageList(configuration) {
  const innerConfiguration = DefaultConfiguration.overrideDefaultConfiguration(configuration);
  return innerConfiguration.recognitionParams.apiVersion === 'V4' ? languagesJson : languagesJsonV3;
}
