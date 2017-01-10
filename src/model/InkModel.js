import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import { getSymbolsBounds, getDefaultSymbols } from './Symbol';

/**
 * Recognition positions
 * @typedef {Object} RecognitionPositions
 * @property {Number} lastSentPosition Index of the last sent stroke.
 * @property {Number} lastReceivedPosition Index of the last received stroke.
 */

/**
 * InkPaper model
 * @typedef {Object} Model
 * @property {String} state Current state of the model. Mainly here for debugging purpose.
 * @property {Stroke} currentStroke Stroke in building process.
 * @property {String} currentRecognitionId Current recognition id.
 * @property {Array<Stroke>} rawStrokes List of captured strokes.
 * @property {RecognitionPositions} lastRecognitionPositions Last recognition sent/received stroke indexes.
 * @property {Array<Object>} defaultSymbols Default symbols, relative to the current recognition type.
 * @property {Array<Object>} recognizedSymbols Symbols to render (e.g. stroke, shape primitives, string, characters...).
 * @property {Object} rawResult The recognition output as return by the recognition service.
 * @property {Number} creationTime Date of creation timestamp.
 */

/**
 * Bounding box
 * @typedef {Object} Bounds
 * @property {Number} minX Minimal x coordinate
 * @property {Number} maxX Maximal x coordinate
 * @property {Number} minY Minimal y coordinate
 * @property {Number} maxY Maximal y coordinate
 */

/**
 * Create a new model
 * @param {Options} [options] Parameters to use to populate default recognition symbols
 * @return {Model} New model
 */
export function createModel(options) {
  // see @typedef documentation on top
  return {
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    currentStroke: undefined,
    currentRecognitionId: undefined,
    rawStrokes: [],
    lastRecognitionPositions: {
      lastSentPosition: -1,
      lastReceivedPosition: -1
    },
    defaultSymbols: options ? getDefaultSymbols(options) : [],
    recognizedSymbols: [],
    rawResult: undefined,
    creationTime: new Date().getTime()
  };
}

/**
 * Return a unique identifier of the model. Used for dev purpose.
 * @param {Model} model Current model
 * @return {String} String representing the model
 */
export function compactToString(model) {
  return `${model.creationTime} [${model.rawStrokes.length}]`;
}

/**
 * Check if the model needs to be redrawn.
 * @param {Model} model Current model
 * @return {Boolean} True if the model needs to be redrawn, false otherwise
 */
export function needRedraw(model) {
  return (model.rawStrokes.length !== model.recognizedSymbols.filter(symbol => symbol.type === 'stroke').length);
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
  modelReference.rawStrokes.push(stroke);
  return modelReference;
}

/**
 * Get the strokes that needs to be recognized
 * @param {Model} model Current model
 * @param {Number} [position=lastReceived] Index from where to extract strokes
 * @return {Array<Stroke>} Pending strokes
 */
export function extractPendingStrokes(model, position = model.lastRecognitionPositions.lastReceivedPosition + 1) {
  return model.rawStrokes.slice(position);
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
    modelBounds = getSymbolsBounds(model.rawStrokes, modelBounds);
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
  clonedModel.rawStrokes = [...model.rawStrokes];
  clonedModel.lastRecognitionPositions = Object.assign({}, model.lastRecognitionPositions);
  clonedModel.rawResult = model.rawResult ? Object.assign({}, model.rawResult) : undefined;
  clonedModel.creationTime = new Date().getTime();
  return clonedModel;
}

/**
 * Update the last stroke sent position
 * @param {Model} model Current model to update
 * @param {Number} lastSentPosition Zero-based index of the last sent stroke
 * @return {Model} Updated model
 */
function updateLastSentPosition(model, lastSentPosition) {
  const modelReference = model;
  // Incrementation of the recognition request id
  modelReference.lastRecognitionPositions.lastSentPosition = lastSentPosition;
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
  const modelReference = updateLastSentPosition(model, model.rawStrokes.length - 1);
  const modelCloneReference = updateLastSentPosition(modelClone, modelReference.lastRecognitionPositions.lastSentPosition);
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
  if (recognizedModelRef.lastRecognitionPositions.lastSentPosition > inkPaperModel.lastRecognitionPositions.lastReceivedPosition) {
    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastSentPosition;
    updatePropertiesFromRecognition(inkPaperModel,
                                    recognizedModelRef.state,
                                    recognizedModelRef.recognizedSymbols,
                                    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition,
                                    recognizedModelRef.rawResult);
  }
  return recognizedModelRef;
}
