import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScript from '../MyScript';

export class InkModel {
  // Only InkModel
  constructor() {
    this.recognizedComponents = {};
    this.recognizedStrokes = [];
    this.nextRecognitionRequestId = 0;
    this.currentRecognitionId = undefined;
    this.lastRecognitionRequestId = -1;
    this.currentStroke = StrokeComponent.createStrokeComponent();
    this.pendingStrokes = {};
    /*
     { 0  : [ ]
     recognitionId : array of strokes
     }
     */
    // TODO This may not be a good idea to have a recognize state here
    this.state = MyScript.ModelState.INITIALYZING;

    // The raw recogntion result is saved here
    this.rawResult = undefined;
    this.renderingResult = undefined;
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
  }


  updatePendingStrokes(pendingStrokeId, stroke) {
    if (!this.pendingStrokes[pendingStrokeId]) {
      this.pendingStrokes[pendingStrokeId] = [];
    }
    this.pendingStrokes[pendingStrokeId].push(stroke);
  }

  penUp(point) {
    logger.debug('penUp', point);
    this.currentStroke.addPoint(point);
    this.updatePendingStrokes(this.pendingStrokes, this.nextRecognitionRequestId, this.currentStroke);
    this.currentStroke = StrokeComponent.createStrokeComponent();
  }

  penDown(point) {
    logger.debug('penDown', point);
    this.currentStroke.addPoint(point);
  }

  penMove(point) {
    logger.debug('penMove', point);
    this.currentStroke.addPoint(point);
  }


}

export function extractNonRecognizedStrokes(model) {
  let nonRecognizedStrokes = [];
  for (let recognitionRequestId = (model.lastRecognitionRequestId + 1); recognitionRequestId <= model.currentRecognitionId; recognitionRequestId++) {
    nonRecognizedStrokes = nonRecognizedStrokes.concat(model.pendingStrokes[recognitionRequestId]);
  }
  return nonRecognizedStrokes;
}
