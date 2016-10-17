import cloneJSObject from '../util/Cloner';
import { modelLogger as logger } from '../configuration/LoggerConfig';


export function createUndoRedoManager(from) {
  return cloneJSObject({ stack: [], currentPosition: -1 }, from);
}

export function undo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition > 0) {
    undoRedoManagerReference.currentPosition -= 1;
  }
  return { undoRedoManagerReference, newModel: undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition] };
}

export function redo(undoRedoManager) {
  const undoRedoManagerReference = undoRedoManager;
  if (undoRedoManagerReference.currentPosition < undoRedoManagerReference.stack.length - 1) {
    undoRedoManagerReference.currentPosition += 1;
    logger.debug('redo index', undoRedoManagerReference.currentPosition);
  }
  return { undoRedoManagerReference, newModel: undoRedoManagerReference.stack[undoRedoManagerReference.currentPosition] };
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param undoRedoManager
 * @param modelParam
 * @returns {*}
 */
export function pushModel(undoRedoManager, modelParam) {
  const modelReference = modelParam;
  const undoRedoManagerReference = undoRedoManager;
  undoRedoManagerReference.currentPosition += 1;
  undoRedoManagerReference.stack = undoRedoManagerReference.stack.slice(0, undoRedoManagerReference.currentPosition);
  modelReference.undoRedoPosition = undoRedoManagerReference.currentPosition;
  undoRedoManagerReference.stack.push(cloneJSObject(modelReference));
  return undoRedoManagerReference;
}

/**
 * Update in the undoRedoManager stack the model given in param.
 * @param undoRedoManager
 * @param model
 * @returns undoRedoManager ref (same as in param)
 */
export function updateModelInStack(undoRedoManager, model) {
  const returnedManagerReference = undoRedoManager;
  returnedManagerReference.stack[model.undoRedoPosition] = cloneJSObject(model);
  return returnedManagerReference;
}
