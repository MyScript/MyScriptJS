import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} Styles
 * @property {{color: String, width: Number}} strokeStyle
 */

/**
 * Default style
 * @type {Styles}
 */
const defaultStyle = {
  strokeStyle: {
    color: '#1580CD',
    width: 4
  },
  styleClasses: 'pen-070 turquoise-color'
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
