import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

/**
 * Call all callbacks when action is over.
 * @param callbacks
 * @param model
 * @param domElement
 */
function triggerCallBacks(callbacks, model, domElement) {
  callbacks.forEach((callback) => {
    callback.call(domElement, model);
  });
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param inkPaperParam
 */
function launchRecognition(inkPaperParam, modelCloneRefParam) {
  // InkPaper Under Recognition
  const inkPaper = inkPaperParam;
  const modelCloneRef = modelCloneRefParam;

  // Update recognizer state
  InkModel.updateRecognitionPositions(inkPaperParam.model, modelCloneRef);

  const mergeModelsCallback = (modelCloneWithRecognition) => {
    logger.debug('recognition callback', modelCloneWithRecognition);
    const modelRef = modelCloneWithRecognition;
    modelRef.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return InkModel.mergeRecognizedModelIntoModel(modelRef, inkPaper.model);
  };

  const fireRegisteredCallbacks = (modelCloneWithRecognition) => {
    logger.debug('success callback');
    const modelRef = modelCloneWithRecognition;
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
    inkPaper.callbacks.forEach((callback) => {
      callback.call(inkPaper.domElement, modelRef);
    });
    return modelRef;
  };

  const renderingCallback = (modelCloneWithRecognition) => {
    logger.debug('rendering callback');
    const modelRef = modelCloneWithRecognition;
    modelRef.state = MyScriptJSConstants.ModelState.RENDERING_RECOGNITION;
    if (InkModel.needRedraw(modelRef)) {
      inkPaper.renderer.drawModel(inkPaper.renderingContext, modelRef, inkPaper.stroker);
    }
    return modelRef;
  };

  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  inkPaper.recognizer.manageResetState(inkPaper.paperOptions, modelCloneRef, inkPaper.recognizer, inkPaper.recognizerContext)
      .then(
          () => {
            inkPaper.recognizer.recognize(inkPaperParam.paperOptions, modelCloneRef, inkPaperParam.recognizerContext)
                .then(mergeModelsCallback)
                .then(fireRegisteredCallbacks)
                .then(renderingCallback)
                .catch((error) => {
                  // Handle any error from all above steps
                  modelCloneRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
                  // TODO Manage a retry
                  // TODO Send different callbacks on error
                  fireRegisteredCallbacks(modelCloneRef);
                  logger.error('Error while firing  the recognition');
                  logger.info(error.stack);
                });
          }
      );
  logger.debug('InkPaper initPendingStroke end');
}

/**
 * Do all the stuff required to launch a timeout recognition.
 * @param inkPaperParam
 * @param modelClone
 */
function askForTimeOutRecognition(inkPaperParam, modelClone) {
  const inkPaperRef = inkPaperParam;
  /* eslint-disable no-undef*/
  window.clearTimeout(inkPaperParam.recotimer);
  inkPaperRef.recotimer = window.setTimeout(() => {
    launchRecognition(inkPaperRef, modelClone);
  }, inkPaperRef.paperOptions.recognitionParams.triggerRecognitionQuietPeriod);
  /* eslint-enable no-undef */
}

/**
 * Check if the recognition mode in parameter is the one configured.
 * @param inkPaperParam
 * @param recognitionMode
 * @returns {*|boolean}
 */
function isRecognitionModeConfigured(inkPaperParam, recognitionMode) {
  return inkPaperParam.recognizer && inkPaperParam.paperOptions.recognitionParams.triggerRecognitionOn === MyScriptJSConstants.RecognitionTrigger[recognitionMode] && MyScriptJSConstants.RecognitionTrigger[recognitionMode] in inkPaperParam.recognizer.getAvailableRecognitionSlots();
}

/**
 * Update model in inkPaper and ask for timeout recognition if it is the mode configured.
 * @param inkPaperParam
 * @param undoRefs
 */
function updateModelAndAskForRecognition(inkPaperParam, undoRefs) {
  const inkPaperRef = inkPaperParam;
  inkPaperRef.model = undoRefs.freshClone;
  const cloneModel = undoRefs.modelInUndoRedoStack;
  inkPaperRef.renderer.drawModel(inkPaperRef.renderingContext, inkPaperRef.model, inkPaperRef.stroker);
  if (isRecognitionModeConfigured(inkPaperRef, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
    askForTimeOutRecognition(inkPaperRef, cloneModel);
  }
  triggerCallBacks(inkPaperRef.callbacks, cloneModel, inkPaperRef.domElement);
}

/**
 * Inner function with all the logic on penUp.
 * @param inkPaperParam
 * @returns {*}
 */
function managePenUp(inkPaperParam) {
  const modelClone = InkModel.cloneModel(inkPaperParam.model);
  // Push model in undo redo manager
  modelClone.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  UndoRedoManager.pushModel(inkPaperParam.undoRedoManager, modelClone);
  // Firing recognition only if recognizer is configure to do it
  if (isRecognitionModeConfigured(inkPaperParam, MyScriptJSConstants.RecognitionTrigger.PEN_UP)) {
    launchRecognition(inkPaperParam, modelClone);
  } else if (isRecognitionModeConfigured(inkPaperParam, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
    askForTimeOutRecognition(inkPaperParam, modelClone);
  } else {
    // FIXME We may raise a error event
    logger.error('No valid recognition trigger configured');
  }
  return modelClone;
}

export class InkPaper {

  constructor(domElement, paperOptionsParam, paperStyleParam) {
    this.domElement = domElement;
    this.paperOptions = MyScriptJSParameter.enrichPaperParametersWithDefault(paperOptionsParam);
    this.paperStyle = MyScriptJSParameter.enrichStyleParameterWithDefault(paperStyleParam);
    this.renderingContext = this.renderer.populateDomElement(this.domElement);
    this.grabber.attachGrabberEvents(this, this.domElement);
    // Managing the active pointer
    this.activePointerId = undefined;
    this.debug = { logger };

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
      logger.debug('InkPaper initPendingStroke', pointerId, point);
      this.activePointerId = pointerId;
      this.model = InkModel.initPendingStroke(this.model, point, this.paperStyle.strokeStyle);
      this.renderer.drawCurrentStroke(this.renderingContext, this.model, this.stroker);
    }
    // Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper appendToPendingStroke', pointerId, point);
      this.model = InkModel.appendToPendingStroke(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingContext, this.model, this.stroker);
    } else {
      logger.debug(`PenMove detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
    // Currently no recognition on pen move
  }

  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper endPendingStroke', pointerId);
      this.activePointerId = undefined;

      // Updating model
      this.model = InkModel.endPendingStroke(this.model, point);
      this.renderer.drawModel(this.renderingContext, this.model, this.stroker);
      managePenUp(this);
    } else {
      logger.debug(`PenUp detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('InkPaper undo ask', this.undoRedoManager.stack.length);

    const undoRefs = UndoRedoManager.undo(this.undoRedoManager);
    updateModelAndAskForRecognition(this, undoRefs);
  }

  /**
   * Check if undo can be done
   * @return {*}
   */
  canUndo() {
    return UndoRedoManager.canUndo(this.undoRedoManager);
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoManager.stack.length);
    const redoRefs = UndoRedoManager.redo(this.undoRedoManager);
    updateModelAndAskForRecognition(this, redoRefs);
  }

  /**
   * Check if redo can be done
   * @return {*}
   */
  canRedo() {
    return UndoRedoManager.canRedo(this.undoRedoManager);
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.recognizer.reset(this.paperOptions, this.model, this.recognizerContext);
    this.model = UndoRedoManager.clear(this.undoRedoManager, InkModel.createModel(this.paperOptions));
    this.renderer.drawModel(this.renderingContext, this.model, this.stroker);
    triggerCallBacks(this.callbacks, this.model, this.domElement);
  }

  /**
   * Check if clear can be done
   * @return {*}
   */
  canClear() {
    return UndoRedoManager.canClear(this.undoRedoManager);
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionTrigger.DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      launchRecognition(this);
    }
  }

  /**
   * Function to call when the dom element link to the current ink paper has been resize.
   */
  resize() {
    logger.debug('Resizing inkPaper');
    // Using a timeout here to prevent multiple redraw while user is resizing the window
    /* eslint-disable no-undef */
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      logger.debug(this);
      this.renderer.resize(this.renderingContext, this.model, this.stroker);
    }, 20);
    /* eslint-enable no-undef */
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param paperOptions
   */
  set paperOptions(paperOptions) {
    this.innerPaperOptions = paperOptions;
    this.behaviors = MyScriptJSBehaviors.createDefaultBehaviorsFromPaperOptions(this.innerPaperOptions);

    this.undoRedoManager = UndoRedoManager.createUndoRedoManager(InkModel.createModel(this.innerPaperOptions), this.innerPaperOptions);
    // Pushing the initial state in the undo redo manager
    this.model = UndoRedoManager.getModel(this.undoRedoManager);

    triggerCallBacks(this.callbacks, this.model, this.domElement);
  }

  /**
   * Get the current recognition parameters
   * @return {*}
   */
  get paperOptions() {
    return this.innerPaperOptions;
  }

  /**
   * Set the inkPaper behaviors, to override default functions
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {{grabber, renderer, recognizer, optimizedParameters: {triggerRecognitionOn: string}, stroker, callbacks: [*]}} behaviors
   */
  set behaviors(behaviors) {
    this.innerBehaviors = behaviors;
    this.grabber = this.innerBehaviors.grabber;
    this.renderer = this.innerBehaviors.renderer;
    this.recognizer = this.innerBehaviors.recognizer;
    this.stroker = this.innerBehaviors.stroker;
    this.callbacks = this.innerBehaviors.callbacks;
  }

  /**
   * Get the current behaviors
   * @return {{grabber, renderer, recognizer, optimizedParameters: {triggerRecognitionOn: string}, stroker, callbacks: [*]}}
   */
  get behaviors() {
    return this.innerBehaviors;
  }

  /**
   * Get a PNG image data url from the data model
   * @return {string}
   */
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
   * @return {{strokesCount: number, pointsCount: number, byteSize: number, humanSize: number, humanUnit: string}}  Stats objects format, humanUnit could have the values BYTE, BYTES, KiB, MiB
   */
  get stats() {
    return ModelStats.computeStats(this.model);
  }
}
