import cloneJSObject from '../util/Cloner';
import { modelLogger as logger } from '../configuration/LoggerConfig';


export function createUndoRedoManager(from) {
  return cloneJSObject({ stack: [], currentPosition: -1 }, from);
}

export function undo(undoRedoManager) {
  const newManager = cloneJSObject({}, undoRedoManager);
  if (newManager.currentPosition > 0) {
    newManager.currentPosition -= 1;
  }
  return { newManager, newModel: newManager.stack[newManager.currentPosition] };
}

export function redo(undoRedoManager) {
  const newManager = cloneJSObject({}, undoRedoManager);
  if (newManager.currentPosition < newManager.stack.length - 1) {
    newManager.currentPosition += 1;
    logger.debug('redo index', newManager.currentPosition);
  }
  return { newManager, newModel: newManager.stack[newManager.currentPosition] };
}

export function pushModel(undoRedoManager, model) {
  const returnedManager = cloneJSObject({}, undoRedoManager);
  returnedManager.currentPosition += 1;
  returnedManager.stack = returnedManager.stack.slice(0, returnedManager.currentPosition);
  returnedManager.stack.push(model);
  return returnedManager;
}
