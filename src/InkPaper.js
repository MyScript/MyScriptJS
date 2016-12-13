import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameters from './configuration/MyScriptJSParameters';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

/**
 * Call all callbacks when action is over.
 * @param {Array} callbacks
 * @param {Model} model
 * @param {Element} element
 */
function triggerCallBacks(callbacks, model, element) {
  callbacks.forEach(callback => callback.call(element, model));
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToRecognize
 */
function launchRecognition(inkPaper, modelToRecognize) {
  const modelToRecognizeRef = modelToRecognize;

  // Update recognizer state
  InkModel.updateRecognitionPositions(inkPaper.model, modelToRecognizeRef);

  const mergeModelsCallback = (modelRecognized) => {
    logger.debug('recognition callback', modelRecognized);
    const modelRef = modelRecognized;
    modelRef.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return InkModel.mergeRecognizedModelIntoModel(modelRef, inkPaper.model);
  };

  const fireRegisteredCallbacks = (modelRecognized) => {
    logger.debug('success callback');
    const modelRef = modelRecognized;
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
    inkPaper.callbacks.forEach((callback) => {
      callback.call(inkPaper.domElement, modelRef);
    });
    return modelRef;
  };

  const renderingCallback = (modelRecognized) => {
    logger.debug('rendering callback');
    const modelRef = modelRecognized;
    modelRef.state = MyScriptJSConstants.ModelState.RENDERING_RECOGNITION;
    if (InkModel.needRedraw(modelRef)) {
      inkPaper.renderer.drawModel(inkPaper.rendererContext, modelRef, inkPaper.stroker);
    }
    return modelRef;
  };

  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  inkPaper.recognizer.manageResetState(inkPaper.options, modelToRecognizeRef, inkPaper.recognizer, inkPaper.recognizerContext)
      .then(
          () => {
            inkPaper.recognizer.recognize(inkPaper.options, modelToRecognizeRef, inkPaper.recognizerContext)
                .then(mergeModelsCallback)
                .then(fireRegisteredCallbacks)
                .then(renderingCallback)
                .catch((error) => {
                  // Handle any error from all above steps
                  modelToRecognizeRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
                  // TODO Manage a retry
                  // TODO Send different callbacks on error
                  fireRegisteredCallbacks(modelToRecognizeRef);
                  logger.error('Error while firing  the recognition');
                  logger.info(error.stack);
                });
          }
      );
  logger.debug('InkPaper initPendingStroke end');
}

/**
 * Do all the stuff required to launch a timeout recognition.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToRecognize
 */
function askForTimeOutRecognition(inkPaper, modelToRecognize) {
  const inkPaperRef = inkPaper;
  /* eslint-disable no-undef*/
  window.clearTimeout(inkPaper.recotimer);
  inkPaperRef.recotimer = window.setTimeout(() => {
    launchRecognition(inkPaperRef, modelToRecognize);
  }, inkPaperRef.options.recognitionParams.triggerRecognitionQuietPeriod);
  /* eslint-enable no-undef */
}

/**
 * Check if the recognition mode in parameter is the one configured.
 * @param {InkPaper} inkPaper
 * @param {String} recognitionMode
 * @return {Boolean}
 */
function isRecognitionModeConfigured(inkPaper, recognitionMode) {
  return inkPaper.recognizer &&
      inkPaper.options.recognitionParams.triggerRecognitionOn === MyScriptJSConstants.RecognitionTrigger[recognitionMode] &&
      inkPaper.recognizer.getAvailableRecognitionSlots().includes(MyScriptJSConstants.RecognitionTrigger[recognitionMode]);
}

/**
 * Update model in inkPaper and ask for timeout recognition if it is the mode configured.
 * @param {InkPaper} inkPaper
 * @param {{freshClone: Model, modelInUndoRedoStack: (Model)}} undoRefs
 */
function updateModelAndAskForRecognition(inkPaper, undoRefs) {
  const inkPaperRef = inkPaper;
  inkPaperRef.model = undoRefs.freshClone;
  const cloneModel = undoRefs.modelInUndoRedoStack;
  inkPaperRef.renderer.drawModel(inkPaperRef.rendererContext, inkPaperRef.model, inkPaperRef.stroker);
  if (isRecognitionModeConfigured(inkPaperRef, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
    askForTimeOutRecognition(inkPaperRef, cloneModel);
  }
  triggerCallBacks(inkPaperRef.callbacks, cloneModel, inkPaperRef.domElement);
}

/**
 * Inner function with all the logic on penUp.
 * @param {InkPaper} inkPaper
 * @return {Model}
 */
function managePenUp(inkPaper) {
  const modelClone = InkModel.cloneModel(inkPaper.model);
  // Push model in undo redo manager
  modelClone.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  UndoRedoManager.pushModel(inkPaper.undoRedoManager, modelClone);
  // Firing recognition only if recognizer is configure to do it
  if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP)) {
    launchRecognition(inkPaper, modelClone);
  } else if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
    askForTimeOutRecognition(inkPaper, modelClone);
  } else {
    // FIXME We may raise a error event
    logger.error('No valid recognition trigger configured');
  }
  return modelClone;
}

export class InkPaper {

  /**
   * @param {Element} element
   * @param {Options} [options]
   * @param {Styles} [customStyle]
   */
  constructor(element, options, customStyle) {
    this.domElement = element;
    this.options = options;
    this.customStyle = customStyle;
    this.rendererContext = this.renderer.populateDomElement(this.domElement);
    this.grabber.attachEvents(this, this.domElement);
    // Managing the active pointer
    this.activePointerId = undefined;
    this.debug = { logger };

    // As we are manipulating a dom element no other way to change one of it's attribute without writing an impure function
    // eslint-disable-next-line no-param-reassign
    this.domElement['data-myscript-ink-paper'] = this;
  }

  /**
   * Handle a pen down event
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} pointerId Pointer identifier
   */
  penDown(point, pointerId) {
    if (this.activePointerId) {
      logger.debug('Already in capture mode. No need to activate a new capture');
      if (this.activePointerId === pointerId) {
        logger.error('PenDown detect with the same id without any pen up');
      }
    } else {
      logger.debug('InkPaper initPendingStroke', pointerId, point);
      this.activePointerId = pointerId;
      this.model = InkModel.initPendingStroke(this.model, point, this.customStyle.strokeStyle);
      this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    }
    // Currently no recognition on pen down
  }

  /**
   * Handle a pen move event
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} pointerId Pointer identifier
   */
  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper appendToPendingStroke', pointerId, point);
      this.model = InkModel.appendToPendingStroke(this.model, point);
      this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    } else {
      logger.debug(`PenMove detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
    // Currently no recognition on pen move
  }

  /**
   * Handle a pen up event
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} pointerId Pointer identifier
   */
  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper endPendingStroke', pointerId);
      this.activePointerId = undefined;

      // Updating model
      this.model = InkModel.endPendingStroke(this.model, point);
      this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
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
   * @return {Boolean}
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
   * @return {Boolean}
   */
  canRedo() {
    return UndoRedoManager.canRedo(this.undoRedoManager);
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.recognizer.reset(this.options, this.model, this.recognizerContext);
    this.model = UndoRedoManager.clear(this.undoRedoManager, InkModel.createModel(this.options));
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    triggerCallBacks(this.callbacks, this.model, this.domElement);
  }

  /**
   * Check if clear can be done
   * @return {Boolean}
   */
  canClear() {
    return UndoRedoManager.canClear(this.undoRedoManager);
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionTrigger.DEMAND in this.recognizer.getAvailableRecognitionSlots) {
      launchRecognition(this, this.model);
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
      this.renderer.resize(this.rendererContext, this.model, this.stroker);
    }, 20);
    /* eslint-enable no-undef */
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Options} options
   */
  set options(options) {
    /** @private **/
    this.innerOptions = MyScriptJSParameters.overrideDefaultOptions(options);
    this.behaviors = MyScriptJSBehaviors.getBehaviorsFromOptions(this.options);
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager(InkModel.createModel(this.options), this.options);
    // Pushing the initial state in the undo redo manager
    this.model = UndoRedoManager.getModel(this.undoRedoManager);

    triggerCallBacks(this.callbacks, this.model, this.domElement);
  }

  /**
   * Get the current recognition parameters
   * @return {Options}
   */
  get options() {
    return this.innerOptions;
  }

  /**
   * Set the custom style
   * @param {Styles} customStyle
   */
  set customStyle(customStyle) {
    /** @private **/
    this.innerCustomStyle = MyScriptJSParameters.overrideDefaultStyle(customStyle);
  }

  /**
   * Get the current custom style
   * @return {Styles}
   */
  get customStyle() {
    return this.innerCustomStyle;
  }

  /**
   * Set the inkPaper behaviors, to override default functions
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Behaviors} behaviors
   */
  set behaviors(behaviors) {
    /** @private **/
    this.innerBehaviors = behaviors;
    if (this.recognizer) {
      this.recognizer.close(this.options, this.model, this.recognizerContext);
    }
    this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
    this.recognizer.init(this.options, this.recognizerContext);
  }

  /**
   * Get a PNG image data url from the data model
   * @return {String}
   */
  get png() {
    return ImageRenderer.getImage(this.model, this.stroker);
  }

  /**
   * Get current recognizer
   * @return {Recognizer}
   */
  get recognizer() {
    return this.innerBehaviors.recognizer;
  }

  /**
   * Get current grabber
   * @return {Grabber}
   */
  get grabber() {
    return this.innerBehaviors.grabber;
  }

  /**
   * Get current callbacks
   * @return {Array}
   */
  get callbacks() {
    return this.innerBehaviors.callbacks;
  }

  /**
   * Get current stroker
   * @return {Stroker}
   */
  get stroker() {
    return this.innerBehaviors.stroker;
  }

  /**
   * Get current renderer
   * @return {Renderer}
   */
  get renderer() {
    return this.innerBehaviors.renderer;
  }

  /**
   * Get statistics
   * @return {Stats}
   */
  get stats() {
    return ModelStats.computeStats(this.model);
  }
}
