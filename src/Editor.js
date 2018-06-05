/* eslint-disable no-underscore-dangle */
import { editorLogger as logger } from './configuration/LoggerConfig';
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
import * as SmartGuide from './smartguide/SmartGuide';
import Constants from './configuration/Constants';
import { inkImporter } from './eastereggs/InkImporter';


/**
 * Trigger callbacks
 * @param {Editor} editor
 * @param {Object} data
 * @param {...String} types
 * @return {Model}
 */
function triggerCallbacks(editor, data, ...types) {
  const editorRef = editor;
  types.forEach((type) => {
    switch (type) {
      case Constants.EventType.RENDERED:
        break; // Internal use only
      case Constants.EventType.UNDO:
      case Constants.EventType.REDO:
      case Constants.EventType.CLEAR:
      case Constants.EventType.CONVERT:
      case Constants.EventType.EXPORT:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, type));
        break;
      case Constants.EventType.LOADED:
      case Constants.EventType.CHANGED:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, type, {
          initialized: editor.initialized,
          canUndo: editor.canUndo,
          canRedo: editor.canRedo,
          canClear: editor.canClear,
          isEmpty: editor.isEmpty,
          possibleUndoCount: editor.possibleUndoCount,
          undoStackIndex: editor.undoStackIndex,
          canConvert: editor.canConvert,
          canExport: editor.canExport
        }));
        break;
      case Constants.EventType.EXPORTED:
        window.clearTimeout(editorRef.notifyTimer);
        editorRef.notifyTimer = window.setTimeout(() => {
          editor.callbacks.forEach(callback => callback.call(editor.domElement, type, {
            exports: editor.exports
          }));
        }, editorRef.configuration.processDelay);
        break;
      case Constants.EventType.SUPPORTED_IMPORT_MIMETYPES:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, type, {
          mimeTypes: editor.supportedImportMimeTypes
        }));
        break;
      case Constants.EventType.ERROR:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, type, data));
        break;
      case Constants.EventType.IDLE:
        editor.callbacks.forEach(callback => callback.call(editor.domElement, type, {
          idle: editor.idle
        }));
        break;
      default:
        logger.debug(`No valid trigger configured for ${type}`);
        break;
    }
  });
}

/**
 * Check if a clear is required, and does it if it is
 * @param {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} resetFunc
 * @param {function(recognizerContext: RecognizerContext, model: Model, callback: RecognizerCallback)} func
 * @param {RecognizerContext} recognizerContext Current recognizer context
 * @param {Model} model Current model
 * @param {RecognizerCallback} callback
 */
function manageResetState(resetFunc, func, recognizerContext, model, callback, ...params) {
  // If strokes moved in the undo redo stack then a clear is mandatory before sending strokes.
  if (resetFunc && RecognizerContext.isResetRequired(recognizerContext, model)) {
    logger.debug('Reset is needed');
    resetFunc(recognizerContext, model, (err, resetedModel, ...types) => {
      if (err) {
        callback(err, resetedModel, ...types);
      } else {
        func(recognizerContext, resetedModel, callback, ...params);
      }
    });
  } else {
    func(recognizerContext, model, callback, ...params);
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

/**
 * Manage recognized model
 * @param {Editor} editor
 * @param {Model} model
 * @param {...String} types
 */
function manageRecognizedModel(editor, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  logger.debug(`model changed callback on ${types} event(s)`, model);
  if (modelRef.creationTime === editor.model.creationTime) {
    // Merge recognized model if relevant and return current editor model
    if ((modelRef.rawStrokes.length === editor.model.rawStrokes.length) &&
      (modelRef.lastPositions.lastSentPosition >= editor.model.lastPositions.lastReceivedPosition)) {
      editorRef.model = InkModel.mergeModels(editorRef.model, modelRef);
      if (InkModel.needRedraw(editorRef.model) || types.includes(Constants.EventType.RENDERED)) {
        editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
      }
    } else {
      editorRef.model = modelRef;
      editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
    }
    triggerCallbacks(editor, undefined, ...types);
  }

  if (editor.configuration.recognitionParams.type === 'TEXT'
    && editor.configuration.recognitionParams.apiVersion === 'V4'
    && editor.configuration.recognitionParams.protocol !== 'REST'
    && editor.configuration.recognitionParams.v4.text.mimeTypes.includes(Constants.Exports.JIIX)
    && editor.configuration.recognitionParams.v4.text.smartGuide) {
    // eslint-disable-next-line no-use-before-define
    launchSmartGuide(editorRef, modelRef.exports);
  }

  if ((InkModel.extractPendingStrokes(model).length > 0) &&
    (!editor.recognizer.addStrokes) && // FIXME: Ugly hack to avoid double export (addStrokes + export)
    (editor.configuration.triggers.exportContent !== Constants.Trigger.DEMAND)) {
    /* eslint-disable no-use-before-define */
    launchExport(editor, model);
    /* eslint-enable no-use-before-define */
  }
}

/**
 * Recognizer callback
 * @param {Editor} editor
 * @param {Object} error
 * @param {Model} model
 * @param {...String} events
 */
function recognizerCallback(editor, error, model, ...events) {
  const editorRef = editor;

  const handleResult = (err, res, ...types) => {
    if (err) {
      if (err.type !== 'close') {
        logger.error('Error while firing the recognition', err.stack || err); // Handle any error from all above steps
      }
      if ((err.message === 'Invalid application key.') || (err.message === 'Invalid HMAC') ||
      (err.error &&
        err.error.result &&
        err.error.result.error &&
        (err.error.result.error === 'InvalidApplicationKeyException' || err.error.result.error === 'InvalidHMACSignatureException')
      )) {
        editorRef.error.innerText = Constants.Error.WRONG_CREDENTIALS;
      } else if (err.message === 'Session is too old. Max Session Duration Reached') {
        editorRef.error.innerText = Constants.Error.TOO_OLD;
      } else if (err.message && editorRef.error.style.display === 'none') {
        editorRef.error.innerText = Constants.Error.NOT_REACHABLE;
      }
      if ((editorRef.error.innerText === Constants.Error.TOO_OLD || err.code === 1006 || err.reason === 'CLOSE_RECOGNIZER') && RecognizerContext.canReconnect(editor.recognizerContext)) {
        logger.info('Reconnection is available', err.stack || err);
        editorRef.error.style.display = 'none';
      } else {
        editorRef.error.style.display = 'initial';
        triggerCallbacks(editor, err, Constants.EventType.ERROR, ...types);
      }
    } else {
      manageRecognizedModel(editorRef, res, ...[...events, ...types].filter((el, i, a) => i === a.indexOf(el))); // Remove duplicate events
    }
  };

  logger.debug('recognition callback');
  if (editor.undoRedoManager.updateModel && !error) {
    editor.undoRedoManager.updateModel(editor.undoRedoContext, model, handleResult);
  } else {
    handleResult(error, model, ...events);
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} [trigger]
 */
function addStrokes(editor, model, trigger = editor.configuration.triggers.addStrokes) {
  if (editor.recognizer && editor.recognizer.addStrokes) {
    editor.recognizerContext.initPromise
      .then(() => {
        // Firing addStrokes only if recognizer is configure to do it
        if (isTriggerValid(editor, 'addStrokes', trigger)) {
          manageResetState(editor.recognizer.reset, editor.recognizer.addStrokes, editor.recognizerContext, model, (err, res, ...types) => {
            recognizerCallback(editor, err, res, ...types);
          });
        }
      });
  }
}

/**
 * Launch smartguide.
 * @param {Editor} editor
 * @param {Object} exports
 */
function launchSmartGuide(editor, exports) {
  const editorRef = editor;
  editorRef.smartGuide = SmartGuide.launchSmartGuide(editor.smartGuide, exports);
}

/**
 * Launch ink import.
 * @param {Editor} editor
 * @param {Model} model
 * @param {PointerEvents} events
 */
function launchPointerEvents(editor, model, events) {
  if (editor.recognizer && editor.recognizer.pointerEvents) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.pointerEvents(editor.recognizerContext, model, events, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
        });
      });
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} [requestedMimeTypes]
 * @param {String} [trigger]
 */
function launchExport(editor, model, requestedMimeTypes, trigger = editor.configuration.triggers.exportContent) {
  if (editor.recognizer && editor.recognizer.export_) {
    editor.recognizerContext.initPromise
      .then(() => {
        // Firing export only if recognizer is configure to do it
        if (isTriggerValid(editor, 'exportContent', trigger)) {
          const editorRef = editor;
          window.clearTimeout(editor.exportTimer);
          editorRef.exportTimer = window.setTimeout(() => {
            manageResetState(editor.recognizer.reset, editor.recognizer.export_, editor.recognizerContext, model, (err, res, ...types) => {
              recognizerCallback(editor, err, res, ...types);
            }, requestedMimeTypes);
          }, trigger === Constants.Trigger.QUIET_PERIOD ? editor.configuration.triggerDelay : 0);
        }
      });
  }
}

/**
 * Launch the import.
 * @param {Editor} editor
 * @param {Model} model
 * @param {Blob} data
 */
function launchImport(editor, model, data) {
  if (editor.recognizer && editor.recognizer.import_) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.import_(editor.recognizerContext, model, data, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
        });
      });
  }
}

function launchGetSupportedImportMimeTypes(editor, model) {
  if (editor.recognizer && editor.recognizer.getSupportedImportMimeTypes) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.getSupportedImportMimeTypes(editor.recognizerContext, model, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
        });
      });
  }
}

/**
 * Launch the convert with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} model
 * @param {String} conversionState
 */
function launchConvert(editor, model, conversionState) {
  if (editor.recognizer && editor.recognizer.convert) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.convert(editor.recognizerContext, model, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
        }, conversionState);
      });
  }
}

function launchConfig(editor, model) {
  if (editor.recognizer && editor.recognizer.sendConfiguration) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.sendConfiguration(editor.recognizerContext, model, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
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
  if (editor.recognizer && editor.recognizer.resize) {
    editor.recognizerContext.initPromise
      .then(() => {
        const editorRef = editor;
        window.clearTimeout(editor.resizeTimer);
        editorRef.resizeTimer = window.setTimeout(() => {
          editor.recognizer.resize(editor.recognizerContext, model, editor.domElement, (err, res, ...types) => {
            recognizerCallback(editor, err, res, ...types);
          });
        }, editor.configuration.resizeTriggerDelay);
      });
    SmartGuide.resize(editor.smartGuide);
  }
}

/**
 * Launch wait for idle
 * @param {Editor} editor
 * @param {Model} model
 */
function launchWaitForIdle(editor, model) {
  if (editor.recognizer && editor.recognizer.waitForIdle) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.waitForIdle(editor.recognizerContext, model, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
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
  if (editor.recognizer && editor.recognizer.setPenStyle) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.setPenStyle(editor.recognizerContext, model, editor.penStyle, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
        });
      });
  }
}

/**
 * Set pen style.
 * @param {Editor} editor
 * @param {Model} model
 */
function setPenStyleClasses(editor, model) {
  if (editor.recognizer && editor.recognizer.setPenStyleClasses) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.setPenStyleClasses(editor.recognizerContext, model, editor.penStyleClasses, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
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
  if (editor.recognizer && editor.recognizer.setTheme) {
    editor.recognizerContext.initPromise
      .then(() => {
        editor.recognizer.setTheme(editor.recognizerContext, model, editor.theme, (err, res, ...types) => {
          recognizerCallback(editor, err, res, ...types);
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
   * @param {Theme} [theme] Custom theme to apply
   * @param {PenStyle} [penStyle] Custom style to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  constructor(element, configuration, penStyle, theme, behaviors) {
    /**
     * Inner reference to the DOM Element
     * @type {Element}
     */
    this.domElement = element;
    this.domElement.classList.add('ms-editor');

    // eslint-disable-next-line no-undef
    this.loader = document.createElement('div');
    this.loader.classList.add('loader');
    this.loader = this.domElement.appendChild(this.loader);

    // eslint-disable-next-line no-undef
    this.error = document.createElement('div');
    this.error.classList.add('error-msg');
    this.error = this.domElement.appendChild(this.error);

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
    this.smartGuide = SmartGuide.createSmartGuide(this);

    /**
     * Pen color used only for pending stroke
     * @type {string}
     */
    this.localTheme = '';

    this.theme = theme;
    this.penStyle = penStyle;
    this.penStyleClasses = '';

    this.domElement.editor = this;
  }

  /**
   * Set the recognition parameters
   * WARNING : Need to fire a clear if user have already input some strokes.
   * @param {Configuration} configuration
   */
  set configuration(configuration) {
    this.loader.style.display = 'initial';
    this.error.style.display = 'none';
    /**
     * @private
     * @type {Configuration}
     */
    this.innerConfiguration = DefaultConfiguration.overrideDefaultConfiguration(configuration);
    this.setThemeForFont(this.innerConfiguration.recognitionParams.v4.lang);
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
    this.localPenStyle = this.innerPenStyle;
    setPenStyle(this, this.model);
  }

  /**
   * Get the pen style
   * @return {PenStyle}
   */
  get penStyle() {
    return this.innerPenStyle;
  }

  /**
   * Set the pen style
   * @param {String} penStyleClasses
   */
  set penStyleClasses(penStyleClasses) {
    /**
     * @private
     * @type {String}
     */
    this.innerPenStyleClasses = penStyleClasses;
    this.localPenStyle = this.theme[`.${this.innerPenStyleClasses}`];
    setPenStyleClasses(this, this.model);
  }

  /**
   * Get the pen style
   * @return {String}
   */
  get penStyleClasses() {
    return this.innerPenStyleClasses;
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
    setTheme(this, this.model);
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
      if (this.grabber) { // Remove event handlers to avoid multiplication (detach grabber)
        this.grabber.detach(this.domElement, this.grabberContext);
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
      this.grabberContext = this.grabber.attach(this.domElement, this);
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
    this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.configuration);
    this.undoRedoManager = UndoRedoManager;

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
        this.recognizerContext = RecognizerContext.createEmptyRecognizerContext(this);
        // FIXME: merge undo/redo manager with default recognizer
        if (this.innerRecognizer.undo && this.innerRecognizer.redo && this.innerRecognizer.clear) {
          this.undoRedoContext = this.recognizerContext;
          this.undoRedoManager = this.innerRecognizer;
        }

        this.innerRecognizer.init(this.recognizerContext, model, (err, res, ...types) => {
          logger.debug('Recognizer initialized', res);
          this.loader.style.display = 'none';
          recognizerCallback(this, err, res, ...types);
        });
      }
    };

    if (recognizer) {
      if (this.innerRecognizer) {
        this.innerRecognizer.close(this.recognizerContext, this.model, (err, res, ...types) => {
          logger.info('Recognizer closed');
          recognizerCallback(this, err, res, ...types);
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
        this.innerRenderer.detach(this.domElement, this.rendererContext);
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
        this.rendererContext = this.innerRenderer.attach(this.domElement, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth);
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
   * Get statistics to monitor what ink size is send to the server.
   * @return {Stats}
   */
  getStats() {
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
  pointerDown(point, pointerType = 'pen', pointerId) {
    logger.trace('Pointer down', point);
    window.clearTimeout(this.notifyTimer);
    window.clearTimeout(this.exportTimer);
    this.model = InkModel.initPendingStroke(this.model, point, Object.assign({ pointerType, pointerId }, this.theme.ink, this.localPenStyle));
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
    this.model = InkModel.endPendingStroke(this.model, point, this.penStyle);
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);

    if (this.recognizer.addStrokes) {
      addStrokes(this, this.model);
    } else {
      // Push model in undo redo manager
      recognizerCallback(this, undefined, this.model);
    }
  }

  removeStroke(stroke) {
    this.model.strokeGroups.forEach((group) => {
      const stringStrokes = group.strokes.map(strokeFromGroup => JSON.stringify(strokeFromGroup));
      const strokeIndex = stringStrokes.indexOf(JSON.stringify(stroke));
      if (strokeIndex !== -1) {
        group.strokes.splice(strokeIndex, 1);
      }
    });
    const stringRawStrokes = this.model.rawStrokes.map(strokes => JSON.stringify(strokes));
    const strokeIndex = stringRawStrokes.indexOf(JSON.stringify(stroke));
    if (strokeIndex !== -1) {
      this.model.rawStrokes.splice(strokeIndex, 1);
    }
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    recognizerCallback(this, undefined, this.model);
    if (!(this.configuration.triggers.exportContent === 'DEMAND')) {
      launchExport(this, this.model);
    }
  }

  reDraw(rawStrokes, strokeGroups) {
    rawStrokes.forEach((stroke) => {
      InkModel.addStroke(this.model, stroke);
    });
    strokeGroups.forEach((group) => {
      group.strokes.forEach((strokeFromGroup) => {
        InkModel.addStrokeToGroup(this.model, strokeFromGroup, group.penStyle);
      });
    });
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    recognizerCallback(this, undefined, this.model);
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
    triggerCallbacks(this, undefined, Constants.EventType.IDLE);
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
    triggerCallbacks(this, undefined, Constants.EventType.UNDO);
    this.undoRedoManager.undo(this.undoRedoContext, this.model, (err, res, ...types) => {
      manageRecognizedModel(this, res, ...types);
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
    triggerCallbacks(this, undefined, Constants.EventType.REDO);
    this.undoRedoManager.redo(this.undoRedoContext, this.model, (err, res, ...types) => {
      manageRecognizedModel(this, res, ...types);
    });
  }

  /**
   * True if empty, false otherwise
   * @returns {boolean}
   */
  get isEmpty() {
    return this.recognizerContext.isEmpty;
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
    triggerCallbacks(this, undefined, Constants.EventType.CLEAR);
    this.recognizer.clear(this.recognizerContext, this.model, (err, res, ...types) => {
      recognizerCallback(this, err, res, ...types);
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
  convert(conversionState = 'DIGITAL_EDIT') {
    if (this.canConvert) {
      triggerCallbacks(this, undefined, Constants.EventType.CONVERT);
      launchConvert(this, this.model, conversionState);
    }
  }

  /**
   * Set the guides for text
   * @param {Boolean} [enable]
   */
  setGuides(enable = true) {
    this.configuration.recognitionParams.v4.text.guides.enable = enable;
    launchConfig(this, this.model);
  }

  /**
   * Return the position of the cursor identifying the current state in the internal iink undo/redo stack.
   * @returns {Number}
   */
  get possibleUndoCount() {
    return this.recognizerContext.possibleUndoCount;
  }

  /**
   * The number of operations that it is currently possible to undo.
   * @returns {Number}
   */
  get undoStackIndex() {
    return this.recognizerContext.undoStackIndex;
  }

  /**
   * True if can export, false otherwise.
   * @return {Boolean}
   */
  get canExport() {
    return this.canUndo && this.canClear && this.recognizer && this.recognizer.getInfo().availableTriggers.exportContent.includes(Constants.Trigger.DEMAND);
  }

  /**
   * Explicitly ask to perform an export. You have to listen to events to get the content as this function is non blocking and does not have a return type.
   * @param {Array<String>} requestedMimeTypes Requested mime-types. Be sure to ask all the types required by the listeners of exported event.
   */
  export_(requestedMimeTypes) {
    if (this.canExport) {
      triggerCallbacks(this, undefined, Constants.EventType.EXPORT);
      launchExport(this, this.model, requestedMimeTypes, Constants.Trigger.DEMAND);
    }
  }

  /**
   * Import content.
   * @param {Blob|*} data Data to import
   * @param {String} [mimetype] Mimetype of the data, needed if data is not a Blob
   */
  import_(data, mimetype) {
    triggerCallbacks(this, undefined, Constants.EventType.IMPORT);
    launchImport(this, this.model, !(data instanceof Blob) ? new Blob([data], { type: mimetype }) : data);
  }

  /**
   * Get supported import mime types
   */
  getSupportedImportMimeTypes() {
    launchGetSupportedImportMimeTypes(this, this.model);
  }

  /**
   * pointer events
   * @param {PointerEvents} events
   */
  pointerEvents(events) {
    launchPointerEvents(this, this.model, events);
  }

  /**
   * Get current state exports
   * @return {Object}
   */
  get exports() {
    return this.model ? this.model.exports : undefined;
  }

  get supportedImportMimeTypes() {
    return this.recognizerContext.supportedImportMimeTypes;
  }

  /**
   * Function to call when the dom element link to the current ink paper has been resize.
   */
  resize() {
    logger.debug('Resizing editor');
    this.renderer.resize(this.rendererContext, this.model, this.stroker, this.configuration.renderingParams.minHeight, this.configuration.renderingParams.minWidth);
    launchResize(this, this.model);
  }

  /**
   * Set the theme (font family, font size and line height) depending on the language
   * @param lang
   */
  setThemeForFont(lang) {
    const defaultLang = !Object.keys(Constants.Languages).includes(lang);
    const armenian = lang === 'hy_AM';
    const fontFamily = defaultLang || armenian ? Constants.Languages.default : Constants.Languages[lang];
    const lineHeight = defaultLang || armenian ? '1.2' : '1.8';
    this.theme = {
      '.text': {
        'font-family': fontFamily,
        'line-height': lineHeight
      }
    };
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Get access to some easter egg features link ink injection. Use at your own risk (less tested and may be removed without notice).
   * @returns {{inkImporter: inkImporter}}
   */
  get eastereggs() {
    return { inkImporter };
  }
  /* eslint-enable class-methods-use-this */
}
