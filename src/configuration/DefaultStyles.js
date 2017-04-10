import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} Styles
 * @property {{color: String, width: Number}} stroke
 */

/**
 * Default style
 * @type {Styles}
 */
const defaultStyle = {
  stroke: {
    color: '#000000',
    width: 2
  }
};

/**
 * Generate style
 * @param {Styles} style Custom style to be applied
 * @return {Styles} Overridden style
 */
export function overrideDefaultStyle(style) {
  const currentStyle = assign({}, defaultStyle, style === undefined ? {} : style);
  logger.debug('Override default style', currentStyle);
  return currentStyle;
}

export default defaultStyle;
