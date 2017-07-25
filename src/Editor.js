import { editorLogger as logger } from './configuration/LoggerConfig';
import * as FontLoader from './fonts/FontLoader';
import * as DefaultBehaviors from './configuration/DefaultBehaviors';
import * as DefaultConfiguration from './configuration/DefaultConfiguration';
import * as DefaultStyles from './configuration/DefaultPenStyle';
import * as DefaultTheme from './configuration/DefaultTheme';
import * as InkModel from './model/InkModel';
import * as UndoRedoContext from './model/UndoRedoContext';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import Constants from './configuration/Constants';

/* eslint-disable no-undef */
function getDpi() {
  const startDpi = 56;
  for (let dpi = startDpi; dpi < 2000; dpi++) {
    if (window.matchMedia(`(max-resolution: ${dpi}dpi)`).matches === true) {
      return dpi;
    }
  }
  return startDpi;
}

/* eslint-enable no-undef */

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
 * Check if the trigger in parameter is valid.
 * @param {Editor} editor
 * @param {String} type
 * @param {String} [trigger]
 * @return {Boolean}
 */
function isTriggerValid(editor, type, trigger = editor.configuration.triggers[type]) {
  if (editor.recognizer &&
    editor.recognizer.getInfo().availableTriggers[type].includes(trigger)) {
    return true;
  }
  logger.error(`${trigger} is not a valid trigger for ${type}`);
  return false;
}

function manageRecognizedModel(editor, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  // Merge recognized model if relevant and return current editor model
  if ((modelRef.creationTime === editor.model.creationTime) &&
    (modelRef.rawStrokes.length === editor.model.rawStrokes.length) &&
    (modelRef.lastPositions.lastSentPosition >= editor.model.lastPositions.lastReceivedPosition)) {
    editorRef.model = InkModel.mergeModels(editorRef.model, modelRef);

    if (InkModel.needRedraw(editorRef.model) || (!editorRef.initialized)) {
      editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
    }
    /* eslint-disable no-undef */
    window.clearTimeout(editorRef.notifyTimer);
    editorRef.notifyTimer = window.setTimeout(() => {
      triggerCallbacks(editor, editorRef.model, ...types);
    }, editorRef.configuration.processDelay);
    /* eslint-enable no-undef */
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

  if ((InkModel.extractPendingStrokes(model).length > 0) && (editor.configuration.triggers.exportContent !== Constants.Trigger.DEMAND)) {
    /* eslint-disable no-use-before-define */
    launchExport(editor, model);
    /* eslint-enable no-use-before-define */
  }
}

function recognizerCallback(editor, error, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  const initializing = !editorRef.initialized;
  if (error) {
    logger.error('Error while firing the recognition', error.stack || error); // Handle any error from all above steps
    triggerCallbacks(editor, error, Constants.EventType.ERROR, initializing ? Constants.EventType.LOADED : undefined);
  } else {
    logger.debug('recognition callback', modelRef);
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
 * @param {String} [trigger]
 */
function addStrokes(editor, model, trigger = editor.configuration.triggers.addStrokes) {
  if (editor.recognizer.addStrokes) {
    editor.recognizerContext.initPromise
      .then(() => {
        // Firing addStrokes only if recognizer is configure to do it
        if (isTriggerValid(editor, 'addStrokes', trigger)) {
          manageResetState(editor.recognizer.reset, editor.recognizer.addStrokes, editor.configuration, model, editor.recognizerContext, (err, res) => {
            recognizerCallback(editor, err, res, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
          });
        }
      });
  } else {
    editor.undoRedoManager.updateModel(editor.configuration, model, editor.undoRedoContext, (err, res) => {
      modelChangedCallback(editor, res, Constants.EventType.CHANGED);
    }); // Push model in undo redo manager
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} [trigger]
 */
function launchExport(editor, model, trigger = editor.configuration.triggers.exportContent) {
  if (editor.recognizer.exportContent) {
    editor.recognizerContext.initPromise
      .then(() => {
        // Firing export only if recognizer is configure to do it
        if (isTriggerValid(editor, 'exportContent', trigger)) {
          /* eslint-disable no-undef */
          const editorRef = editor;
          window.clearTimeout(editor.exportTimer);
          editorRef.exportTimer = window.setTimeout(() => {
            manageResetState(editor.recognizer.reset, editor.recognizer.exportContent, editor.configuration, model, editor.recognizerContext, (err, res) => {
              recognizerCallback(editor, err, res, Constants.EventType.EXPORTED);
            });
          }, trigger === Constants.Trigger.QUIET_PERIOD ? editor.configuration.triggerDelay : 0);
          /* eslint-enable no-undef */
        }
      });
  }
}

/**
 * Launch the convert with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 */
function launchConvert(editor, model) {
  if (editor.recognizer.convert) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.convert(editor.configuration, model, editor.recognizerContext, (err, res) => {
          recognizerCallback(editor, err, res, Constants.EventType.CONVERTED, Constants.EventType.CHANGED, Constants.EventType.EXPORTED);
        });
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
    editor.recognizerContext.initPromise
      .then(() => {
        const editorRef = editor;
        /* eslint-disable no-undef */
        window.clearTimeout(editor.resizeTimer);
        editorRef.resizeTimer = window.setTimeout(() => {
          editor.recognizer.resize(editor.configuration, model, editor.recognizerContext, (err, res) => {
            recognizerCallback(editor, err, res);
          });
        }, editor.configuration.resizeTriggerDelay);
        /* eslint-enable no-undef */
      });
  }
}

/**
 * Launch wait for idle
 * @param {Editor} editor
 * @param {Model} model
 */
function launchWaitForIdle(editor, model) {
  if (editor.recognizer.waitForIdle) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.waitForIdle(editor.configuration, model, editor.recognizerContext, (err, res) => {
          recognizerCallback(editor, err, res, Constants.EventType.IDLE);
        });
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
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.setPenStyle(editor.configuration, model, editor.recognizerContext, (err, res) => {
          recognizerCallback(editor, err, res);
        });
      });
  }
}

/**
 * Set theme.
 * @param {Editor} editor
 * @param {Model} model
 */
function setTheme(editor, model) {
  if (editor.recognizer.setTheme) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.setTheme(editor.configuration, model, editor.recognizerContext, (err, res) => {
          recognizerCallback(editor, err, res);
        });
      });
  }
}

/**
 * Editor
 */
export class Editor {

  /**
   * @param {Element} element DOM element to attach this editor
   * @param {Configuration} [configuration] Configuration to apply
   * @param {PenStyle} [penStyle] Custom style to apply
   * @param {Theme} [theme] Custom theme to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  constructor(element, configuration, penStyle, theme, behaviors) {
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
    this.theme = theme;
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
    /**
     * @private
     * @type {Configuration}
     */
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
    /**
     * @private
     * @type {PenStyle}
     */
    this.innerPenStyle = DefaultStyles.overrideDefaultPenStyle(penStyle);
    // FIXME Find another way to pass style without override model
    setPenStyle(this, Object.assign({}, this.model, this.innerPenStyle));
  }

  /**
   * Get the pen style
   * @return {PenStyle}
   */
  get penStyle() {
    return this.innerPenStyle;
  }

  /**
   * Set the theme
   * @param {Theme} theme
   */
  set theme(theme) {
    /**
     * @private
     * @type {Theme}
     */
    this.innerTheme = DefaultTheme.overrideDefaultTheme(theme);
    // FIXME Find another way to pass theme without override model
    setTheme(this, Object.assign({}, this.model, this.innerTheme));
  }

  /**
   * Get the theme
   * @return {Theme}
   */
  get theme() {
    return this.innerTheme;
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
      /**
       * @private
       * @type {Behavior}
       */
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
      /**
       * @private
       * @type {Recognizer}
       */
      this.innerRecognizer = recognizer;
      if (this.innerRecognizer) {
        /**
         * Current recognition context
         * @type {RecognizerContext}
         */
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext(this.domElement);
        // FIXME: merge undo/redo manager with default recognizer
        if (this.innerRecognizer.undo && this.innerRecognizer.redo && this.innerRecognizer.clear) {
          this.undoRedoContext = this.recognizerContext;
          this.undoRedoManager = this.innerRecognizer;
        } else {
          this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.configuration);
          this.undoRedoManager = UndoRedoManager;
        }

        this.innerRecognizer.init(this.configuration, model, this.recognizerContext, (err, res) => {
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

      /**
       * @private
       * @type {Renderer}
       */
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
   * True if initialized, false otherwise
   * @return {Boolean}
   */
  get initialized() {
    return this.recognizerContext ? this.recognizerContext.initialized : false;
  }

  /**
   * Handle a pointer down
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} [pointerType=mouse] Current pointer type
   * @param {String} [pointerId] Current pointer id
   */
  pointerDown(point, pointerType = 'mouse', pointerId) {
    logger.trace('Pointer down', point);
    /* eslint-disable no-undef */
    window.clearTimeout(this.notifyTimer);
    window.clearTimeout(this.exportTimer);
    /* eslint-enable no-undef */
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
    // Do recognition on pointer up
    addStrokes(this, this.model);
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
    launchWaitForIdle(this, this.model);
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

  /**
   * True if can clear, false otherwise.
   * @return {Boolean}
   */
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

  /**
   * True if can convert, false otherwise.
   * @return {Boolean}
   */
  get canConvert() {
    return this.canUndo && this.canClear && this.recognizer && this.recognizer.convert;
  }

  /**
   * Convert the current content
   */
  convert() {
    if (this.canConvert) {
      triggerCallbacks(this, this.model, Constants.EventType.CONVERT);
      launchConvert(this, this.model);
    }
  }

  /**
   * True if can export, false otherwise.
   * @return {Boolean}
   */
  get canExport() {
    return this.canUndo && this.canClear && this.recognizer && this.recognizer.getInfo().availableTriggers.exportContent.includes(Constants.Trigger.DEMAND);
  }

  /**
   * Explicitly ask to perform an export.
   */
  exportContent() {
    if (this.canExport) {
      triggerCallbacks(this, this.model, Constants.EventType.EXPORT);
      launchExport(this, this.model, Constants.Trigger.DEMAND);
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
    launchResize(this, this.model);
  }
}
