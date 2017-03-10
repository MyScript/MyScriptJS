import * as InkModel from '../model/InkModel';
import { modelLogger as logger } from '../configuration/LoggerConfig';

/**
 * Undo/redo manager
 * @typedef {Object} UndoRedoManager
 * @property {function(configuration: Configuration, model: Model, undoRedoContext: UndoRedoContext, callback: RecognizerCallback)} updateModel Push the current model into the undo/redo context.
 * @property {function(configuration: Configuration, model: Model, undoRedoContext: UndoRedoContext, callback: RecognizerCallback)} undo Undo.
 * @property {function(configuration: Configuration, model: Model, undoRedoContext: UndoRedoContext, callback: RecognizerCallback)} redo Redo.
 * @property {function(configuration: Configuration, model: Model, undoRedoContext: UndoRedoContext, callback: RecognizerCallback)} clear Clear.
 */

/**
 * Get current model in stack
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context
 * @param {function(err: Object, res: Object)} callback
 * @param {Boolean} [clone=true] Whether or not to clone the model
 */
export function getModel(undoRedoContext, callback, clone = true) {
  const position = undoRedoContext.currentPosition;
  const model = undoRedoContext.stack[position];
  model.rawResults.state = {
    canUndo: position > 0,
    canClear: position > 0 && model.rawStrokes.length > 0,
    canRedo: position < (undoRedoContext.stack.length - 1)
  };
  callback(undefined, clone ? InkModel.cloneModel(model) : model);
}

/**
 * Mutate the undoRedo stack by adding a new model to it.
 * @param {Configuration} configuration Current configuration.
 * @param {Model} model Current model.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {function(err: Object, res: Object)} callback
 */
export function updateModel(configuration, model, undoRedoContext, callback) {
  // Used to update the model with the recognition result if relevant
  const modelIndex = undoRedoContext.stack.findIndex(item => (item.modificationTime === model.modificationTime) && (item.rawStrokes.length === model.rawStrokes.length));

  const modelReference = model;
  modelReference.modificationTime = new Date().getTime();
  if (modelIndex > -1) {
    undoRedoContext.stack.splice(modelIndex, 1, InkModel.cloneModel(modelReference));
    logger.debug('model updated', modelReference);
  } else {
    const undoRedoContextReference = undoRedoContext;
    undoRedoContextReference.currentPosition += 1;
    undoRedoContextReference.stack = undoRedoContextReference.stack.slice(0, undoRedoContextReference.currentPosition);
    undoRedoContextReference.stack.push(InkModel.cloneModel(modelReference));
    if (undoRedoContextReference.stack.length > undoRedoContextReference.maxSize) {
      undoRedoContextReference.stack.shift();
      undoRedoContextReference.currentPosition--;
    }
    logger.debug('model pushed', modelReference);
  }
  getModel(undoRedoContext, callback, false);
}

/**
 * Undo
 * @param {Configuration} configuration Current configuration.
 * @param {Model} model Current model.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {function(err: Object, res: Object)} callback
 */
export function undo(configuration, model, undoRedoContext, callback) {
  const undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition > 0) {
    undoRedoContextReference.currentPosition -= 1;
    logger.debug('undo index', undoRedoContextReference.currentPosition);
  }
  getModel(undoRedoContext, callback);
}

/**
 * Redo
 * @param {Configuration} configuration Current configuration.
 * @param {Model} model Current model.
 * @param {UndoRedoContext} undoRedoContext Current undo/redo context.
 * @param {function(err: Object, res: Object)} callback
 */
export function redo(configuration, model, undoRedoContext, callback) {
  const undoRedoContextReference = undoRedoContext;
  if (undoRedoContextReference.currentPosition < undoRedoContextReference.stack.length - 1) {
    undoRedoContextReference.currentPosition += 1;
    logger.debug('redo index', undoRedoContextReference.currentPosition);
  }
  getModel(undoRedoContext, callback);
}
