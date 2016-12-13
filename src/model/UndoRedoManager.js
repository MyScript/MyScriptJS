import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * @typedef {Object} UndoRedoManager
 * @property {Array<Model>} stack
 * @property {Number} currentPosition
 * @property {Number} maxSize
 */

/**
 * @param {Model} model Current model
 * @param {Options} options Current configuration
 * @return {UndoRedoManager} New undo/redo manager
 */
export function createUndoRedoManager(model, options) {
  const stack = [];
  if (model) {
    stack.push(model);
  }
  return {
    stack,
    currentPosition: stack.length - 1,
    maxSize: options.undoRedoMaxStackSize };
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Number} [position=currentPosition] Position to retrieve the model
 * @return {Model} Retrieved model
 */
export function getModel(undoRedoManager, position = undoRedoManager.currentPosition) {
  return InkModel.cloneModel(undoRedoManager.stack[position]);
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Model} model Current model
 * @return {Model} Copy of pushed model
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
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {Boolean} True if undo/redo stack is empty, false otherwise
 */
export function canUndo(undoRedoManager) {
  return undoRedoManager.currentPosition > 0;
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {{freshClone: Model, modelInUndoRedoStack: (Model)}}
 */
function getCloneAndModelInUndoRedoStack(undoRedoManager) {
  const modelInUndoRedoStack = undoRedoManager.stack[undoRedoManager.currentPosition];
  return { freshClone: InkModel.cloneModel(modelInUndoRedoStack), modelInUndoRedoStack };
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
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
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {Boolean} True if currentPosition is the last in stack, false otherwise
 */
export function canRedo(undoRedoManager) {
  return undoRedoManager.currentPosition < (undoRedoManager.stack.length - 1);
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
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
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @return {Boolean} True if clearing is authorized, false otherwise
 */
export function canClear(undoRedoManager) {
  return undoRedoManager.stack.length > 1;
}

/**
 * @param {UndoRedoManager} undoRedoManager Current undo/redo manager
 * @param {Model} model Empty model to be pushed in stack
 * @return {Model} Copy of pushed model
 */
export function clear(undoRedoManager, model) {
  return pushModel(undoRedoManager, model);
}
