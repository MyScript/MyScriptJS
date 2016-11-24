import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import { getSymbolsBounds } from './Symbol';

export function createModel(paperOptions, recognizer) {
  let ret = {
    // Current state of the model. Mainly here for debugging purpose.
    state: MyScriptJSConstants.ModelState.INITIALIZING,
    // Stroke in building process.
    currentStroke: undefined,
    // Current recognition id for the model
    currentRecognitionId: undefined,
    // List of pending strokes. Attributes of this object are corresponding to the stroke id (1,2,3 ...)
    pendingStrokes: [],
    lastRecognitionPositions: {
      lastSendPosition: -1,
      lastReceivedPosition: -1
    },
    // Default symbols, relative to the recognition
    defaultSymbols: [],
    // Contains the symbol to render. It could be : a stroke, a shape(& analyzer) primitives, string, characters...
    recognizedSymbols: [],
    // All the raw strokes already recognized
    rawRecognizedStrokes: [],
    // The recognition output as return by the recognition service.
    rawResult: undefined,
    // Date of creation
    creationTime: new Date().getTime()
  };
  if (paperOptions) {
    if (recognizer) {
      ret = recognizer.populateModel(paperOptions, ret);
    }
  }
  return ret;
}

/**
 * Return a unique identifier of the model. Used for dev purpose.
 * @param model
 * @returns {string}
 */
export function compactToString(model) {
  return `${model.creationTime} [${model.rawRecognizedStrokes.length}|${model.pendingStrokes.length}]`;
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd.
 * @param model
 * @param strokeToAdd
 * @returns {*}
 */
export function addStrokeToModel(model, strokeToAdd) {
  // We use a reference to the model. The purpose here is to update the pending strokeToAdd only.
  const modelReference = model;
  modelReference.pendingStrokes.push(strokeToAdd);
  return modelReference;
}

function getLastPendingStroke(model) {
  return model.pendingStrokes.slice(-1).pop();
}

export function getLastPendingStrokeAsJsonArray(model) {
  const strokes = [];
  strokes.push(StrokeComponent.toJSON(model.pendingStrokes.slice(-1).pop()));
  return strokes;
}

export function extractPendingStrokes(readingModel) {
  return readingModel.pendingStrokes.slice(readingModel.lastRecognitionPositions.lastReceivedPosition + 1);
}

export function extractPendingStrokesAsJsonArray(readingModel) {
  const nonRecognizedStrokes = readingModel.pendingStrokes.slice(readingModel.lastRecognitionPositions.lastReceivedPosition + 1);
  const strokes = [];
  nonRecognizedStrokes.forEach((stroke) => {
    strokes.push(StrokeComponent.toJSON(stroke));
  });
  return strokes;
}

export function extractAllPendingStrokesAsJsonArray(readingModel) {
  const strokes = [];
  readingModel.pendingStrokes.forEach((stroke) => {
    strokes.push(StrokeComponent.toJSON(stroke));
  });
  return strokes;
}

/**
 * Mutate the model by adding a point and close the current stroke.
 * @param model
 * @param point
 * @param style
 * @returns {*}
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
 * @param model
 * @param point
 * @returns {*}
 */
export function appendToPendingStroke(model, point) {
  const modelReference = model;
  logger.debug('appendToPendingStroke', point);
  modelReference.currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  return modelReference;
}

/**
 * Mutate the model by adding the new point on a initPendingStroke.
 * @param model
 * @param point
 * @returns {*}
 */
export function endPendingStroke(model, point) {
  const modelReference = model;
  logger.debug('endPendingStroke', point);
  const currentStroke = StrokeComponent.addPoint(modelReference.currentStroke, point);
  // Mutating pending strokes
  addStrokeToModel(modelReference, currentStroke);
  // Resetting the current stroke to an undefined one
  delete modelReference.currentStroke;
  return modelReference;
}
/**
 * Get the bounds of the current model.
 * @param model
 * @returns {{minX: Number, maxX: Number, minY: Number, maxY: Number}}
 */
export function getBorderCoordinates(model) {
  let modelBounds = { minX: Number.MAX_VALUE, maxX: Number.MIN_VALUE, minY: Number.MAX_VALUE, maxY: Number.MIN_VALUE };

  // Default symbols
  if (model.defaultSymbols && model.defaultSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.defaultSymbols, modelBounds);
  }
  // Pending strokes
  modelBounds = getSymbolsBounds(extractPendingStrokes(model), modelBounds);
  // Recognized symbols
  if (model.recognizedSymbols && model.recognizedSymbols.length > 0) {
    modelBounds = getSymbolsBounds(model.recognizedSymbols, modelBounds);
  } else {
    modelBounds = getSymbolsBounds(model.rawRecognizedStrokes, modelBounds);
  }
  return modelBounds;
}

export function cloneModel(modelToClone) {
  const clonedModel = Object.assign({}, modelToClone);
  // We clone the properties that need to be. Take care of arrays.
  clonedModel.defaultSymbols = [...modelToClone.defaultSymbols];
  clonedModel.recognizedSymbols = [...modelToClone.recognizedSymbols];
  clonedModel.currentStroke = Object.assign({}, modelToClone.currentStroke);
  clonedModel.pendingStrokes = [...modelToClone.pendingStrokes];
  clonedModel.lastRecognitionPositions = Object.assign({}, modelToClone.lastRecognitionPositions);
  clonedModel.rawRecognizedStrokes = [...modelToClone.rawRecognizedStrokes];
  clonedModel.rawResult = Object.assign({}, modelToClone.rawResult);
  clonedModel.creationTime = new Date().getTime();
  return clonedModel;
}

export function cloneAndUpdateRecognitionPositions(modelParam) {
  const modelReference = modelParam;
  const modelClone = cloneModel(modelReference);
  // Incrementation of the recognition request id
  modelReference.lastRecognitionPositions.lastSendPosition++;
  modelClone.lastRecognitionPositions.lastSendPosition = modelReference.lastRecognitionPositions.lastSendPosition;
  return modelClone;
}

export function mergeRecognizedModelIntoModel(recognizedModel, inkPaperModel) {
  const recognizedModelRef = recognizedModel;
  const inkPaperModelRef = inkPaperModel;
  if (recognizedModelRef.lastRecognitionPositions.lastSendPosition > inkPaperModelRef.lastRecognitionPositions.lastReceivedPosition) {
    inkPaperModelRef.state = recognizedModelRef.state;
    inkPaperModelRef.recognizedSymbols = recognizedModelRef.recognizedSymbols;
    inkPaperModelRef.rawRecognizedStrokes = inkPaperModelRef.rawRecognizedStrokes.concat(extractPendingStrokes(recognizedModelRef));
    recognizedModelRef.rawRecognizedStrokes = inkPaperModelRef.rawRecognizedStrokes;
    inkPaperModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastSendPosition;
    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastSendPosition;
  }
  return recognizedModelRef;
}

export function isModelEmpty(model) {
  return !(model && model.pendingStrokes.length > 0);
}

