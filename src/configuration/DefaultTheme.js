import JsonCSS from 'json-css';
import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {PenStyle} InkTheme
 */
/**
 * @typedef {Object} MathTheme
 * @property {String} font-family=STIXGeneral Font-family to be used
 */
/**
 * @typedef {Object} GeneratedTheme
 * @property {String} font-family=STIXGeneral Font-family to be used
 * @property {String} color=#A8A8A8FF Color to be used
 */
/**
 * @typedef {Object} TextTheme
 * @property {String} font-family=OpenSans Font-family to be used
 * @property {Number} font-size=10 Font-size to be used
 */
/**
 * @typedef {Object} Theme
 * @property {InkTheme} ink General settings
 * @property {MathTheme} .math Math theme
 * @property {GeneratedTheme} .math-solver Theme to be used for generated items
 * @property {TextTheme} .text Text theme
 */

/**
 * Default theme
 * @type {Theme}
 */
const defaultTheme = {
  ink: {
    color: '#000000',
    '-myscript-pen-width': 1,
    '-myscript-pen-fill-style': 'none',
    '-myscript-pen-fill-color': '#FFFFFF00'
  },
  '.math': {
    'font-family': 'STIXGeneral'
  },
  '.math-solved': {
    'font-family': 'STIXGeneral',
    color: '#A8A8A8FF'
  },
  '.text': {
    'font-family': 'Open Sans',
    'font-size': 10
  }
};
const parser = new JsonCSS();

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

export function toCSS(theme) {
  return parser.toCSS(theme);
}

export function toJSON(theme) {
  return parser.toJSON(theme);
}

export default defaultTheme;
