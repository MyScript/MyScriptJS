import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} PenStyle
 * @property {String} color Color (supported formats rgb() rgba() hsl() hsla() #rgb #rgba #rrggbb #rrggbbaa)
 * @property {String} -myscript-pen-width Width of strokes and primitives in mm (no other unit is supported yet)
 * @property {String} -myscript-pen-fill-style
 * @property {String} -myscript-pen-fill-color Color filled inside the area delimited by strokes and primitives
 */

/**
 * Default style
 * @type {PenStyle}
 */
const defaultPenStyle = {
  color: '#000000',
  '-myscript-pen-width': 1,
  '-myscript-pen-fill-style': 'none',
  '-myscript-pen-fill-color': '#FFFFFF00'
};

/**
 * Generate style
 * @param {PenStyle} style Custom style to be applied
 * @param {Number} [dpi=96] The screen dpi resolution
 * @return {PenStyle} Overridden style
 */
export function overrideDefaultPenStyle(style, dpi = 96) {
  const currentStyle = assign({}, defaultPenStyle, style === undefined ? {} : style);
  logger.debug('Override default pen style', currentStyle);
  const pxWidth = (currentStyle['-myscript-pen-width'] * dpi) / 25.4;
  currentStyle.width = pxWidth / 2; // FIXME hack to get better render
  return currentStyle;
}

/**
 * Get string from style
 * @param {PenStyle} style Custom style
 * @return {String}
 */
export function toString(style) {
  return `
    color: ${style.color}; 
    -myscript-pen-width: ${style['-myscript-pen-width']}; 
    -myscript-pen-fill-style: ${style['-myscript-pen-fill-style']}; 
    -myscript-pen-fill-color: ${style['-myscript-pen-fill-color']};
    `;
}

export default defaultPenStyle;
