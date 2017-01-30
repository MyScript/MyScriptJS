import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo state
 * @typedef {Object} UndoRedoState
 * @property {Boolean} canUndo True if undo is available, false otherwise.
 * @property {Boolean} canRedo True if redo is available, false otherwise.
 * @property {Boolean} canClear True if clear is available, false otherwise.
 */

/**
 * Undo/redo manager
 * @typedef {Object} UndoRedoManager
 * @property {function(undoRedoContext: UndoRedoContext): UndoRedoState} getState Get the state of the undo/redo context.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model): Promise.<Model>} pushModel Push the current model into the undo/redo context.
 * @property {function(undoRedoContext: UndoRedoContext): Promise.<Model>} undo Undo.
 * @property {function(undoRedoContext: UndoRedoContext): Promise.<Model>} redo Redo.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, options: Options): Promise.<Model>} clear Clear.
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
 * @param {Model} model Current model
 * @param {Options} options Current options
 * @return {Promise.<Model>}
 */
export function clear(undoRedoContext, model, options) {
  return pushModel(undoRedoContext, InkModel.createModel(options));
}
