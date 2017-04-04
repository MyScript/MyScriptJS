import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo context
 * @typedef {Object} UndoRedoContext
 * @property {Array<Model>} stack List of processed models.
 * @property {Number} currentPosition Current model index into the stack.
 * @property {Number} maxSize Max size of the stack.
 * @property {Boolean} canUndo.
 * @property {Boolean} canRedo.
 * @property {Boolean} canClear.
 */

/**
 * Create a new undo/redo context
 * @param {Configuration} configuration Current configuration
 * @return {UndoRedoContext} New undo/redo context
 */
export function createUndoRedoContext(configuration) {
  return {
    stack: [],
    currentPosition: -1,
    maxSize: configuration.undoRedoMaxStackSize,
    canUndo: false,
    canRedo: false
  };
}

/**
 * Update the undo/redo state
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @return {UndoRedoContext} Updated undo/redo context
 */
export function updateUndoRedoState(undoRedoContext) {
  const undoRedoContextRef = undoRedoContext;
  undoRedoContextRef.canUndo = undoRedoContext.currentPosition > 0;
  undoRedoContextRef.canRedo = undoRedoContext.currentPosition < (undoRedoContext.stack.length - 1);
  return undoRedoContextRef;
}
