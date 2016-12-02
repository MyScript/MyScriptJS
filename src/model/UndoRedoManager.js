import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

export function createUndoRedoManager() {
  return { stack: [], currentPosition: -1 };
}

export function canUndo(undoRedoManager) {
  return undoRedoManager.currentPosition > 0;
}

export function undo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition > 0) {
    undoRedoManagerReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoManagerReference.currentPosition);
  }
  return InkModel.cloneModel(undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition]);
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
  return InkModel.cloneModel(undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition]);
}

export function canClear(undoRedoManager) {
  return undoRedoManager.stack.length > 1;
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
  modelReference.undoRedoPosition = undoRedoManagerReference.currentPosition;
  undoRedoManagerReference.stack.push(modelReference);
  return InkModel.cloneModel(undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition]);
}

/**
 * Update in the undoRedoManager stack the model given in param.
 * @param undoRedoManager
 * @param model
 * @returns {*}
 */
export function updateModelInStack(undoRedoManager, model) {
  const undoRedoManagerReference = undoRedoManager;
  undoRedoManagerReference.stack[model.undoRedoPosition] = model;
  return InkModel.cloneModel(undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition]);
}
