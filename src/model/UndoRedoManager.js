import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * @typedef {Object} UndoRedoManager
 * @property {Array<Model>} stack
 * @property {Number} currentPosition
 * @property {Number} maxSize
 */

/**
 * @param {Model} model
 * @param {Parameters} paperOptions
 * @return {UndoRedoManager}
 */
export function createUndoRedoManager(model, paperOptions) {
  const manager = { stack: [], maxSize: paperOptions.undoRedoMaxStackSize };
  if (model) {
    manager.stack.push(model);
  }
  manager.currentPosition = manager.stack.length - 1;
  return manager;
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @param {Number} [position]
 * @return {Model}
 */
export function getModel(undoRedoManager, position = undoRedoManager.currentPosition) {
  return InkModel.cloneModel(undoRedoManager.stack[position]);
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoManager} undoRedoManager
 * @param {Model} model
 * @return {Model}
 */
export function pushModel(undoRedoManager, model) {
  const modelReference = model;
  const undoRedoManagerReference = undoRedoManager;
  undoRedoManagerReference.currentPosition += 1;
  undoRedoManagerReference.stack = undoRedoManagerReference.stack.slice(0, undoRedoManagerReference.currentPosition);
  undoRedoManagerReference.stack.push(modelReference);
  if (undoRedoManagerReference.stack.length > undoRedoManagerReference.maxSize) {
    undoRedoManagerReference.stack.shift();
    undoRedoManagerReference.currentPosition--;
  }
  return getModel(undoRedoManagerReference);
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {Boolean}
 */
export function canUndo(undoRedoManager) {
  return undoRedoManager.currentPosition > 0;
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {{freshClone: Model, modelInUndoRedoStack: (Model)}}
 */
function getCloneAndModelInUndoRedoStack(undoRedoManager) {
  const modelInUndoRedoStack = undoRedoManager.stack[undoRedoManager.currentPosition];
  return { freshClone: InkModel.cloneModel(modelInUndoRedoStack), modelInUndoRedoStack };
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {{freshClone: Model, modelInUndoRedoStack: (Model)}}
 */
export function undo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition > 0) {
    undoRedoManagerReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoManagerReference.currentPosition);
  }
  return getCloneAndModelInUndoRedoStack(undoRedoManagerReference);
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {Boolean}
 */
export function canRedo(undoRedoManager) {
  return undoRedoManager.currentPosition < (undoRedoManager.stack.length - 1);
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {{freshClone: Model, modelInUndoRedoStack: (Model)}}
 */
export function redo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition < undoRedoManagerReference.stack.length - 1) {
    undoRedoManagerReference.currentPosition += 1;
    logger.debug('redo index', undoRedoManagerReference.currentPosition);
  }
  return getCloneAndModelInUndoRedoStack(undoRedoManagerReference);
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @return {Boolean}
 */
export function canClear(undoRedoManager) {
  return undoRedoManager.stack.length > 1;
}

/**
 * @param {UndoRedoManager} undoRedoManager
 * @param {Model} model
 * @return {Model}
 */
export function clear(undoRedoManager, model) {
  return pushModel(undoRedoManager, model);
}
