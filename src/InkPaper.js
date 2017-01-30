import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as MyScriptJSOptions from './configuration/MyScriptJSOptions';
import * as MyScriptJSStyles from './configuration/MyScriptJSStyles';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

/**
 * Check if a reset is required, and does it if it is
 * @param {Recognizer} recognizer Current recognizer
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @return {Promise.<Model>}
 */
function manageResetState(recognizer, options, model, recognizerContext) {
  const isResetRequired = () => {
    if (recognizerContext.lastRecognitionPositions) {
      return recognizerContext.lastRecognitionPositions.lastSentPosition >= model.rawStrokes.length - 1;
    }
    return false;
  };

  if (isResetRequired()) {
    logger.debug('Reset is needed');
    return recognizer.reset(options, model, recognizerContext);
  }
  return Promise.resolve(model);
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

function raiseError(error, domElement) {
  logger.debug('emitting error event', error);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  domElement.dispatchEvent(new CustomEvent('error', { detail: error }));
}

/**
 * Trigger callbacks
 * @param {Array} callbacks
 * @param {Model} model
 * @param {Element} element
 * @return {Model}
 */
function triggerCallBacks(callbacks, model, element) {
  callbacks.forEach(callback => callback.call(element, model));
  return model;
}

/**
 * Handle model change
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Model}
 */
function modelChangedCallback(inkPaper, model) {
  logger.info('model changed callback', model);
  inkPaper.renderer.drawModel(inkPaper.rendererContext, model, inkPaper.stroker);
  const data = Object.assign({}, model, UndoRedoManager.getState(inkPaper.undoRedoContext));
  return triggerCallBacks(inkPaper.callbacks, data, inkPaper.domElement);
}

/**
 * Trigger rendering after delay
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Model}
 */
function triggerRenderingAndCallbackAfterDelay(inkPaper, model) {
  const inkPaperRef = inkPaper;
  /* eslint-disable no-undef*/
  window.clearTimeout(inkPaper.resulttimer);
  inkPaperRef.resulttimer = window.setTimeout(() => {
    modelChangedCallback(inkPaperRef, model);
  }, inkPaperRef.options.recognitionParams.triggerCallbacksAndRenderingQuietPeriod);
  /* eslint-enable no-undef */
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToRecognize
 */
function launchRecognition(inkPaper, modelToRecognize) {
  // In websocket mode as we are sending strokes on every pen up it, recognition events comes to often and degrade the user experience. options allows to set up a timeout. When recognition is in PEN_UP mode, quiet period duration in millisecond while inkPaper wait for anoter recognition before triggering the display and the call to configured callbacks.
  const renderAndFireAfterTimeoutIfRequired = (model) => {
    if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP) && inkPaper.options.recognitionParams.triggerCallbacksAndRenderingQuietPeriod > 0) {
      return triggerRenderingAndCallbackAfterDelay(inkPaper, model);
    } // else
    return modelChangedCallback(inkPaper, model);
  };

  const mergeModelsCallback = (modelRecognized) => {
    logger.debug('recognition callback', modelRecognized);
    const modelRef = modelRecognized;
    modelRef.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;

    // Merge recognized model if relevant and return current inkPaper model
    if ((modelRef.creationTime === inkPaper.model.creationTime) &&
        (modelRef.rawStrokes.length === inkPaper.model.rawStrokes.length) &&
        (modelRef.lastRecognitionPositions.lastSentPosition >= inkPaper.model.lastRecognitionPositions.lastReceivedPosition)) {
      modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
      const inkPaperRef = inkPaper;
      inkPaperRef.model = InkModel.mergeModels(inkPaperRef.model, modelRef);
      return renderAndFireAfterTimeoutIfRequired(inkPaperRef.model);
    }
    return modelRef;
  };

  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  manageResetState(inkPaper.recognizer, inkPaper.options, modelToRecognize, inkPaper.recognizerContext)
      .then((managedModel) => {
        inkPaper.recognizer.recognize(inkPaper.options, managedModel, inkPaper.recognizerContext)
            .then(mergeModelsCallback)
            .catch((error) => {
              const modelRef = managedModel;
              // Handle any error from all above steps
              modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
              // TODO Manage a retry
              // TODO Send different callbacks on error
              modelChangedCallback(inkPaper, modelRef);
              logger.error('Error while firing  the recognition');
              logger.info(error.stack);
              raiseError(error, inkPaper.domElement);
            });
      })
      .catch((connexionError) => {
        logger.info('Unable to manage recognizer state', connexionError.stack);
        raiseError(connexionError, inkPaper.domElement);
      });
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
 * @param {Model} model
 * @return {Model}
 */
function updateModelAndAskForRecognition(inkPaper, model) {
  modelChangedCallback(inkPaper, model);
  if (InkModel.extractPendingStrokes(model).length > 0 && isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
    askForTimeOutRecognition(inkPaper, model);
  }
  return model;
}

/**
 * Inner function with all the logic on penUp.
 * @param {InkPaper} inkPaper
 * @return {Model}
 */
function managePenUp(inkPaper) {
  const modelRef = inkPaper.model;
  modelRef.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  // Push model in undo redo manager
  UndoRedoManager.pushModel(inkPaper.undoRedoContext, modelRef)
      .then((modelClone) => {
        // Firing recognition only if recognizer is configure to do it
        if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP)) {
          launchRecognition(inkPaper, modelClone);
        } else if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
          askForTimeOutRecognition(inkPaper, modelClone);
        } else {
          // FIXME We may raise a error event
          logger.error('No valid recognition trigger configured');
        }
      });
  return modelRef;
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
    this.innerOptions = MyScriptJSOptions.overrideDefaultOptions(options);
    /**
     * Current model
     * @type {Model}
     */
    this.model = InkModel.createModel(this.innerOptions);
    this.behavior = this.behaviors.getBehaviorFromOptions(this.behaviors, this.innerOptions);

    /**
     * Undo / redo manager
     * @type {UndoRedoContext}
     */
    this.undoRedoContext = UndoRedoManager.createUndoRedoContext(this.innerOptions);
    // Pushing the initial state in the undo redo manager
    UndoRedoManager.pushModel(this.undoRedoContext, this.model)
        .then(model => modelChangedCallback(this, this.model));
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
    this.innerCustomStyle = MyScriptJSStyles.overrideDefaultStyle(customStyle);
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
        this.innerRecognizer.init(this.options, this.model, this.recognizerContext)
            .then((model) => {
              this.model = model;
              logger.info('Recognizer initialized');
              return this.model;
            })
            .then(model => modelChangedCallback(this, model));
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
    logger.debug('InkPaper undo ask', this.undoRedoContext.stack.length);
    UndoRedoManager.undo(this.undoRedoContext)
        .then(model => updateModelAndAskForRecognition(this, model))
        .then((model) => {
          this.model = InkModel.cloneModel(model);
          return this.model;
        });
  }

  /**
   * Check if undo can be done
   * @return {Boolean}
   */
  canUndo() {
    return UndoRedoManager.getState(this.undoRedoContext).canUndo;
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoContext.stack.length);
    UndoRedoManager.redo(this.undoRedoContext)
        .then(model => updateModelAndAskForRecognition(this, model))
        .then((model) => {
          this.model = InkModel.cloneModel(model);
          return this.model;
        });
  }

  /**
   * Check if redo can be done
   * @return {Boolean}
   */
  canRedo() {
    return UndoRedoManager.getState(this.undoRedoContext).canRedo;
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoContext.stack.length);
    this.recognizer.reset(this.options, this.model, this.recognizerContext)
        .then(() => {
          this.model = InkModel.createModel(this.options);
          return this.model;
        })
        .then(model => UndoRedoManager.pushModel(this.undoRedoContext, model))
        .then(model => updateModelAndAskForRecognition(this, model));
  }

  /**
   * Check if clear can be done
   * @return {Boolean}
   */
  canClear() {
    return UndoRedoManager.getState(this.undoRedoContext).canClear;
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
