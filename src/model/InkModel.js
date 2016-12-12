import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import { getSymbolsBounds, getDefaultSymbols } from './Symbol';

/**
 * @typedef {Object} Model
 * @property {String} state
 * @property {Stroke} currentStroke
 * @property {String} currentRecognitionId
 * @property {Array<Stroke>} pendingStrokes
 * @property {{lastSendPosition: Number, lastReceivedPosition: Number}} lastRecognitionPositions
 * @property {Array<Object>} defaultSymbols
 * @property {Array<Object>} recognizedSymbols
 * @property {Object} rawResult
 * @property {Number} creationTime
 */

/**
 * @typedef {Object} Bounds
 * @property {Number} minX
 * @property {Number} maxX
 * @property {Number} minY
 * @property {Number} maxY
 */

/**
 * Create a new model
 * @param {Parameters} [paperOptions] Parameters to use to populate default recognition symbols
 * @return {Model} New model
 */
export function createModel(paperOptions) {
  return {
    // Current state of the model. Mainly here for debugging purpose.
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    // Stroke in building process.
    currentStroke: undefined,
    // Current recognition id for the model
    currentRecognitionId: undefined,
    // List of pending strokes. Attributes of this object are corresponding to the stroke id (1,2,3 ...)
    // This attribute will never mutate.
    pendingStrokes: [],
    lastRecognitionPositions: {
      lastSendPosition: -1,
      lastReceivedPosition: -1
    },
    // Default symbols, relative to the recognition
    defaultSymbols: paperOptions ? getDefaultSymbols(paperOptions) : [],
    // Contains the symbol to render. It could be : a stroke, a shape(& analyzer) primitives, string, characters...
    recognizedSymbols: [],
    // The recognition output as return by the recognition service.
    rawResult: undefined,
    // Date of creation
    creationTime: new Date().getTime()
  };
}

/**
 * Return a unique identifier of the model. Used for dev purpose.
 * @param {Model} model Current model
 * @return {String} String representing the model
 */
export function compactToString(model) {
  return `${model.creationTime} [${model.pendingStrokes.length}]`;
}

/**
 * Check if the model needs to be redrawn.
 * @param {Model} model Current model
 * @return {Boolean} True if the model needs to be redrawn, false otherwise
 */
export function needRedraw(model) {
  return (model.pendingStrokes.length !== model.recognizedSymbols.filter(symbol => symbol.type === 'stroke').length);
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd.
 * @param {Model} model Current model
 * @param {Stroke} stroke Stroke to be added to pending ones
 * @return {Model} Updated model
 */
export function addStroke(model, stroke) {
  // We use a reference to the model. The purpose here is to update the pending stroke only.
  const modelReference = model;
  modelReference.pendingStrokes.push(stroke);
  return modelReference;
}

/**
 * Get the strokes that needs to be recognized
 * @param {Model} model Current model
 * @param {Number} [position=lastReceived] Index from where to extract strokes
 * @return {Array<Stroke>} Pending strokes
 */
export function extractPendingStrokes(model, position = model.lastRecognitionPositions.lastReceivedPosition + 1) {
  return model.pendingStrokes.slice(position);
}

/**
 * Mutate the model by adding a point and close the current stroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to create current stroke
 * @param {Object} style Style to be applied to the current stroke
 * @return {Model} Updated model
 */
export function initPendingStroke(model, point, style) {
  const modelReference = model;
  logger.debug('initPendingStroke', point);
  // Setting the current stroke to an empty one
  modelReference.currentStroke = StrokeComponent.createStrokeComponent(style);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  return modelReference;
}

/**
 * Mutate the model by adding a point to the current pending stroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to be append to the current stroke
 * @return {Model} Updated model
 */
export function appendToPendingStroke(model, point) {
  const modelReference = model;
  logger.debug('appendToPendingStroke', point);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  return modelReference;
}

/**
 * Mutate the model by adding the new point on a initPendingStroke.
 * @param {Model} model Current model
 * @param {{x: Number, y: Number, t: Number}} point Captured point to be append to the current stroke
 * @return {Model} Updated model
 */
export function endPendingStroke(model, point) {
  const modelReference = model;
  logger.debug('endPendingStroke', point);
  const currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  // Mutating pending strokes
  addStroke(modelReference, currentStroke);
  // Resetting the current stroke to an undefined one
  delete modelReference.currentStroke;
  return modelReference;
}
/**
 * Get the bounds of the current model.
 * @param {Model} model Current model
 * @return {Bounds} Bounding box enclosing the current drawn model
 */
export function getBorderCoordinates(model) {
  let modelBounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };

  // Default symbols
  if (model.defaultSymbols && model.defaultSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.defaultSymbols, modelBounds);
  }
  // Recognized symbols
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.recognizedSymbols, modelBounds);
    // Pending strokes
    modelBounds = getSymbolsBounds(extractPendingStrokes(model), modelBounds);
  } else {
    modelBounds = getSymbolsBounds(model.pendingStrokes, modelBounds);
  }
  return modelBounds;
}

/**
 * Clone model
 * @param {Model} model Current model
 * @return {Model} Clone of the current model
 */
export function cloneModel(model) {
  const clonedModel = Object.assign({}, model);
  // We clone the properties that need to be. Take care of arrays.
  clonedModel.defaultSymbols = [...model.defaultSymbols];
  clonedModel.recognizedSymbols = [...model.recognizedSymbols];
  clonedModel.currentStroke = model.currentStroke ? Object.assign({}, model.currentStroke) : undefined;
  clonedModel.pendingStrokes = [...model.pendingStrokes];
  clonedModel.lastRecognitionPositions = Object.assign({}, model.lastRecognitionPositions);
  clonedModel.rawResult = model.rawResult ? Object.assign({}, model.rawResult) : undefined;
  clonedModel.creationTime = new Date().getTime();
  return clonedModel;
}

/**
 * Update the last stroke sent position
 * @param {Model} model Current model to update
 * @param {Number} lastSendPosition Zero-based index of the last sent stroke
 * @return {Model} Updated model
 */
function updateLastSendPosition(model, lastSendPosition) {
  const modelReference = model;
  // Incrementation of the recognition request id
  modelReference.lastRecognitionPositions.lastSendPosition = lastSendPosition;
  return modelReference;
}

/**
 * Update the recognition properties
 * @param {Model} model Current model to update
 * @param {String} state Recognition state
 * @param {Array<Object>} recognizedSymbols Symbols recognized
 * @param {Number} lastReceivedPosition Zero-based index of the last received stroke
 * @param {Object} rawResult Recognition result
 * @return {Model} Updated model
 */
function updatePropertiesFromRecognition(model, state, recognizedSymbols, lastReceivedPosition, rawResult) {
  const modelReference = model;
  modelReference.state = state;
  modelReference.recognizedSymbols = recognizedSymbols;
  modelReference.lastRecognitionPositions.lastReceivedPosition = lastReceivedPosition;
  modelReference.rawResult = rawResult;
  return modelReference;
}

/**
 * Update recognition positions
 * @param {Model} model Current model
 * @param {Model} modelClone Cloned model with recognition positions
 * @return {Model} Updated model
 */
// FIXME: hard to understand which one update which other -> try to have just one model in input, for understanding
export function updateRecognitionPositions(model, modelClone) {
  // Incrementation of the recognition request id
  const modelReference = updateLastSendPosition(model, model.pendingStrokes.length - 1);
  const modelCloneReference = updateLastSendPosition(modelClone, modelReference.lastRecognitionPositions.lastSendPosition);
  return modelReference;
}

/**
 * Merge models
 * @param {Model} recognizedModel Model with recognition parameters
 * @param {Model} inkPaperModel Current model
 * @return {Model} Updated model
 */
// FIXME: hard to understand which one update which other -> try to have just one model in input, for understanding
export function mergeRecognizedModelIntoModel(recognizedModel, inkPaperModel) {
  const recognizedModelRef = recognizedModel;
  if (recognizedModelRef.lastRecognitionPositions.lastSendPosition > inkPaperModel.lastRecognitionPositions.lastReceivedPosition) {
    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastSendPosition;
    updatePropertiesFromRecognition(inkPaperModel,
                                    recognizedModelRef.state,
                                    recognizedModelRef.recognizedSymbols,
                                    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition,
                                    recognizedModelRef.rawResult);
  }
  return recognizedModelRef;
}
