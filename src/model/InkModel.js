import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';

export function createModel() {
  return {
    // Current state of the model. Mainly here for debugging purpose.
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    // Stroke in building process.
    currentStroke: StrokeComponent.createStrokeComponent(),
    // Current recogntion id for the model
    currentRecognitionId: undefined,
    // Next recogntion id to use.
    nextRecognitionRequestId: 0,
    // Last recogntion id used.
    lastRecognitionRequestId: -1,
    // List of pending strokes. Atributes of this object are corresponding to the stroke id (1,2,3 ...)
    pendingStrokes: {},
    // TODO
    recognizedComponents: [],
    // TODO
    recognizedStrokes: [],
    // The recognition output as return by the recogntion service.
    rawResult: undefined,
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
  return `${model.creationTime} [${model.recognizedStrokes.length}|${pendingStrokeLength}]`;
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
 * Return the list of pendings strokes as an array.
 * @param model
 * @returns {*}
 */
export function getPendingStrokesAsArray(model) {
  return Object.keys(model.pendingStrokes)
      .filter(key => model.pendingStrokes[key] !== undefined)
      .reduce((a, b) => b.concat(a), []);
}

// FIXME We should remove this function i quess.
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
  // Muttating pending strokes
  updatePendingStrokes(modelReference, currentStroke);
  // Resetting the current stroke to an empty one
  modelReference.currentStroke = StrokeComponent.createStrokeComponent();
  return modelReference;
}

/**
 * Mutate the model by creating a point to the current stroke.
 * @param model
 * @param point
 * @returns {*}
 */
export function penDown(model, point) {
  const modelReference = model;
  logger.debug('penDown', point);
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
    maxX: Math.min(boundA.maxX, boundB.maxX),
    minY: Math.min(boundA.minY, boundB.minY),
    maxY: Math.min(boundA.maxY, boundB.maxY)
  };
}

function extractBounds(stroke) {
  const ret = { minX: Math.min(...stroke.x), maxX: Math.max(...stroke.x) };
  ret.minY = Math.min(...stroke.y);
  ret.minY = Math.max(...stroke.y);
  return ret;
}

/**
 * Get the bounds of the current model.
 * @param model
 * @returns {{minX: Number, maxX: Number, minY: Number, maxY: Number}}
 */
export function getBorderCoordinates(model) {
  let modelBounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };
  modelBounds = model.recognizedStrokes
      .map(extractBounds)
      .reduce(mergeBounds, modelBounds);
  modelBounds = getPendingStrokesAsArray(model).map(extractBounds)
      .reduce(mergeBounds, modelBounds);

  return modelBounds;
}


export function shrinkToMargin(model, marginX, marginY) {
  // TODO Recode the export
}
