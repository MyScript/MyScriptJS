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
 * Raw results
 * @typedef {Object} RawResults
 * @property {Object} typeset The typeset result
 * @property {Object} recognition The recognition output as return by the recognition service.
 * @property {Object} state The state of the model.
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
 * @property {Number} lastRenderedPosition Last rendered recognized symbol position
 * @property {RawResults} rawResults The recognition output as return by the recognition service.
 * @property {Number} creationTime Date of creation timestamp.
 * @property {Number} modificationTime Date of lastModification.
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
    recognizedSymbols: undefined,
    lastRenderedPosition: -1,
    rawResults: {
      typeset: undefined,
      recognition: undefined,
      state: undefined
    },
    creationTime: new Date().getTime(),
    modificationTime: undefined
  };
}

/**
 * Check if the model needs to be redrawn.
 * @param {Model} model Current model
 * @return {Boolean} True if the model needs to be redrawn, false otherwise
 */
export function needRedraw(model) {
  return model.recognizedSymbols ? (model.rawStrokes.length !== model.recognizedSymbols.filter(symbol => symbol.type === 'stroke').length) : false;
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
 * @param {Object} properties Properties to be applied to the current stroke
 * @return {Model} Updated model
 */
export function initPendingStroke(model, point, properties) {
  const modelReference = model;
  modelReference.state = MyScriptJSConstants.ModelState.PENDING;
  logger.debug('initPendingStroke', point);
  // Setting the current stroke to an empty one
  modelReference.currentStroke = StrokeComponent.createStrokeComponent(properties);
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
 * Extract strokes from an ink range
 * @param {Model} model Current model
 * @param {Number} firstStroke First stroke index to extract
 * @param {Number} lastStroke Last stroke index to extract
 * @param {Number} firstPoint First point index to extract
 * @param {Number} lastPoint Last point index to extract
 * @return {Array<Stroke>} The extracted strokes
 */
export function extractStrokesFromInkRange(model, firstStroke, lastStroke, firstPoint, lastPoint) {
  return model.rawStrokes.slice(firstStroke, lastStroke + 1).map((stroke, index, slicedStrokes) => {
    if (slicedStrokes.length < 2) {
      return StrokeComponent.slice(stroke, firstPoint, lastPoint + 1);
    }
    if (index === 0) {
      return StrokeComponent.slice(stroke, firstPoint);
    }
    if (index === (slicedStrokes.length - 1)) {
      return StrokeComponent.slice(stroke, 0, lastPoint + 1);
    }
    return stroke;
  });
}

/**
 * Update model lastSentPosition
 * @param {Model} model
 * @param {Number} [position]
 * @return {Model}
 */
export function updateModelSentPosition(model, position = model.rawStrokes.length - 1) {
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastSentPosition = position;
  return modelReference;
}

/**
 * Update model lastReceivedPosition regarding to lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
export function updateModelReceivedPosition(model) {
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastReceivedPosition = modelReference.lastRecognitionPositions.lastSentPosition;
  return modelReference;
}

/**
 * Reset model lastReceivedPosition and lastSentPosition
 * @param {Model} model
 * @return {Model}
 */
export function resetModelPositions(model) {
  const modelReference = model;
  modelReference.lastRecognitionPositions.lastSentPosition = -1;
  modelReference.lastRecognitionPositions.lastReceivedPosition = -1;
  return modelReference;
}

/**
 * Reset model lastRenderedPosition
 * @param {Model} model
 * @return {Model}
 */
export function resetModelRendererPosition(model) {
  const modelReference = model;
  modelReference.lastRenderedPosition = -1;
  return modelReference;
}

/**
 * Update model lastRenderedPosition
 * @param {Model} model
 * @param {Number} [position]
 * @return {Model}
 */
export function updateModelRenderedPosition(model, position = model.recognizedSymbols ? model.recognizedSymbols.length - 1 : -1) {
  const modelReference = model;
  modelReference.lastRenderedPosition = position;
  return modelReference;
}

/**
 * Get the symbols that needs to be rendered
 * @param {Model} model Current model
 * @param {Number} [position=lastRendered] Index from where to extract symbols
 * @return {Array<Object>}
 */
export function extractPendingRecognizedSymbols(model, position = model.lastRenderedPosition + 1) {
  return model.recognizedSymbols ? model.recognizedSymbols.slice(position) : [];
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
  clonedModel.currentStroke = model.currentStroke ? Object.assign({}, model.currentStroke) : undefined;
  clonedModel.rawStrokes = [...model.rawStrokes];
  clonedModel.lastRecognitionPositions = Object.assign({}, model.lastRecognitionPositions);
  clonedModel.rawResults = Object.assign({}, model.rawResults);
  clonedModel.recognizedSymbols = model.recognizedSymbols ? [...model.recognizedSymbols] : undefined;
  return clonedModel;
}

/**
 * Merge models
 * @param {Array<Model>} models Models to merge (ordered)
 * @return {Model} Updated model
 */
export function mergeModels(...models) {
  return models.reduce((a, b) => {
    const modelRef = a;
    modelRef.state = b.state;
    modelRef.recognizedSymbols = b.recognizedSymbols;
    modelRef.lastRecognitionPositions.lastReceivedPosition = b.lastRecognitionPositions.lastReceivedPosition;
    modelRef.rawResults = b.rawResults;
    return modelRef;
  });
}
