import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo context
 * @typedef {Object} UndoRedoContext
 * @property {Array<Model>} stack List of processed models.
 * @property {Number} currentPosition Current model index into the stack.
 * @property {Number} maxSize Max size of the stack.
 */

/**
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Number} [position=currentPosition] Position to retrieve the model
 * @return {Promise.<Model>} Retrieved model
 */
function getModel(undoRedoContext, position = undoRedoContext.currentPosition) {
  return Promise.resolve(undoRedoContext.stack[position]);
}

/**
 * Get undo/redo state
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @return {{canUndo: Boolean, canRedo: Boolean, canClear: Boolean}} Undo/redo state
 */
export function getState(undoRedoContext) {
  return {
    canUndo: undoRedoContext.currentPosition > 0,
    canRedo: undoRedoContext.currentPosition < (undoRedoContext.stack.length - 1),
    canClear: undoRedoContext.stack.length > 1
  };
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Model} model Current model
 * @return {Promise.<Model>} Pushed model
 */
export function pushModel(undoRedoContext, model) {
  const modelReference = InkModel.cloneModel(model);
  const undoRedoContextReference = undoRedoContext;
  undoRedoContextReference.currentPosition += 1;
  undoRedoContextReference.stack = undoRedoContextReference.stack.slice(0, undoRedoContextReference.currentPosition);
  undoRedoContextReference.stack.push(modelReference);
  if (undoRedoContextReference.stack.length > undoRedoContextReference.maxSize) {
    undoRedoContextReference.stack.shift();
    undoRedoContextReference.currentPosition--;
  }
  return getModel(undoRedoContext);
}

/**
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @return {Promise.<Model>}
 */
export function undo(undoRedoContext) {
  const undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition > 0) {
    undoRedoContextReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoContextReference.currentPosition);
  }
  return getModel(undoRedoContext);
}

/**
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @return {Promise.<Model>}
 */
export function redo(undoRedoContext) {
  const undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition < undoRedoContextReference.stack.length - 1) {
    undoRedoContextReference.currentPosition += 1;
    logger.debug('redo index', undoRedoContextReference.currentPosition);
  }
  return getModel(undoRedoContext);
}

/**
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Model} model Empty model to be pushed in stack
 * @return {Promise.<Model>}
 */
export function clear(undoRedoContext, model) {
  return pushModel(undoRedoContext, model);
}

/**
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
