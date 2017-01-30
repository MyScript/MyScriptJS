import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo manager
 * @typedef {Object} UndoRedoManager
 * @property {Array<Model>} stack List of processed models.
 * @property {Number} currentPosition Current model index into the stack.
 * @property {Number} maxSize Max size of the stack.
 */

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Number} [position=currentPosition] Position to retrieve the model
 * @return {Promise.<Model>} Retrieved model
 */
function getModel(undoRedoManager, position = undoRedoManager.currentPosition) {
  return Promise.resolve(undoRedoManager.stack[position]);
}

/**
 * Get undo/redo state
 * @param {UndoRedoManager} undoRedoManager
 * @return {{canUndo: Boolean, canRedo: Boolean, canClear: Boolean}} Undo/redo state
 */
export function getState(undoRedoManager) {
  return {
    canUndo: undoRedoManager.currentPosition > 0,
    canRedo: undoRedoManager.currentPosition < (undoRedoManager.stack.length - 1),
    canClear: undoRedoManager.stack.length > 1
  };
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Model} model Current model
 * @return {Promise.<Model>} Pushed model
 */
export function pushModel(undoRedoManager, model) {
  const modelReference = InkModel.cloneModel(model);
  const undoRedoManagerReference = undoRedoManager;
  undoRedoManagerReference.currentPosition += 1;
  undoRedoManagerReference.stack = undoRedoManagerReference.stack.slice(0, undoRedoManagerReference.currentPosition);
  undoRedoManagerReference.stack.push(modelReference);
  if (undoRedoManagerReference.stack.length > undoRedoManagerReference.maxSize) {
    undoRedoManagerReference.stack.shift();
    undoRedoManagerReference.currentPosition--;
  }
  return getModel(undoRedoManager);
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {Promise.<Model>}
 */
export function undo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition > 0) {
    undoRedoManagerReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoManagerReference.currentPosition);
  }
  return getModel(undoRedoManager);
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {Promise.<Model>}
 */
export function redo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition < undoRedoManagerReference.stack.length - 1) {
    undoRedoManagerReference.currentPosition += 1;
    logger.debug('redo index', undoRedoManagerReference.currentPosition);
  }
  return getModel(undoRedoManager);
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Model} model Empty model to be pushed in stack
 * @return {Promise.<Model>}
 */
export function clear(undoRedoManager, model) {
  return pushModel(undoRedoManager, model);
}

/**
 * @param {Options} options Current configuration
 * @return {UndoRedoManager} New undo/redo manager
 */
export function createUndoRedoManager(options) {
  return {
    stack: [],
    currentPosition: -1,
    maxSize: options.undoRedoMaxStackSize
  };
}
