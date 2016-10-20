import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';

export function createModel() {
  return {
    // Current state of the model. Mainly here for debugging purpose.
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    // Stroke in building process.
    currentStroke: undefined,
    // Current recognition id for the model
    currentRecognitionId: undefined,
    // Next recognition id to use.
    nextRecognitionRequestId: 0,
    // Last recognition id used.
    lastRecognitionRequestId: -1,
    // List of pending strokes. Attributes of this object are corresponding to the stroke id (1,2,3 ...)
    pendingStrokes: {},
    // Contains the symbol to render. It could be : a stroke, a shape(& analyzer) primitives, string, characters...
    recognizedSymbols: [],
    // All the raw strokes already recognized
    rawRecognizedStrokes: [],
    // The recognition output as return by the recognition service.
    rawResult: undefined,
    // Context of recognition, usefull for incremental recognitions. Always used as a reference.
    recognitionContext: {},
    // Date of creation
    creationTime: new Date().getTime()
  };
}

/**
 * Return a unique identifier of the model. Used for dev purpose.
 * @param model
 * @returns {string}
 */
export function compactToString(model) {
  const pendingStrokeLength = Object.keys(model.pendingStrokes).filter(key => model.pendingStrokes[key] !== undefined).reduce((a, b) => a + 1, 0);
  return `${model.creationTime} [${model.rawRecognizedStrokes.length}|${pendingStrokeLength}]`;
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd.
 * @param model
 * @param strokeToAdd
 * @returns {*}
 */
export function updatePendingStrokes(model, strokeToAdd) {
  // We use a reference to the model. The purpose here is to update the pending strokeToAdd only.
  const modelReference = model;
  if (!modelReference.pendingStrokes[modelReference.nextRecognitionRequestId]) {
    modelReference.pendingStrokes[modelReference.nextRecognitionRequestId] = [];
  }
  modelReference.pendingStrokes[modelReference.nextRecognitionRequestId].push(strokeToAdd);
  return modelReference;
}

/**
 * Return the list of pending strokes as an array.
 * @param model
 * @returns {*}
 */
export function getAllPendingStrokesAsArray(model) {
  return Object.keys(model.pendingStrokes)
      .filter(key => model.pendingStrokes[key] !== undefined)
      .reduce((a, b) => b.concat(a), []);
}

export function extractNonRecognizedStrokes(model) {
  let nonRecognizedStrokes = [];
  for (let recognitionRequestId = (model.lastRecognitionRequestId + 1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++) {
    nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
  }
  return nonRecognizedStrokes;
}

/**
 * Mutate the model by adding the new point on a penUp.
 * @param model
 * @param point
 * @returns {*}
 */
export function penUp(model, point) {
  const modelReference = model;
  logger.debug('penUp', point);
  const currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  // Mutating pending strokes
  updatePendingStrokes(modelReference, currentStroke);
  // Resetting the current stroke to an undefined one
  modelReference.currentStroke = undefined;
  return modelReference;
}

/**
 * Mutate the model by creating a point to the current stroke.
 * @param model
 * @param point
 * @param style
 * @returns {*}
 */
export function penDown(model, point, style) {
  const modelReference = model;
  logger.debug('penDown', point);
  // Setting the current stroke to an empty one
  modelReference.currentStroke = StrokeComponent.createStrokeComponent(style);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  return modelReference;
}

/**
 * Mutate the model by adding a point to the current model.
 * @param model
 * @param point
 * @returns {*}
 */
export function penMove(model, point) {
  const modelReference = model;
  logger.debug('penMove', point);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  return modelReference;
}

function mergeBounds(boundA, boundB) {
  return {
    minX: Math.min(boundA.minX, boundB.minX),
    maxX: Math.max(boundA.maxX, boundB.maxX),
    minY: Math.min(boundA.minY, boundB.minY),
    maxY: Math.max(boundA.maxY, boundB.maxY)
  };
}

function extractBounds(stroke) {
  const ret = {
    minX: Math.min(...stroke.x),
    maxX: Math.max(...stroke.x),
    minY: Math.min(...stroke.y),
    maxY: Math.max(...stroke.y)
  };
  return ret;
}

/**
 * Get the bounds of the current model.
 * @param model
 * @returns {{minX: Number, maxX: Number, minY: Number, maxY: Number}}
 */
export function getBorderCoordinates(model) {
  let modelBounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };
  modelBounds = model.rawRecognizedStrokes
      .map(extractBounds)
      .reduce(mergeBounds, modelBounds);
  modelBounds = getAllPendingStrokesAsArray(model).map(extractBounds)
      .reduce(mergeBounds, modelBounds);

  return modelBounds;
}


export function shrinkToMargin(model, marginX, marginY) {
  // TODO Recode the export
}

export function cloneModel(modelToClone) {
  const clonedModel = Object.assign({}, modelToClone);
  // We clone the properties that need to be. Take care of arrays.
  clonedModel.state = Object.assign({}, modelToClone.state);
  clonedModel.rawRecognizedStrokes = [...modelToClone.rawRecognizedStrokes];
  clonedModel.recognizedSymbols = [...modelToClone.recognizedSymbols];
  clonedModel.currentStroke = Object.assign({}, modelToClone.currentStroke);
  clonedModel.rawResult = undefined;
  clonedModel.creationTime = new Date().getTime();
  clonedModel.pendingStrokes = Object.assign({}, modelToClone.pendingStrokes);
  return clonedModel;
}
