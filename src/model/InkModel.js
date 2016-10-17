import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';

export function createModel() {
  return {
    recognizedComponents: [],
    recognizedStrokes: [],
    nextRecognitionRequestId: 0,
    currentRecognitionId: undefined,
    lastRecognitionRequestId: -1,
    currentStroke: StrokeComponent.createStrokeComponent(),
    pendingStrokes: {},
    test: {},
    /*
     { 0  : [ ]
     recognitionId : array of strokes
     }
     */
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    rawResult: undefined,
    renderingResult: undefined,
    creationTime: new Date().getTime()
    /*
     {
     strokeList : []
     symbolList : [
     {
     type :
     ...

     ]
     inkRange : {}
     }

     */
  };
}

export function compactToString(model) {
  const pendingStrokeLength = Object.keys(model.pendingStrokes).filter(key => model.pendingStrokes[key] !== undefined).reduce((a, b) => a + 1, 0);
  return `${model.creationTime} [${model.recognizedStrokes.length}|${pendingStrokeLength}]`;
}

export function updatePendingStrokes(model, stroke) {
  // We use a reference to the model. The purpose here is to update the pending stroke only.
  const modelReference = model;
  if (!modelReference.pendingStrokes[modelReference.nextRecognitionRequestId]) {
    modelReference.pendingStrokes[modelReference.nextRecognitionRequestId] = [];
  }
  modelReference.pendingStrokes[modelReference.nextRecognitionRequestId].push(stroke);
  return modelReference;
}

export function getPendingStrokesAsArray(model) {
  return Object.keys(model.pendingStrokes)
      .filter(key => model.pendingStrokes[key] !== undefined)
      .reduce((a, b) => b.concat(a), []);
}

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

export function penDown(model, point) {
  const modelReference = model;
  logger.debug('penDown', point);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
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

export function extractNonRecognizedStrokes(model) {
  let nonRecognizedStrokes = [];
  for (let recognitionRequestId = (model.lastRecognitionRequestId + 1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++) {
    nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
  }
  return nonRecognizedStrokes;
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
