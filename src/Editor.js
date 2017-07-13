import { editorLogger as logger } from './configuration/LoggerConfig';
import * as FontLoader from './fonts/FontLoader';
import * as DefaultBehaviors from './configuration/DefaultBehaviors';
import * as DefaultConfiguration from './configuration/DefaultConfiguration';
import * as DefaultStyles from './configuration/DefaultPenStyle';
import * as InkModel from './model/InkModel';
import * as UndoRedoContext from './model/UndoRedoContext';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import Constants from './configuration/Constants';

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
 * @param {Editor} editor
 * @param {Model} model
 * @param {...String} types
 * @return {Model}
 */
function triggerCallbacks(editor, model, ...types) {
  types.forEach((type) => {
    switch (type) {
      case Constants.EventType.LOADED:
      case Constants.EventType.UNDO:
      case Constants.EventType.REDO:
      case Constants.EventType.CLEAR:
      case Constants.EventType.CONVERT:
      case Constants.EventType.EXPORT:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, undefined, type));
        break;
      case Constants.EventType.CHANGED:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, {
          canUndo: editor.canUndo,
          canRedo: editor.canRedo,
          canClear: editor.canClear,
          canConvert: editor.canConvert,
          canExport: editor.canExport
        }, type));
        break;
      case Constants.EventType.EXPORTED:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, {
          rawResult: model.rawResults.exports,
          exports: editor.exports
        }, type));
        break;
      case Constants.EventType.ERROR:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, model, type));
        break;
      case Constants.EventType.IDLE:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, {
          idle: editor.idle
        }, type));
        break;
      default:
        logger.debug(`No valid trigger configured for ${type}`);
        break;
    }
  });
}

/**
 * Check if a clear is required, and does it if it is
 * @param {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: function(err: Object, res: Object))} resetFunc
 * @param {function(configuration: Configuration, model: Model, recognizerContext: RecognizerContext, callback: function(err: Object, res: Object))} func
 * @param {Configuration} configuration Current configuration
 * @param {Model} model Current model
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {function(err: Object, res: Object)} callback
 */
function manageResetState(resetFunc, func, configuration, model, recognizerContext, callback) {
  // If strokes moved in the undo redo stack then a clear is mandatory before sending strokes.
  if (resetFunc && RecognizerContext.isResetRequired(recognizerContext, model)) {
    logger.debug('Reset is needed');
    resetFunc(configuration, model, recognizerContext, (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        func(configuration, res, recognizerContext, callback);
      }
    });
  } else {
    func(configuration, model, recognizerContext, callback);
  }
}

/**
 * Check if the trigger in parameter is the one configured.
 * @param {Editor} editor
 * @param {String} trigger
 * @return {Boolean}
 */
function isTriggerConfigured(editor, trigger) {
  return editor.recognizer &&
    editor.configuration.recognitionTriggerOn === Constants.Trigger[trigger] &&
    editor.recognizer.getInfo().availableTriggers.includes(Constants.Trigger[trigger]);
}

function manageRecognizedModel(editor, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  // Merge recognized model if relevant and return current editor model
  if ((modelRef.creationTime === editor.model.creationTime) &&
    (modelRef.rawStrokes.length === editor.model.rawStrokes.length) &&
    (modelRef.lastPositions.lastSentPosition >= editor.model.lastPositions.lastReceivedPosition)) {
    editorRef.model = InkModel.mergeModels(editorRef.model, modelRef);

    if (InkModel.needRedraw(editorRef.model) || (editorRef.model.state === Constants.ModelState.INITIALIZED)) {
      editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
    }
    /* eslint-disable no-undef*/
    window.clearTimeout(editorRef.notifyTimer);
    editorRef.notifyTimer = window.setTimeout(() => {
      triggerCallbacks(editor, editorRef.model, ...types);
    }, isTriggerConfigured(editorRef, Constants.Trigger.POINTER_UP) ? editorRef.configuration.recognitionProcessDelay : 0);
    /* eslint-enable no-undef */
  }
}

function recognizerCallback(editor, error, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  const initializing = modelRef.state === Constants.ModelState.INITIALIZING;
  if (error) {
    logger.error('Error while firing the recognition', error.stack); // Handle any error from all above steps
    modelRef.state = Constants.ModelState.ERROR;

    triggerCallbacks(editor, error, Constants.EventType.ERROR, initializing ? Constants.EventType.LOADED : undefined);
  } else {
    logger.debug('recognition callback', modelRef);
    modelRef.state = initializing ? Constants.ModelState.INITIALIZED : Constants.ModelState.EXPORTED;

    if (editorRef.undoRedoManager.updateModel) {
      editorRef.undoRedoManager.updateModel(editorRef.configuration, modelRef, editorRef.undoRedoContext, (err, res) => {
        logger.debug('Undo/redo stack updated', editorRef.undoRedoContext);
        manageRecognizedModel(editor, res, ...types);
      });
    } else {
      manageRecognizedModel(editor, modelRef, ...types);
    }
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 */
function addStrokes(editor, model) {
  if (editor.recognizer.addStrokes) {
    manageResetState(editor.recognizer.reset, editor.recognizer.addStrokes, editor.configuration, model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
    });
  } else {
    editor.undoRedoManager.updateModel(editor.configuration, model, editor.undoRedoContext, (err, res) => {
      /* eslint-disable no-use-before-define */
      modelChangedCallback(editor, res, Constants.EventType.CHANGED);
      /* eslint-enable no-use-before-define */
    }); // Push model in undo redo manager
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {...String} [exports]
 */
function launchExport(editor, model, ...exports) {
  let configuration = editor.configuration;
  if (exports && exports.length > 0) {
    configuration = DefaultConfiguration.overrideExports(configuration, ...exports);
  }
  manageResetState(editor.recognizer.reset, editor.recognizer.recognize, configuration, model, editor.recognizerContext, (err, res) => {
    recognizerCallback(editor, err, res, Constants.EventType.EXPORTED);
  });
}

/**
 * Launch the convert with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 */
function launchConvert(editor, model) {
  if (editor.recognizer.convert) {
    editor.recognizer.convert(editor.configuration, model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res, Constants.EventType.CONVERTED, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
    });
  }
}

/**
 * Launch the resize.
 * @param {Editor} editor
 * @param {Model} model
 */
function launchResize(editor, model) {
  if (editor.recognizer.resize) {
    editor.recognizer.resize(editor.configuration, model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res);
    });
  }
}

/**
 * Set pen style.
 * @param {Editor} editor
 * @param {Model} model
 */
function setPenStyle(editor, model) {
  if (editor.recognizer.setPenStyle) {
    editor.recognizer.setPenStyle(editor.configuration, model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res);
    });
  }
}

/**
 * Wait for idle editor
 * @param {Editor} editor
 * @param {Model} model
 */
function waitForIdleEditor(editor, model) {
  if (editor.recognizer.waitForIdle) {
    editor.recognizer.waitForIdle(editor.configuration, model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res, Constants.EventType.IDLE);
    });
  }
}

/**
 * Handle model change
 * @param {Editor} editor
 * @param {Model} model
 * @param {...String} types
 */
function modelChangedCallback(editor, model, ...types) {
  logger.debug(`model changed callback on ${types} event(s)`, model);
  editor.renderer.drawModel(editor.rendererContext, model, editor.stroker);

  triggerCallbacks(editor, model, ...types);

  const editorRef = editor;
  // Firing recognition only if recognizer is configure to do it
  if (InkModel.extractPendingStrokes(model).length > 0) {
    if (isTriggerConfigured(editor, Constants.Trigger.QUIET_PERIOD)) {
      /* eslint-disable no-undef*/
      window.clearTimeout(editorRef.exportTimer);
      editorRef.exportTimer = window.setTimeout(() => {
        launchExport(editorRef, model);
      }, editorRef.configuration.recognitionTriggerDelay);
      /* eslint-enable no-undef */
    } else if (isTriggerConfigured(editor, Constants.Trigger.POINTER_UP)) {
      launchExport(editor, model);
    } else {
      logger.error('No valid recognition trigger configured');
    }
  }
}

/**
 * Inner function with all the logic on pointerDown.
 * @param {Editor} editor
 */
function managePointerDown(editor) {
  /* eslint-disable no-undef*/
  window.clearTimeout(editor.notifyTimer);
  window.clearTimeout(editor.exportTimer);
  /* eslint-enable no-undef*/
}

/**
 * Inner function with all the logic on pointerUp.
 * @param {Editor} editor
 */
function managePointerUp(editor) {
  const editorRef = editor;
  editorRef.model.state = Constants.ModelState.EXPORTING;
  addStrokes(editorRef, editor.model);
}

/**
 * Editor
 */
export class Editor {

  /**
   * @param {Element} element DOM element to attach this editor
   * @param {Configuration} [configuration] Configuration to apply
   * @param {PenStyle} [penStyle] Custom style to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  constructor(element, configuration, penStyle, behaviors) {
    /**
     * Inner reference to the DOM Element
     * @type {Element}
     */
    this.domElement = element;
    this.domElement.classList.add('ms-editor');

    /**
     * Launch export timer
     * @type {Number}
     */
    this.exportTimer = undefined;

    /**
     * Launch resize timer
     * @type {Number}
     */
    this.resizeTimer = undefined;

    /**
     * Notify delay timer
     * @type {Number}
     */
    this.notifyTimer = undefined;

    /**
     * @private
     * @type {Behaviors}
     */
    this.innerBehaviors = DefaultBehaviors.overrideDefaultBehaviors(behaviors);
    this.configuration = configuration;
    this.penStyle = penStyle;

    // As we are manipulating a dom element no other way to change one of it's attribute without writing an impure function
    // eslint-disable-next-line no-param-reassign
    this.domElement['data-myscript-editor'] = this;
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Configuration} configuration
   */
  set configuration(configuration) {
    /** @private **/
    this.innerConfiguration = DefaultConfiguration.overrideDefaultConfiguration(configuration);
    FontLoader.loadFromConfiguration(this.innerConfiguration);
    this.behavior = this.behaviors.getBehaviorFromConfiguration(this.behaviors, this.innerConfiguration);
  }

  /**
   * Get the current recognition parameters
   * @return {Configuration}
   */
  get configuration() {
    return this.innerConfiguration;
  }

  /**
   * Set the pen style
   * @param {PenStyle} penStyle
   */
  set penStyle(penStyle) {
    /** @private **/
    this.innerPenStyle = DefaultStyles.overrideDefaultPenStyle(penStyle);
    this.recognizerContext.initPromise // FIXME Find another way to pass style without override model
      .then(() => setPenStyle(this, Object.assign({}, this.model, this.innerPenStyle)));
  }

  /**
   * Get the pen style
   * @return {PenStyle}
   */
  get penStyle() {
    return this.innerPenStyle;
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
    const initialize = (model) => {
      /** @private **/
      this.innerRecognizer = recognizer;
      if (this.innerRecognizer) {
        const modelReference = model;
        modelReference.state = Constants.ModelState.INITIALIZING;
        /**
         * Current recognition context
         * @type {RecognizerContext}
         */
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext(this.domElement);

        if (this.innerRecognizer.undo && this.innerRecognizer.redo && this.innerRecognizer.clear) {
          this.undoRedoContext = this.recognizerContext;
          this.undoRedoManager = this.innerRecognizer;
        } else {
          this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.configuration);
          this.undoRedoManager = UndoRedoManager;
        }

        this.innerRecognizer.init(this.configuration, modelReference, this.recognizerContext, (err, res) => {
          logger.debug('Recognizer initialized', res);
          recognizerCallback(this, err, res, Constants.EventType.LOADED, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
        });
      }
    };

    if (recognizer) {
      if (this.innerRecognizer) {
        this.innerRecognizer.close(this.configuration, this.model, this.recognizerContext, (err, res) => {
          logger.info('Recognizer closed');
          initialize(InkModel.clearModel(res));
        });
      } else {
        /**
         * Current model
         * @type {Model}
         */
        this.model = InkModel.createModel(this.configuration);

        // INFO: Recognizer needs model to be initialized
        initialize(this.model);
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
   * Handle a pointer down
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} [pointerType=mouse] Current pointer type
   * @param {String} [pointerId] Current pointer id
   */
  pointerDown(point, pointerType = 'mouse', pointerId) {
    logger.trace('Pointer down', point);
    managePointerDown(this);
    this.model = InkModel.initPendingStroke(this.model, point, Object.assign({ pointerType, pointerId }, this.penStyle));
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pointer down
  }

  /**
   * Handle a pointer move
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  pointerMove(point) {
    logger.trace('Pointer move', point);
    this.model = InkModel.appendToPendingStroke(this.model, point);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pointer move
  }

  /**
   * Handle a pointer up
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  pointerUp(point) {
    logger.trace('Pointer up', point);
    this.model = InkModel.endPendingStroke(this.model, point);
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    managePointerUp(this);
  }

  /**
   * True if idle state
   * @return {Boolean}
   */
  get idle() {
    return this.recognizerContext.idle;
  }

  /**
   * Wait for idle state.
   */
  waitForIdle() {
    triggerCallbacks(this, this.model, Constants.EventType.IDLE);
    waitForIdleEditor(this, this.model);
  }

  /**
   * True if can undo, false otherwise.
   * @return {Boolean}
   */
  get canUndo() {
    return this.undoRedoContext.canUndo;
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('Undo current model', this.model);
    triggerCallbacks(this, this.model, Constants.EventType.UNDO);
    this.undoRedoManager.undo(this.configuration, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
    });
  }

  /**
   * True if can redo, false otherwise.
   * @return {Boolean}
   */
  get canRedo() {
    return this.undoRedoContext.canRedo;
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('Redo current model', this.model);
    triggerCallbacks(this, this.model, Constants.EventType.REDO);
    this.undoRedoManager.redo(this.configuration, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
    });
  }

  get canClear() {
    return this.canUndo && this.model.rawStrokes.length > 0;
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('Clear current model', this.model);
    triggerCallbacks(this, this.model, Constants.EventType.CLEAR);
    const callback = (err, res) => {
      modelChangedCallback(this, res, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
    };

    this.recognizer.clear(this.configuration, this.model, this.recognizerContext, (err, res) => {
      this.model = res;
      if (this.undoRedoManager.updateModel) {
        this.undoRedoManager.updateModel(this.configuration, this.model, this.undoRedoContext, callback);
      } else {
        callback(undefined, this.model);
      }
    });
  }

  get canConvert() {
    return this.canUndo && this.canClear && this.recognizer && this.recognizer.convert;
  }

  /**
   * Convert the current part
   */
  convert() {
    if (this.recognizer && this.recognizer.convert) {
      triggerCallbacks(this, this.model, Constants.EventType.CONVERT);
      launchConvert(this, this.model);
    }
  }

  get canExport() {
    return this.canUndo && this.canClear && this.recognizer && this.recognizer.getInfo().availableTriggers.includes(Constants.Trigger.DEMAND);
  }

  /**
   * Explicitly ask to perform a recognition of input.
   * @param {...String} [exports]
   */
  askForExport(...exports) {
    if (this.recognizer && this.recognizer.getInfo().availableTriggers.includes(Constants.Trigger.DEMAND)) {
      triggerCallbacks(this, this.model, Constants.EventType.EXPORT);
      launchExport(this, this.model, ...exports);
    }
  }

  /**
   * Get current state exports
   * @return {Object}
   */
  get exports() {
    return this.model ? this.model.exports : undefined;
  }

  /**
   * Function to call when the dom element link to the current ink paper has been resize.
   */
  resize() {
    logger.debug('Resizing editor');
    this.renderer.resize(this.rendererContext, this.model, this.stroker);
    /* eslint-disable no-undef */
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      launchResize(this, this.model);
    }, this.configuration.resizeTriggerDelay);
    /* eslint-disable no-undef*/
  }
}
