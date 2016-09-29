import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import cloneJSObject from '../util/Cloner';

export function createModel() {
  return {
    recognizedComponents: {},
    recognizedStrokes: [],
    nextRecognitionRequestId: 0,
    currentRecognitionId: undefined,
    lastRecognitionRequestId: -1,
    currentStroke: StrokeComponent.createStrokeComponent(),
    pendingStrokes: {},
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
     segmentList : []
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

export function clone(root, model) {
  const clonedObject = cloneJSObject(root, model);
  return clonedObject;
}

export function compactToString(model) {
  const pendingStrokeLength = Object.keys(model.pendingStrokes).filter(key => model.pendingStrokes[key] !== undefined).reduce((a, b) => a + 1, 0);
  return `${model.creationTime} [${model.recognizedStrokes.length}|${pendingStrokeLength}]`;
}

export function updatePendingStrokes(model, stroke) {
  const returnedModel = clone({}, model);
  if (!model.pendingStrokes[model.nextRecognitionRequestId]) {
    returnedModel.pendingStrokes[model.nextRecognitionRequestId] = [];
  }
  returnedModel.pendingStrokes[model.nextRecognitionRequestId].push(stroke);
  return returnedModel;
}

export function getPendingStrokesAsArray(model) {
  return Object.keys(model.pendingStrokes)
      .filter(key => model.pendingStrokes[key] !== undefined)
      .reduce((a, b) => b.concat(a), []);
}

export function penUp(model, point) {
  let returnedModel = clone({}, model);
  logger.debug('penUp', point);
  const currentStroke = StrokeComponent.addPoint(returnedModel.currentStroke, point);
  returnedModel = updatePendingStrokes(returnedModel, currentStroke);
  //Resetting the current stroke to an empty one
  returnedModel.currentStroke = StrokeComponent.createStrokeComponent();
  return returnedModel;
}

export function penDown(model, point) {
  const returnedModel = clone({}, model);
  logger.debug('penDown', point);
  returnedModel.currentStroke = StrokeComponent.addPoint(returnedModel.currentStroke, point);
  returnedModel.currentStroke = StrokeComponent.addPoint(returnedModel.currentStroke, point);
  return returnedModel;
}

export function penMove(model, point) {
  const returnedModel = clone({}, model);
  logger.debug('penMove', point);
  returnedModel.currentStroke = StrokeComponent.addPoint(returnedModel.currentStroke, point);
  return returnedModel;
}

export function extractNonRecognizedStrokes(model) {
  let nonRecognizedStrokes = [];
  for (let recognitionRequestId = (model.lastRecognitionRequestId + 1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++) {
    nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
  }
  return nonRecognizedStrokes;
}

function mergeBounds(boundA, boundB) {
  const newBound = {
    minX: Math.min(boundA.minX, boundB.minX),
    maxX: Math.min(boundA.maxX, boundB.maxX),
    minY: Math.min(boundA.minY, boundB.minY),
    maxY: Math.min(boundA.maxY, boundB.maxY)
  };
  return newBound;
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
  //TODO Recode the export
}
