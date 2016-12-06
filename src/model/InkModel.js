import { modelLogger as logger } from '../configuration/LoggerConfig';
import * as StrokeComponent from './StrokeComponent';
import MyScriptJSConstants from '../configuration/MyScriptJSConstants';
import { getSymbolsBounds, getDefaultSymbols } from './Symbol';

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
 * @param model
 * @returns {string}
 */
export function compactToString(model) {
  return `${model.creationTime} [${model.pendingStrokes.length}]`;
}

export function needRedraw(model) {
  return (model.pendingStrokes.length !== model.recognizedSymbols.filter(symbol => symbol.type === 'stroke').length);
}

/**
 * Mutate the model given in parameter by adding the new strokeToAdd.
 * @param model
 * @param strokeToAdd
 * @returns {*}
 */
export function addStroke(model, strokeToAdd) {
  // We use a reference to the model. The purpose here is to update the pending strokeToAdd only.
  const modelReference = model;
  modelReference.pendingStrokes.push(strokeToAdd);
  return modelReference;
}

export function extractLastPendingStroke(model) {
  return model.pendingStrokes.slice(-1).pop();
}

export function extractPendingStrokes(model, position = model.lastRecognitionPositions.lastReceivedPosition + 1) {
  return model.pendingStrokes.slice(position);
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
  addStroke(modelReference, currentStroke);
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
    modelBounds = getSymbolsBounds(model.pendingStrokes, modelBounds);
  }
  return modelBounds;
}

export function cloneModel(modelToClone) {
  const clonedModel = Object.assign({}, modelToClone);
  // We clone the properties that need to be. Take care of arrays.
  clonedModel.defaultSymbols = [...modelToClone.defaultSymbols];
  clonedModel.recognizedSymbols = [...modelToClone.recognizedSymbols];
  clonedModel.currentStroke = modelToClone.currentStroke ? Object.assign({}, modelToClone.currentStroke) : undefined;
  clonedModel.pendingStrokes = [...modelToClone.pendingStrokes];
  clonedModel.lastRecognitionPositions = Object.assign({}, modelToClone.lastRecognitionPositions);
  clonedModel.rawResult = modelToClone.rawResult ? Object.assign({}, modelToClone.rawResult) : undefined;
  clonedModel.creationTime = new Date().getTime();
  return clonedModel;
}

export function updateRecognitionPositions(modelParam, modelCloneParam) {
  const modelReference = modelParam;
  const modelClone = modelCloneParam;
  // Incrementation of the recognition request id
  modelReference.lastRecognitionPositions.lastSendPosition = modelParam.pendingStrokes.length - 1;
  modelClone.lastRecognitionPositions.lastSendPosition = modelReference.lastRecognitionPositions.lastSendPosition;
  return modelClone;
}


export function mergeRecognizedModelIntoModel(recognizedModel, inkPaperModel) {
  const recognizedModelRef = recognizedModel;
  const inkPaperModelRef = inkPaperModel;
  if (recognizedModelRef.lastRecognitionPositions.lastSendPosition > inkPaperModelRef.lastRecognitionPositions.lastReceivedPosition) {
    recognizedModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastSendPosition;

    inkPaperModelRef.state = recognizedModelRef.state;
    inkPaperModelRef.recognizedSymbols = recognizedModelRef.recognizedSymbols;
    inkPaperModelRef.lastRecognitionPositions.lastReceivedPosition = recognizedModelRef.lastRecognitionPositions.lastReceivedPosition;
  }
  return recognizedModelRef;
}
