import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import * as NetworkInterface from './recognizer/networkHelper/rest/networkInterface';

export * from './configuration/DebugConfig';


function launchRecognition(inkPaper) {
  // InkPaper Under Recognition
  const inkPaperReference = inkPaper;
  const modelReference = inkPaperReference.model;

  const recognitionCallback = (modelCloneWithRecognition) => {
    logger.debug('recognition callback', modelCloneWithRecognition);
    const modelWithStateChanged = modelCloneWithRecognition;
    modelWithStateChanged.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return modelWithStateChanged;
  };

  const modelsFusionCallback = (modelClonedWithRecognition) => {
    logger.debug('modelsFusionCallback callback');
    return InkModel.mergeRecognizedModelIntoModel(modelClonedWithRecognition, modelReference);
  };

  const updateUndoRedoStackCallback = (modelCloneWithRecognition) => {
    logger.debug('undo/redo callback');
    const modelRef = modelCloneWithRecognition;
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
    UndoRedoManager.updateModelInStack(inkPaperReference.undoRedoManager, modelCloneWithRecognition);
    return modelRef;
  };

  const successCallback = (modelCloneWithRecognition) => {
    const data = Object.assign({ undoRedoStackLength: inkPaperReference.undoRedoManager.stack.length }, modelCloneWithRecognition);
    inkPaperReference.callbacks.forEach((callback) => {
      callback.call(inkPaperReference.domElement, data);
    });
    return modelCloneWithRecognition;
  };
  const beautificationCallback = (modelCloneWithRecognition) => {
    logger.debug('beautification callback');
    inkPaperReference.renderer.drawModel(inkPaperReference.renderingStructure, modelReference, inkPaperReference.stroker);
    return modelCloneWithRecognition;
  };

  const modelClone = InkModel.cloneAndUpdateRecognitionPositions(modelReference);

  // Push model in undo redo manager
  modelClone.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  UndoRedoManager.pushModel(inkPaperReference.undoRedoManager, modelClone);

  inkPaperReference.recognizer.manageResetState(inkPaper.paperOptions, modelClone, inkPaperReference.recognizer, inkPaper.recognizerContext)
      .then(
          () => {
            inkPaperReference.recognizer.recognize(inkPaper.paperOptions, modelClone, inkPaper.recognizerContext)
                .then(recognitionCallback)
                .then(modelsFusionCallback)
                .then(updateUndoRedoStackCallback)
                .then(successCallback)
                .then(beautificationCallback)
                .catch((error) => {
                  // Handle any error from all above steps
                  // TODO Manage a retry
                  modelReference.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
                  UndoRedoManager.pushModel(inkPaperReference.undoRedoManager, modelReference);
                  successCallback(modelReference);
                  logger.error('Error while firing  the recognition');
                  logger.info(error.stack);
                });
          }
      );
  logger.debug('InkPaper initPendingStroke end');
}


/**
 * Call all callbacks when action is over.
 * @param callbacks
 * @param undoRedoManager
 * @param model
 * @param domElement
 */
function triggerCallBacks(callbacks, undoRedoManager, model, domElement) {
  const data = Object.assign({ undoRedoStackLength: undoRedoManager.stack.length }, model);
  callbacks.forEach((callback) => {
    callback.call(domElement, data);
  });
}

export class InkPaper2 {

  constructor(domElement, paperOptionsParam) {
    this.paperOptions = MyScriptJSParameter.enrichParametersWithDefault(paperOptionsParam);
    this.model = InkModel.createModel(this.paperOptions, this.recognizer);
    this.domElement = domElement;
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager(this.domElement);
    // Pushing the initial state in the undo redo manager
    // this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    triggerCallBacks(this.callbacks, this.undoRedoManager, this.model, this.domElement);
    this.renderingStructure = this.renderer.populateRenderDomElement(this.domElement);
    this.grabber.attachGrabberEvents(this, this.domElement);
    // Managing the active pointer
    this.activePointerId = undefined;
    this.debug = {
      logger
    };
    // As we are manipulating a dom element no other way to change one of it's attribute without writing an impure function
    // eslint-disable-next-line no-param-reassign
    domElement['data-myscript-ink-paper'] = this;
  }


  penDown(point, pointerId) {
    if (this.activePointerId) {
      logger.debug('Already in capture mode. No need to activate a new capture');
      if (this.activePointerId === pointerId) {
        logger.error('PenDown detect with the same id without any pen up');
      }
    } else {
      logger.debug('InkPaper endPendingStroke', pointerId, point);
      this.activePointerId = pointerId;
      this.model = InkModel.initPendingStroke(this.model, point, this.paperOptions.renderingParams.strokeStyle);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    }
    // Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper appendToPendingStroke', pointerId, point);
      this.model = InkModel.appendToPendingStroke(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    } else {
      logger.debug(`PenMove detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
    // Currently no recognition on pen move
  }

  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper initPendingStroke', pointerId);
      this.activePointerId = undefined;

      // Updating model
      this.model = InkModel.endPendingStroke(this.model, point);
      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);

      // Firing recognition only if recognizer is configure to do it
      if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logger.debug(`PenUp detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('InkPaper undo ask', this.undoRedoManager.stack.length);
    this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
    this.model = UndoRedoManager.undo(this.undoRedoManager);
    this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
    triggerCallBacks(this.callbacks, this.undoRedoManager, this.model, this.domElement);
  }

  canUndo() {
    return this.undoRedoManager.currentPosition > 0;
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoManager.stack.length);
    this.model = UndoRedoManager.redo(this.undoRedoManager);
    this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
    triggerCallBacks(this.callbacks, this.undoRedoManager, this.model, this.domElement);
  }

  canRedo() {
    return this.undoRedoManager.currentPosition < (this.undoRedoManager.stack.length - 1);
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.recognizer.reset(this.paperOptions, this.model, this.recognizerContext);
    this.model = InkModel.createModel(this.paperOptions, this.recognizer);
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
    triggerCallBacks(this.callbacks, this.undoRedoManager, this.model, this.domElement);
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      launchRecognition(this);
    }
  }


  /**
   * Function to call when the dom element link to the current ink paper has been resized.
   */
  resize() {
    logger.debug('Resizing inkPaper');
    // Using a timeout here to prevent multiple redraw while user is resizing the window
    /* eslint-disable no-undef */
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      logger.debug(this);
      this.renderer.updateCanvasSizeToParentOne(this.domElement, this.renderingStructure, this.model, this.stroker);
    }, 20);
    /* eslint-enable no-undef */
  }

  /**
   *
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param paramPaperOptions
   */
  set paperOptions(paramPaperOptions) {
    this.innerPaperOptions = paramPaperOptions;
    this.behaviors = MyScriptJSBehaviors.createDefaultBehavioursFromPaperOptions(this.innerPaperOptions);
    if (!InkModel.isModelEmpty(this.model)) {
      this.clear();
    }
  }

  get paperOptions() {
    return this.innerPaperOptions;
  }

  /**
   *
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param paramBehaviors
   */
  set behaviors(paramBehaviors) {
    this.innerBehaviors = paramBehaviors;
    this.grabber = this.innerBehaviors.grabber;
    this.renderer = this.innerBehaviors.renderer;
    this.recognizer = this.innerBehaviors.recognizer;
    this.stroker = this.innerBehaviors.stroker;
    this.callbacks = this.innerBehaviors.callbacks;
  }

  get behaviors() {
    return this.innerBehaviors;
  }

  get png() {
    return ImageRenderer.getImage(this.model, this.stroker);
  }

  set recognizer(recognizer) {
    if (this.innerRecognizer) {
      this.innerRecognizer.close(this.paperOptions, this.model, this.recognizerContext);
    }
    this.innerRecognizer = recognizer;
    this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
    this.innerRecognizer.init(this.innerPaperOptions, this.recognizerContext);
  }

  get recognizer() {
    return this.innerRecognizer;
  }

  set callbacks(callbacks) {
    this.innerCallbacks = callbacks;
  }

  get callbacks() {
    return this.innerCallbacks;
  }

  /**
   * Return the stats allowing to monitor what ink size is send to the server.
   * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
   */
  getStats() {
    return ModelStats.computeStats(this.model);
  }
}
// TODO Manage a timed out recognition

export function register(domElement, paperOptions, behaviors) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper2(domElement, paperOptions, behaviors);
}


export function getAvailableLanguageList(paperOptionsParam) {
  const paperOptions = paperOptionsParam;

  const data = {
    applicationKey: paperOptions.recognitionParams.server.applicationKey
  };

  switch (paperOptions.recognitionParams.type) {
    case MyScriptJSConstants.RecognitionType.TEXT:
      data.inputMode = paperOptions.recognitionParams.textParameter.textInputMode;
      break;
    case MyScriptJSConstants.RecognitionType.ANALYZER:
      data.inputMode = paperOptions.recognitionParams.analyzerParameter.textParameter.textInputMode;
      break;
    default:
      break;
  }

  return NetworkInterface.get(paperOptions.recognitionParams.server.scheme + '://' + paperOptions.recognitionParams.server.host + '/api/v3.0/recognition/rest/text/languages.json', data);
}
