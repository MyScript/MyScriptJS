import assign from 'assign-deep';

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
  }
};

/**
 * Generate style
 * @param {Styles} style Custom style to be applied
 * @return {Styles} Overridden style
 */
export function overrideDefaultStyle(style) {
  return assign({}, defaultStyle, style === undefined ? {} : style);
}

export default defaultStyle;
