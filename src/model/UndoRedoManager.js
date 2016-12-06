import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

export function createUndoRedoManager(model, paperOptions) {
  const manager = { stack: [], maxSize: paperOptions.undoRedoMaxStackSize };
  if (model) {
    manager.stack.push(model);
  }
  manager.currentPosition = manager.stack.length - 1;
  return manager;
}

export function getModel(undoRedoManager, position = undoRedoManager.currentPosition) {
  return InkModel.cloneModel(undoRedoManager.stack[position]);
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param undoRedoManager
 * @param model
 * @returns {*}
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

export function canUndo(undoRedoManager) {
  return undoRedoManager.currentPosition > 0;
}

function getCloneAndModelInUndoRedoStack(undoRedoManagerReference) {
  const modelInUndoRedoStack = undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition];
  return { freshClone: InkModel.cloneModel(modelInUndoRedoStack), modelInUndoRedoStack };
}

export function undo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition > 0) {
    undoRedoManagerReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoManagerReference.currentPosition);
  }
  return getCloneAndModelInUndoRedoStack(undoRedoManagerReference);
}

export function canRedo(undoRedoManager) {
  return undoRedoManager.currentPosition < (undoRedoManager.stack.length - 1);
}

export function redo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition < undoRedoManagerReference.stack.length - 1) {
    undoRedoManagerReference.currentPosition += 1;
    logger.debug('redo index', undoRedoManagerReference.currentPosition);
  }
  return getCloneAndModelInUndoRedoStack(undoRedoManagerReference);
}

export function canClear(undoRedoManager) {
  return undoRedoManager.stack.length > 1;
}

export function clear(undoRedoManager, model) {
  return pushModel(undoRedoManager, model);
}
