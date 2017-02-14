import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';

/**
 * Undo/redo manager
 * @typedef {Object} UndoRedoManager
 * @property {function(undoRedoContext: UndoRedoContext, model: Model): Promise.<Model>} pushModel Push the current model into the undo/redo context.
 * @property {function(undoRedoContext: UndoRedoContext): Promise.<Model>} undo Undo.
 * @property {function(undoRedoContext: UndoRedoContext): Promise.<Model>} redo Redo.
 * @property {function(undoRedoContext: UndoRedoContext, model: Model, options: Options): Promise.<Model>} clear Clear.
 */

/**
 * Get current model in stack
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Boolean} [clone=true] Whether or not to clone the model
 * @return {Promise.<Model>}
 */
export function getModel(undoRedoContext, clone = true) {
  const position = undoRedoContext.currentPosition;
  const model = undoRedoContext.stack[position];
  model.canUndo = position > 0;
  model.canClear = position > 0 && model.rawStrokes.length > 0;
  model.canRedo = position < (undoRedoContext.stack.length - 1);
  return Promise.resolve(clone ? InkModel.cloneModel(model) : model);
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Model} model Current model
 * @return {Promise.<Model>} Pushed model
 */
export function pushModel(undoRedoContext, model) {
  const modelReference = model;
  if (!modelReference.resultTypes.includes(MyScriptJSConstants.EventType.CHANGE)) {
    modelReference.resultTypes.push(MyScriptJSConstants.EventType.CHANGE);
  }
  const undoRedoContextReference = undoRedoContext;
  undoRedoContextReference.currentPosition += 1;
  undoRedoContextReference.stack = undoRedoContextReference.stack.slice(0, undoRedoContextReference.currentPosition);
  undoRedoContextReference.stack.push(InkModel.cloneModel(modelReference));
  if (undoRedoContextReference.stack.length > undoRedoContextReference.maxSize) {
    undoRedoContextReference.stack.shift();
    undoRedoContextReference.currentPosition--;
  }
  return getModel(undoRedoContext, false);
}

/**
 * Update the current undo/redo model.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {Model} model Current model
 * @return {Promise.<Model>} Updated model
 */
export function updateModel(undoRedoContext, model) {
  undoRedoContext.stack.splice(undoRedoContext.currentPosition, 1, InkModel.cloneModel(model));
  return getModel(undoRedoContext, false);
}

/**
 * Undo
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
 * Redo
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
