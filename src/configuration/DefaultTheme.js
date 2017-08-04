import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} MathTheme
 * @property {String} font-family=STIXGeneral Font-family to be used
 */
/**
 * @typedef {Object} TextTheme
 * @property {String} font-family=OpenSans Font-family to be used
 * @property {Number} font-size=10 Font-size to be used
 */
/**
 * @typedef {Object} Theme
 * @property {MathTheme} .math Math theme
 * @property {TextTheme} .text Text theme
 */

/**
 * Default theme
 * @type {Theme}
 */
const defaultTheme = {
  '.math': {
    'font-family': 'STIXGeneral'
  },
  '.text': {
    'font-family': 'Open Sans',
    'font-size': 10.0
  }
};

/**
 * Generate theme
 * @param {Theme} theme Custom theme to be applied
 * @return {Theme} Overridden theme
 */
export function overrideDefaultTheme(theme) {
  const currentTheme = assign({}, defaultTheme, theme === undefined ? {} : theme);
  logger.debug('Override default theme', currentTheme);
  return currentTheme;
}

/**
 * Get string from theme
 * @param {Theme} theme Custom theme
 * @return {String}
 */
export function toString(theme) {
  return `
    .math: {
      font-family: ${theme['.math']['font-family']};
    }
    .text: {
      font-family: ${theme['.text']['font-family']};
      font-size: ${theme['.text']['font-size']};
    }
    `;
}

export default defaultTheme;
