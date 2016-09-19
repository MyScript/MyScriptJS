import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';


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
    state: MyScriptJSConstants.ModelState.INITIALYZING,
    rawResult: undefined,
    renderingResult: undefined
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


export function updatePendingStrokes(model, pendingStrokeId, stroke) {
  const returnedModel = Object.assign({}, model);
  if (!model.pendingStrokes[pendingStrokeId]) {
    returnedModel.pendingStrokes[pendingStrokeId] = [];
  }
  returnedModel.pendingStrokes[pendingStrokeId].push(stroke);
  return returnedModel;
}

export function penUp(model, point) {
  const returnedModel = Object.assign({}, model);
  logger.debug('penUp', point);
  returnedModel.currentStroke.addPoint(point);
  returnedModel.updatePendingStrokes(returnedModel.pendingStrokes, returnedModel.nextRecognitionRequestId, returnedModel.currentStroke);
  returnedModel.currentStroke = StrokeComponent.createStrokeComponent();
  return returnedModel;
}

export function penDown(model, point) {
  const returnedModel = Object.assign({}, model);
  logger.debug('penDown', point);
  returnedModel.currentStroke.addPoint(point);
  return returnedModel;
}

export function penMove(model, point) {
  const returnedModel = Object.assign({}, model);
  logger.debug('penMove', point);
  returnedModel.currentStroke.addPoint(point);
  return returnedModel;
}

export function extractNonRecognizedStrokes(model) {
  let nonRecognizedStrokes = [];
  for (let recognitionRequestId = (model.lastRecognitionRequestId + 1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++) {
    nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
  }
  return nonRecognizedStrokes;
}
