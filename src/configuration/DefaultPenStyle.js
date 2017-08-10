import assign from 'assign-deep';
import { editorLogger as logger } from './LoggerConfig';

/**
 * @typedef {Object} PenStyle
 * @property {String} color=#000000 Color (supported formats rgb() rgba() hsl() hsla() #rgb #rgba #rrggbb #rrggbbaa)
 * @property {String} -myscript-pen-width=1 Width of strokes and primitives in mm (no other unit is supported yet)
 * @property {String} -myscript-pen-fill-style=none
 * @property {String} -myscript-pen-fill-color=#FFFFFF00 Color filled inside the area delimited by strokes and primitives
 */

/**
 * Default style
 * @type {PenStyle}
 */
const defaultPenStyle = undefined;

/**
 * Generate style
 * @param {PenStyle} style Custom style to be applied
 * @return {PenStyle} Overridden style
 */
export function overrideDefaultPenStyle(style) {
  const currentStyle = assign({}, defaultPenStyle, style === undefined ? {} : style);
  logger.debug('Override default pen style', currentStyle);
  return currentStyle;
}

export default defaultPenStyle;
