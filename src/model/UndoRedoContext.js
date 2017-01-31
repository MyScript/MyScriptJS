import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo context
 * @typedef {Object} UndoRedoContext
 * @property {Array<Model>} stack List of processed models.
 * @property {Number} currentPosition Current model index into the stack.
 * @property {Number} maxSize Max size of the stack.
 */

/**
 * Create a new undo/redo context
 * @param {Options} options Current configuration
 * @return {UndoRedoContext} New undo/redo context
 */
export function createUndoRedoContext(options) {
  return {
    stack: [],
    currentPosition: -1,
    maxSize: options.undoRedoMaxStackSize
  };
}
