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

/* eslint-disable no-undef*/
function getDpi() {
  const startDpi = 56;
  for (let dpi = startDpi; dpi < 2000; dpi++) {
    if (window.matchMedia(`(max-resolution: ${dpi}dpi)`).matches === true) {
      return dpi;
    }
  }
  return startDpi;
}
/* eslint-enable no-undef*/

/**
 * Trigger callbacks
 * @param {Array} callbacks
 * @param {Model} model
 * @param {Element} element
 * @param {...String} types
 * @return {Model}
 */
function triggerCallbacks(callbacks, model, element, ...types) {
  types.forEach((type) => {
    switch (type) {
      case MyScriptJSConstants.EventType.CHANGE:
        callbacks.forEach(callback => callback.call(element, model.rawResults.state, type));
        break;
      case MyScriptJSConstants.EventType.RECOGNITION_RESULT:
        callbacks.forEach(callback => callback.call(element, { rawResult: model.rawResults.recognition }, type));
        break;
      case MyScriptJSConstants.EventType.ERROR:
        callbacks.forEach(callback => callback.call(element, model, type));
        break;
      default:
        logger.debug(`No valid trigger configured for ${type}`);
        break;
    }
  });
}

/**
 * Check if a reset is required, and does it if it is
 * @param {Recognizer} recognizer Current recognizer
 * @param {Options} options Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 * @return {Model}
 */
function manageResetState(recognizer, options, model, recognizerContext, callback) {
  if (RecognizerContext.isResetRequired(recognizerContext, model)) {
    logger.debug('Reset is needed');
    recognizer.reset(options, model, recognizerContext, callback);
  } else {
    callback(undefined, model);
  }
  return model;
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
      inkPaper.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.RECOGNITION) &&
      inkPaper.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger[recognitionMode]);
}

function recognizerCallback(inkPaper, error, model, ...types) {
  const inkPaperRef = inkPaper;
  const modelRef = model;
  if (error) {
    logger.error('Error while firing the recognition', error.stack); // Handle any error from all above steps
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;

    triggerCallbacks(inkPaper.callbacks, error, inkPaper.domElement, MyScriptJSConstants.EventType.ERROR);
  } else {
    logger.debug('Recognizer callback', modelRef);
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;

    if (inkPaperRef.undoRedoManager.updateModel) {
      inkPaperRef.undoRedoManager.updateModel(inkPaperRef.options, modelRef, inkPaperRef.undoRedoContext, (err, res) => logger.debug('Undo/redo stack updated'));
    }

    // Merge recognized model if relevant and return current inkPaper model
    if ((modelRef.creationTime === inkPaper.model.creationTime) &&
        (modelRef.rawStrokes.length === inkPaper.model.rawStrokes.length) &&
        (modelRef.lastRecognitionPositions.lastSentPosition >= inkPaper.model.lastRecognitionPositions.lastReceivedPosition)) {
      inkPaperRef.model = InkModel.mergeModels(inkPaperRef.model, modelRef);

      if (InkModel.needRedraw(inkPaperRef.model)) {
        inkPaper.renderer.drawModel(inkPaper.rendererContext, inkPaperRef.model, inkPaper.stroker);
      }
      /* eslint-disable no-undef*/
      window.clearTimeout(inkPaperRef.sendEventTimer);
      inkPaperRef.sendEventTimer = window.setTimeout(() => {
        triggerCallbacks(inkPaper.callbacks, inkPaperRef.model, inkPaper.domElement, ...types);
      }, isRecognitionModeConfigured(inkPaperRef, MyScriptJSConstants.RecognitionTrigger.PEN_UP) ? inkPaperRef.options.recognitionParams.recognitionProcessDelay : 0);
      /* eslint-enable no-undef */
    }
  }
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToFeed
 */
function addStrokes(inkPaper, modelToFeed) {
  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  manageResetState(inkPaper.recognizer, inkPaper.options, modelToFeed, inkPaper.recognizerContext, (connexionError, managedModel) => {
    if (connexionError) {
      logger.info('Unable to manage recognizer state', connexionError);
      triggerCallbacks(inkPaper.callbacks, connexionError, inkPaper.domElement, MyScriptJSConstants.EventType.ERROR);
    } else {
      inkPaper.recognizer.addStrokes(inkPaper.options, managedModel, inkPaper.recognizerContext, (error, model) => {
        recognizerCallback(inkPaper, error, model, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
      });
    }
  });
}

/**
 * Launch the recognition with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToRecognize
 */
function launchRecognition(inkPaper, modelToRecognize) {
  // If strokes moved in the undo redo stack then a reset is mandatory before sending strokes.
  manageResetState(inkPaper.recognizer, inkPaper.options, modelToRecognize, inkPaper.recognizerContext, (connexionError, managedModel) => {
    if (connexionError) {
      logger.info('Unable to manage recognizer state', connexionError);
      triggerCallbacks(inkPaper.callbacks, connexionError, inkPaper.domElement, MyScriptJSConstants.EventType.ERROR);
    } else {
      inkPaper.recognizer.recognize(inkPaper.options, managedModel, inkPaper.recognizerContext, (error, model) => {
        recognizerCallback(inkPaper, error, model, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
      });
    }
  });
}

/**
 * Launch the typeset with all inkPaper relative configuration and state.
 * @param {InkPaper} inkPaper
 * @param {Model} modelToTypeset
 */
function launchTypeset(inkPaper, modelToTypeset) {
  inkPaper.recognizer.typeset(inkPaper.options, modelToTypeset, inkPaper.recognizerContext, (error, model) => {
    recognizerCallback(inkPaper, error, model, MyScriptJSConstants.EventType.TYPESET, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
  });
}
/**
 * Inner function with all the logic on resize.
 * @param {InkPaper} inkPaper
 */
function resize(inkPaper) {
  if (inkPaper.recognizer.resize) {
    inkPaper.recognizer.resize(inkPaper.options, inkPaper.model, inkPaper.recognizerContext, (error, model) => {
      recognizerCallback(inkPaper, error, model, MyScriptJSConstants.EventType.TYPESET);
    });
  } else {
    inkPaper.renderer.resize(inkPaper.rendererContext, inkPaper.model, inkPaper.stroker);
  }
}

/**
 * Handle model change
 * @param {InkPaper} inkPaper
 * @param {Model} model
 * @param {...String} types
 */
function modelChangedCallback(inkPaper, model, ...types) {
  logger.info(`model changed callback on ${types} event(s)`, model);
  inkPaper.renderer.drawModel(inkPaper.rendererContext, model, inkPaper.stroker);

  triggerCallbacks(inkPaper.callbacks, model, inkPaper.domElement, ...types);

  const inkPaperRef = inkPaper;
  // Firing recognition only if recognizer is configure to do it
  if (InkModel.extractPendingStrokes(model).length > 0) {
    if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
      /* eslint-disable no-undef*/
      window.clearTimeout(inkPaperRef.launchRecognitionTimer);
      inkPaperRef.launchRecognitionTimer = window.setTimeout(() => {
        launchRecognition(inkPaperRef, model);
      }, inkPaperRef.options.recognitionParams.recognitionTriggerDelay);
      /* eslint-enable no-undef */
    } else if (isRecognitionModeConfigured(inkPaper, MyScriptJSConstants.RecognitionTrigger.PEN_UP)) {
      launchRecognition(inkPaper, model);
    } else {
      logger.error('No valid recognition trigger configured');
    }
  }
}

/**
 * Inner function with all the logic on penDown.
 * @param {InkPaper} inkPaper
 */
function managePenDown(inkPaper) {
  /* eslint-disable no-undef*/
  window.clearTimeout(inkPaper.sendEventTimer);
  window.clearTimeout(inkPaper.launchRecognitionTimer);
  /* eslint-enable no-undef*/
}

/**
 * Inner function with all the logic on penUp.
 * @param {InkPaper} inkPaper
 */
function managePenUp(inkPaper) {
  const inkPaperRef = inkPaper;
  inkPaperRef.model.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;

  // Pushing the state in the undo redo manager
  if (inkPaper.undoRedoManager.updateModel) {
    inkPaper.undoRedoManager.updateModel(inkPaper.options, inkPaper.model, inkPaper.undoRedoContext, (err, res) => {
      modelChangedCallback(inkPaper, res, MyScriptJSConstants.EventType.CHANGE);
    }); // Push model in undo redo manager
  }

  if (inkPaper.recognizer.addStrokes) {
    addStrokes(inkPaperRef, inkPaper.model);
  }
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
     * Launch recognition timer
     * @type {Number}
     */
    this.launchRecognitionTimer = undefined;

    /**
     * Launch resize timer
     * @type {Number}
     */
    this.resizeTimer = undefined;

    /**
     * Notify recognition result timer
     * @type {Number}
     */
    this.sendEventTimer = undefined;

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
      this.renderer = this.innerBehavior.renderer;
      this.recognizer = this.innerBehavior.recognizer;
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
        this.innerRecognizer.close(this.options, this.model, this.recognizerContext, () => logger.info('Recognizer closed'));
      }
      /** @private **/
      this.innerRecognizer = recognizer;
      if (this.innerRecognizer) {
        const callback = (err, res) => {
          modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE);
        };
        /**
         * Current recognition context
         * @type {RecognizerContext}
         */
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext(this.domElement, getDpi());

        if (this.innerRecognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.UNDO_REDO)) {
          this.undoRedoContext = this.recognizerContext;
          this.undoRedoManager = this.innerRecognizer;
        } else {
          this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.options);
          this.undoRedoManager = UndoRedoManager;
        }

        this.innerRecognizer.init(this.options, this.model, this.recognizerContext, (err, res) => {
          this.model = res;
          if (this.undoRedoManager.updateModel) {
            this.undoRedoManager.updateModel(this.options, this.model, this.undoRedoContext, callback);
          } else {
            callback(err, this.model);
          }
          logger.info('Recognizer initialized');
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
   * @param {String} [pointerType] Current pointer type
   */
  penDown(point, pointerType) {
    logger.debug('Pen down', point);
    managePenDown(this);
    this.model = InkModel.initPendingStroke(this.model, point, Object.assign({ pointerType }, this.customStyle.strokeStyle));
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
    this.undoRedoManager.undo(this.options, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    });
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('Redo current model', this.model);
    this.undoRedoManager.redo(this.options, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    });
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('Clear current model', this.model);
    const callback = (err, res) => {
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    };

    if (this.recognizer && this.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.UNDO_REDO)) {
      this.recognizer.close(this.options, this.model, this.recognizerContext, () => {
        this.model = InkModel.createModel(this.options);
        this.recognizer.init(this.options, this.model, this.recognizerContext, callback);
      });
    } else {
      this.recognizer.reset(this.options, this.model, this.recognizerContext, () => {
        this.model = InkModel.createModel(this.options);
        if (this.undoRedoManager.updateModel) {
          this.undoRedoManager.updateModel(this.options, this.model, this.undoRedoContext, callback);
        }
      });
    }
  }

  /**
   * typeset the current part
   */
  typeset() {
    if (this.recognizer &&
        this.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.TYPESET)) {
      launchTypeset(this, this.model);
    }
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer &&
        this.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.RECOGNITION) &&
        this.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger.DEMAND)) {
      launchRecognition(this, this.model);
    }
  }

  /**
   * Function to call when the dom element link to the current ink paper has been resize.
   */
  resize() {
    logger.debug('Resizing inkPaper');
    /* eslint-disable no-undef */
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      resize(this);
    }, this.options.triggerResizeQuietPeriod);
    /* eslint-disable no-undef*/
  }
}
