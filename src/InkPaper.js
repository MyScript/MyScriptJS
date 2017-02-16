import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSBehaviors from './configuration/MyScriptJSBehaviors';
import * as MyScriptJSOptions from './configuration/MyScriptJSOptions';
import * as MyScriptJSStyles from './configuration/MyScriptJSStyles';
import * as InkModel from './model/InkModel';
import * as UndoRedoContext from './model/UndoRedoContext';
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
  if (RecognizerContext.isResetRequired(recognizerContext, model)) {
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
      inkPaper.options.recognitionParams.recognitionTriggerOn === MyScriptJSConstants.RecognitionTrigger[recognitionMode] &&
      inkPaper.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger[recognitionMode]);
}


/**
 * Trigger callbacks
 * @param {Array} callbacks
 * @param {Model} model
 * @param {Element} element
 * @param {...String} types
 * @return {Model}
 */
function triggerCallBacks(callbacks, model, element, ...types) {
  types.forEach((type) => {
    switch (type) {
      case MyScriptJSConstants.EventType.CHANGE:
        callbacks.forEach(callback => callback.call(element, { canUndo: model.canUndo, canRedo: model.canRedo, canClear: model.canClear }, type));
        break;
      case MyScriptJSConstants.EventType.RESULT:
        callbacks.forEach(callback => callback.call(element, { rawResult: model.rawResult }, type));
        break;
      case MyScriptJSConstants.EventType.ERROR:
        callbacks.forEach(callback => callback.call(element, model, type));
        break;
      default:
        logger.debug('No valid trigger configured');
        break;
    }
  });
  return model;
}

/**
 * Handle model change
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @param {...String} types
 * @return {Model}
 */
function modelChangedCallback(inkPaper, model, ...types) {
  logger.info(`model changed callback on ${types} event(s)`, model);
  inkPaper.renderer.drawModel(inkPaper.rendererContext, model, inkPaper.stroker);
  return triggerCallBacks(inkPaper.callbacks, model, inkPaper.domElement, ...types);
}

/**
 * Trigger model changed callback after delay
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Promise.<Model>}
 */
function triggerModelChangedAfterDelay(inkPaper, model) {
  return new Promise((resolve) => {
    const inkPaperRef = inkPaper;
    /* eslint-disable no-undef*/
    window.clearTimeout(inkPaperRef.resulttimer);
    inkPaperRef.resulttimer = window.setTimeout(() => {
      resolve(modelChangedCallback(inkPaperRef, model, MyScriptJSConstants.EventType.RESULT));
    }, isRecognitionModeConfigured(inkPaperRef, MyScriptJSConstants.RecognitionTrigger.PEN_UP) ? inkPaperRef.options.recognitionParams.recognitionProcessDelay : 0);
    /* eslint-enable no-undef */
  });
}

function recognizerCallback(inkPaper, model) {
  const inkPaperRef = inkPaper;
  const modelRef = model;
  logger.debug('recognition callback', modelRef);
  modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;

  // Merge recognized model if relevant and return current inkPaper model
  if ((modelRef.creationTime === inkPaper.model.creationTime) &&
      (modelRef.rawStrokes.length === inkPaper.model.rawStrokes.length) &&
      (modelRef.lastRecognitionPositions.lastSentPosition >= inkPaper.model.lastRecognitionPositions.lastReceivedPosition)) {
    inkPaperRef.model = InkModel.mergeModels(inkPaperRef.model, modelRef);

    UndoRedoManager.updateModel(inkPaperRef.options, inkPaperRef.model, inkPaperRef.undoRedoContext)
        .then(() => logger.debug('Undo/redo stack updated'));

    return triggerModelChangedAfterDelay(inkPaperRef, inkPaperRef.model);
  }
  return modelRef;
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @return {Promise.<Model>}
 */
function launchRecognition(inkPaper, modelToRecognize) {
  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  return manageResetState(inkPaper.recognizer, inkPaper.options, modelToRecognize, inkPaper.recognizerContext)
      .then(managedModel =>
                inkPaper.recognizer.recognize(inkPaper.options, managedModel, inkPaper.recognizerContext)
                    .then(model => recognizerCallback(inkPaper, model))
                    .catch((error) => {
                      const modelRef = managedModel;
                      // Handle any error from all above steps
                      modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
                      logger.error('Error while firing  the recognition');
                      logger.info(error.stack);
                      triggerCallBacks(inkPaper.callbacks, error, inkPaper.domElement, MyScriptJSConstants.EventType.ERROR);
                    })
      )
      .catch((connexionError) => {
        logger.info('Unable to manage recognizer state', connexionError);
        triggerCallBacks(inkPaper.callbacks, connexionError, inkPaper.domElement, MyScriptJSConstants.EventType.ERROR);
      });
}

/**
 * Update model in inkPaper and ask for timeout recognition if it is the mode configured.
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @return {Promise.<Model>}
 */
function updateModelAndAskForRecognition(inkPaper, model) {
  return new Promise((resolve, reject) => {
    const inkPaperRef = inkPaper;
    // Firing recognition only if recognizer is configure to do it
    if (InkModel.extractPendingStrokes(model).length > 0) {
      if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
        /* eslint-disable no-undef*/
        window.clearTimeout(inkPaperRef.recotimer);
        inkPaperRef.recotimer = window.setTimeout(() => {
          resolve(launchRecognition(inkPaperRef, model));
        }, inkPaperRef.options.recognitionParams.recognitionProcessDelay);
        /* eslint-enable no-undef */
      } else if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP)) {
        resolve(launchRecognition(inkPaper, model));
      } else {
        logger.error('No valid recognition trigger configured');
        reject(model);
      }
    } else {
      resolve(model);
    }
  });
}

/**
 * Inner function with all the logic on penUp.
 * @param {InkPaper} inkPaper
 * @return {Promise.<Model>}
 */
function managePenUp(inkPaper) {
  // Pushing the state in the undo redo manager
  UndoRedoManager.updateModel(inkPaper.options, inkPaper.model, inkPaper.undoRedoContext)
      .then((model) => {
        modelChangedCallback(inkPaper, model, MyScriptJSConstants.EventType.CHANGE);
        updateModelAndAskForRecognition(inkPaper, model);
        return model;
      });
}

/**
 * Inner function with all the logic on resize.
 * @param {InkPaper} inkPaper
 * @return {Model}
 */
function manageResize(inkPaper) {
  return inkPaper.renderer.resize(inkPaper.rendererContext, inkPaper.model, inkPaper.stroker);
}

/**
 * Do all the stuff required to resize the inkPaper.
 * @param {InkPaper} inkPaper
 * @return {Promise.<Model>}
 */
function askForResize(inkPaper) {
  const inkPaperRef = inkPaper;
  return new Promise((resolve) => {
    /* eslint-disable no-undef */
    window.clearTimeout(inkPaperRef.timer);
    inkPaperRef.timer = window.setTimeout(() => {
      resolve(manageResize(inkPaperRef));
    }, inkPaperRef.options.triggerResizeQuietPeriod);
    /* eslint-disable no-undef*/
  });
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
    this.domElement.classList.add('ms-ink-paper');
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

    /**
     * Current undo/redo context
     * @type {UndoRedoContext}
     */
    this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.innerOptions);

    // INFO: Recognizer needs model to be initialized
    this.behavior = this.behaviors.getBehaviorFromOptions(this.behaviors, this.innerOptions);
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
        this.innerRecognizer.close(this.options, this.model, this.recognizerContext)
            .then(() => logger.info('Recognizer closed'));
      }
      /** @private **/
      this.innerRecognizer = recognizer;
      if (this.innerRecognizer) {
        /**
         * Current recognition context
         * @type {RecognizerContext}
         */
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
        this.innerRecognizer.init(this.options, this.model, this.recognizerContext) // Pushing the state in the undo redo manager
            .then(model => UndoRedoManager.updateModel(this.options, model, this.undoRedoContext))
            .then((model) => {
              modelChangedCallback(this, model, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RESULT);
              updateModelAndAskForRecognition(this, model);
              return model;
            })
            .then(() => logger.info('Recognizer initialized'))
            .catch((error) => {
              logger.info('Unable to load');
              triggerCallBacks(this.callbacks, error, this.domElement, MyScriptJSConstants.EventType.ERROR);
            });
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
    logger.debug('Pen down', point);
    this.model = InkModel.initPendingStroke(this.model, point, this.customStyle.strokeStyle);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pen down
  }

  /**
   * Handle a pen move
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  penMove(point) {
    logger.debug('Pen move', point);
    this.model = InkModel.appendToPendingStroke(this.model, point);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pen move
  }

  /**
   * Handle a pen up
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  penUp(point) {
    logger.debug('Pen up', point);
    this.model = InkModel.endPendingStroke(this.model, point);
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    managePenUp(this);
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('Undo current model', this.model);
    UndoRedoManager.undo(this.options, this.model, this.undoRedoContext)
        .then((model) => {
          this.model = model;
          modelChangedCallback(this, model, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RESULT);
          updateModelAndAskForRecognition(this, model);
          return this.model;
        });
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('Redo current model', this.model);
    UndoRedoManager.redo(this.options, this.model, this.undoRedoContext)
        .then((model) => {
          this.model = model;
          modelChangedCallback(this, model, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RESULT);
          updateModelAndAskForRecognition(this, model);
          return this.model;
        });
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('Clear current model', this.model);
    this.recognizer.reset(this.options, this.model, this.recognizerContext)
        .then(() => {
          this.model = InkModel.createModel(this.options);
          UndoRedoManager.updateModel(this.options, this.model, this.undoRedoContext)
              .then((model) => {
                modelChangedCallback(this, model, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RESULT);
                updateModelAndAskForRecognition(this, model);
                return model;
              });
          return this.model;
        });
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer && this.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger.DEMAND)) {
      launchRecognition(this, this.model);
    }
  }

  /**
   * Function to call when the dom element link to the current ink paper has been resize.
   */
  resize() {
    logger.debug('Resizing inkPaper');
    askForResize(this);
  }
}
