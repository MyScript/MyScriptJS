import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameters from './configuration/MyScriptJSParameters';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

function isResetRequired(model, recognizerContext) {
  let ret = false;
  if (recognizerContext.lastRecognitionPositions) {
    ret = recognizerContext.lastRecognitionPositions.lastSentPosition >= model.lastRecognitionPositions.lastSentPosition;
  }
  return ret;
}

/**
 * Check if a reset is required, and does it if it is
 * @param {Recognizer} recognizer Current recognizer
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise}
 */
function manageResetState(recognizer, options, model, recognizerContext) {
  if (isResetRequired(model, recognizerContext)) {
    logger.debug('Reset is needed');
    return recognizer.reset(options, model, recognizerContext);
  }
  return Promise.resolve();
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
      inkPaper.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger[recognitionMode]);
}

/**
 * Trigger callbacks
 * @param {Array} callbacks
 * @param {Model} model
 * @param {Element} element
 */
function triggerCallBacks(callbacks, model, element) {
  callbacks.forEach(callback => callback.call(element, model));
}

/**
 * Call all callbacks when action is over.
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Model}
 */
function fireRegisteredCallbacks(inkPaper, model) {
  logger.debug('success callback');
  const modelRef = model;
  modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
  triggerCallBacks(inkPaper.callbacks, modelRef, inkPaper.domElement);
  return modelRef;
}

/**
 * Render model and trigger callbacks
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Model}
 */
function renderAndFireRegisteredCallback(inkPaper, model) {
  fireRegisteredCallbacks(inkPaper, model);
  logger.debug('rendering callback');
  const modelRef = model;
  modelRef.state = MyScriptJSConstants.ModelState.RENDERING_RECOGNITION;
  if (InkModel.needRedraw(modelRef)) {
    inkPaper.renderer.drawModel(inkPaper.rendererContext, modelRef, inkPaper.stroker);
  }
  return modelRef;
}

/**
 * Trigger rendering after delay
 * @param {InkPaper} inkPaper
 * @param {Model} model
 */
function triggerRenderingAndCallbackAfterDelay(inkPaper, model) {
  const inkPaperRef = inkPaper;
  /* eslint-disable no-undef*/
  window.clearTimeout(inkPaper.resulttimer);
  inkPaperRef.resulttimer = window.setTimeout(() => {
    renderAndFireRegisteredCallback(inkPaperRef, model);
  }, inkPaperRef.options.recognitionParams.triggerCallbacksAndRenderingQuietPeriod);
  /* eslint-enable no-undef */
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToRecognize
 */
function launchRecognition(inkPaper, modelToRecognize) {
  const modelToRecognizeRef = modelToRecognize;
  modelToRecognizeRef.lastRecognitionPositions.lastSentPosition = modelToRecognizeRef.rawStrokes.length - 1;

  const mergeModelsCallback = (modelRecognized) => {
    logger.debug('recognition callback', modelRecognized);
    const modelRef = modelRecognized;
    modelRef.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;

    // Merge recognized model if relevant and return current inkPaper model
    if (modelRef.lastRecognitionPositions.lastSentPosition > inkPaper.model.lastRecognitionPositions.lastReceivedPosition) {
      return InkModel.mergeModels(inkPaper.model, modelRef);
    }
    return inkPaper.model;
  };

  // In websocket mode as we are sending strokes on every pen up it, recognition events comes to often and degrade the user experience. options allows to set up a timeout. When recognition is in PEN_UP mode, quiet period duration in millisecond while inkPaper wait for anoter recognition before triggering the display and the call to configured callbacks.
  const renderAndFireAfterTimeoutIfRequired = (model) => {
    if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP) && inkPaper.options.recognitionParams.triggerCallbacksAndRenderingQuietPeriod > 0) {
      return triggerRenderingAndCallbackAfterDelay(inkPaper, model);
    } // else
    return renderAndFireRegisteredCallback(inkPaper, model);
  };

  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  manageResetState(inkPaper.recognizer, inkPaper.options, modelToRecognizeRef, inkPaper.recognizerContext)
      .then(() => {
        inkPaper.recognizer.recognize(inkPaper.options, modelToRecognizeRef, inkPaper.recognizerContext)
            .then(mergeModelsCallback)
            .then(renderAndFireAfterTimeoutIfRequired)
            .catch((error) => {
              // Handle any error from all above steps
              modelToRecognizeRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
              // TODO Manage a retry
              // TODO Send different callbacks on error
              fireRegisteredCallbacks(inkPaper, modelToRecognizeRef);
              logger.error('Error while firing  the recognition');
              logger.info(error.stack);
            });
      });
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
  window.clearTimeout(inkPaperRef.recotimer);
  inkPaperRef.recotimer = window.setTimeout(() => {
    launchRecognition(inkPaperRef, modelToRecognize);
  }, inkPaperRef.options.recognitionParams.triggerRecognitionQuietPeriod);
  /* eslint-enable no-undef */
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

/**
 * InkPaper
 */
export class InkPaper {

  /**
   * @param {Element} element DOM element to attach this inkPaper
   * @param {Options} [options] Configuration to apply
   * @param {Styles} [customStyle] Custom style to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  constructor(element, options, customStyle, behaviors) {
    /**
     * Inner reference to the DOM Element
     * @type {Element}
     */
    this.domElement = element;
    /**
     * @private
     * @type {Behaviors}
     */
    this.innerBehaviors = MyScriptJSBehaviors.overrideDefaultBehaviors(behaviors);
    this.behavior = this.behaviors.getBehaviorFromOptions(this.behaviors, this.options);
    this.options = options;
    this.customStyle = customStyle;

    // As we are manipulating a dom element no other way to change one of it's attribute without writing an impure function
    // eslint-disable-next-line no-param-reassign
    this.domElement['data-myscript-ink-paper'] = this;
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Options} options
   */
  set options(options) {
    /** @private **/
    this.innerOptions = MyScriptJSParameters.overrideDefaultOptions(options);
    this.behavior = this.behaviors.getBehaviorFromOptions(this.behaviors, this.options);
    /**
     * Undo / redo manager
     * @type {UndoRedoManager}
     */
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager(InkModel.createModel(this.options), this.options);
    // Pushing the initial state in the undo redo manager
    /**
     * Current model
     * @type {Model}
     */
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
   * Get behaviors
   * @return {Behaviors}
   */
  get behaviors() {
    return this.innerBehaviors;
  }

  /**
   * @private
   * @param {Behavior} behavior
   */
  set behavior(behavior) {
    if (behavior) {
      if (this.grabberContext) { // Remove event handlers to avoid multiplication (detach grabber)
        Object.keys(this.grabberContext).forEach(type => this.domElement.removeEventListener(type, this.grabberContext[type], false));
      }
      /** @private **/
      this.innerBehavior = behavior;
      this.recognizer = this.innerBehavior.recognizer;
      this.renderer = this.innerBehavior.renderer;
      /**
       * Current grabber context
       * @type {GrabberContext}
       */
      this.grabberContext = this.grabber.attachEvents(this, this.domElement);
    }
  }

  /**
   * Get current behavior
   * @return {Behavior}
   */
  get behavior() {
    return this.innerBehavior;
  }

  /**
   * Set the current recognizer
   * @private
   * @param {Recognizer} recognizer
   */
  set recognizer(recognizer) {
    if (recognizer) {
      if (this.innerRecognizer) {
        this.innerRecognizer.close(this.options, this.model, this.recognizerContext);
      }
      /** @private **/
      this.innerRecognizer = recognizer;
      if (this.innerRecognizer) {
        /**
         * Current recognition context
         * @type {RecognizerContext}
         */
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
        this.innerRecognizer.init(this.options, this.recognizerContext);
      }
    }
  }

  /**
   * Get current recognizer
   * @return {Recognizer}
   */
  get recognizer() {
    return this.innerRecognizer;
  }

  /**
   * Set the current renderer
   * @private
   * @param {Renderer} renderer
   */
  set renderer(renderer) {
    if (renderer) {
      if (this.innerRenderer) {
        while (this.domElement.hasChildNodes()) {
          this.domElement.removeChild(this.domElement.firstChild);
        }
      }
      /** @private **/
      this.innerRenderer = renderer;
      if (this.innerRenderer) {
        /**
         * Current rendering context
         * @type {Object}
         */
        this.rendererContext = this.innerRenderer.populateDomElement(this.domElement);
      }
    }
  }

  /**
   * Get current renderer
   * @return {Renderer}
   */
  get renderer() {
    return this.innerRenderer;
  }

  /**
   * Get current grabber
   * @return {Grabber}
   */
  get grabber() {
    return this.behavior ? this.behavior.grabber : undefined;
  }

  /**
   * Get current stroker
   * @return {Stroker}
   */
  get stroker() {
    return this.behavior ? this.behavior.stroker : undefined;
  }

  /**
   * Get current callbacks
   * @return {Array}
   */
  get callbacks() {
    return this.behavior ? this.behavior.callbacks : undefined;
  }

  /**
   * Get a PNG image data url from the data model
   * @return {String}
   */
  get png() {
    return ImageRenderer.getImage(this.model, this.stroker);
  }

  /**
   * Get statistics
   * @return {Stats}
   */
  get stats() {
    return ModelStats.computeStats(this.model);
  }

  /**
   * Handle a pen down
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  penDown(point) {
    logger.debug('InkPaper initPendingStroke', point);
    this.model = InkModel.initPendingStroke(this.model, point, this.customStyle.strokeStyle);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pen down
  }

  /**
   * Handle a pen move
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  penMove(point) {
    logger.debug('InkPaper appendToPendingStroke', point);
    this.model = InkModel.appendToPendingStroke(this.model, point);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pen move
  }

  /**
   * Handle a pen up
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  penUp(point) {
    logger.debug('InkPaper endPendingStroke', point);

    // Updating model
    this.model = InkModel.endPendingStroke(this.model, point);
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    managePenUp(this);
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
    if (this.recognizer && MyScriptJSConstants.RecognitionTrigger.DEMAND in this.recognizer.getInfo().availableTriggers) {
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
    /** @private **/
    this.timer = window.setTimeout(() => {
      logger.debug(this);
      this.renderer.resize(this.rendererContext, this.model, this.stroker);
    }, 20);
    /* eslint-enable no-undef */
  }
}
