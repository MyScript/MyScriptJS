import { editorLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSBehaviors from './configuration/DefaultBehaviors';
import * as MyScriptJSOptions from './configuration/DefaultConfiguration';
import * as MyScriptJSStyles from './configuration/DefaultStyles';
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
      case MyScriptJSConstants.EventType.UNDO:
      case MyScriptJSConstants.EventType.REDO:
      case MyScriptJSConstants.EventType.CLEAR:
      case MyScriptJSConstants.EventType.TYPESET:
      case MyScriptJSConstants.EventType.RECOGNIZE:
        callbacks.forEach(callback => callback.call(element, model.rawResults.state, type));
        break;
      case MyScriptJSConstants.EventType.CHANGE:
        callbacks.forEach(callback => callback.call(element, model.rawResults.state, type));
        break;
      case MyScriptJSConstants.EventType.RECOGNITION_RESULT:
        callbacks.forEach(callback => callback.call(element, { rawResult: model.rawResults.recognition, recognitionResult: model.recognitionResult }, type));
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
  if (RecognizerContext.isResetRequired(recognizerContext, model)) {
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
 * Check if the recognition mode in parameter is the one configured.
 * @param {Editor} editor
 * @param {String} recognitionMode
 * @return {Boolean}
 */
function isRecognitionModeConfigured(editor, recognitionMode) {
  return editor.recognizer &&
      editor.configuration.recognitionTriggerOn === MyScriptJSConstants.RecognitionTrigger[recognitionMode] &&
      editor.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.RECOGNITION) &&
      editor.recognizer.getInfo().availableTriggers.includes(MyScriptJSConstants.RecognitionTrigger[recognitionMode]);
}

function recognizerCallback(editor, error, model, ...types) {
  const editorRef = editor;
  const modelRef = model;
  if (error) {
    logger.error('Error while firing the recognition', error.stack); // Handle any error from all above steps
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;

    triggerCallbacks(editor.callbacks, error, editor.domElement, MyScriptJSConstants.EventType.ERROR);
  } else {
    logger.debug('Recognizer callback', modelRef);
    modelRef.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;

    if (editorRef.undoRedoManager.updateModel) {
      editorRef.undoRedoManager.updateModel(editorRef.configuration, modelRef, editorRef.undoRedoContext, (err, res) => logger.debug('Undo/redo stack updated'));
    }

    // Merge recognized model if relevant and return current editor model
    if ((modelRef.creationTime === editor.model.creationTime) &&
        (modelRef.rawStrokes.length === editor.model.rawStrokes.length) &&
        (modelRef.lastRecognitionPositions.lastSentPosition >= editor.model.lastRecognitionPositions.lastReceivedPosition)) {
      editorRef.model = InkModel.mergeModels(editorRef.model, modelRef);

      if (InkModel.needRedraw(editorRef.model)) {
        editor.renderer.drawModel(editor.rendererContext, editorRef.model, editor.stroker);
      }
      /* eslint-disable no-undef*/
      window.clearTimeout(editorRef.sendEventTimer);
      editorRef.sendEventTimer = window.setTimeout(() => {
        triggerCallbacks(editor.callbacks, editorRef.model, editor.domElement, ...types);
      }, isRecognitionModeConfigured(editorRef, MyScriptJSConstants.RecognitionTrigger.POINTER_UP) ? editorRef.configuration.recognitionProcessDelay : 0);
      /* eslint-enable no-undef */
    }
  }
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} modelToFeed
 */
function addStrokes(editor, modelToFeed) {
  manageResetState(editor.recognizer.clear, editor.recognizer.addStrokes, editor.configuration, modelToFeed, editor.recognizerContext, (err, res) => {
    recognizerCallback(editor, err, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
  });
}

/**
 * Launch the recognition with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} modelToRecognize
 */
function launchRecognition(editor, modelToRecognize) {
  manageResetState(editor.recognizer.clear, editor.recognizer.recognize, editor.configuration, modelToRecognize, editor.recognizerContext, (err, res) => {
    recognizerCallback(editor, err, res, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
  });
}

/**
 * Launch the typeset with all editor relative configuration and state.
 * @param {Editor} editor
 * @param {Model} modelToTypeset
 */
function launchTypeset(editor, modelToTypeset) {
  editor.recognizer.typeset(editor.configuration, modelToTypeset, editor.recognizerContext, (err, res) => {
    recognizerCallback(editor, err, res, MyScriptJSConstants.EventType.TYPESET_RESULT, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
  });
}
/**
 * Inner function with all the logic on resize.
 * @param {Editor} editor
 */
function resize(editor) {
  if (editor.recognizer.resize) {
    editor.recognizer.resize(editor.configuration, editor.model, editor.recognizerContext, (err, res) => {
      recognizerCallback(editor, err, res, MyScriptJSConstants.EventType.TYPESET_RESULT);
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
  logger.info(`model changed callback on ${types} event(s)`, model);
  editor.renderer.drawModel(editor.rendererContext, model, editor.stroker);

  triggerCallbacks(editor.callbacks, model, editor.domElement, ...types);

  const editorRef = editor;
  // Firing recognition only if recognizer is configure to do it
  if (InkModel.extractPendingStrokes(model).length > 0) {
    if (isRecognitionModeConfigured(editor, MyScriptJSConstants.RecognitionTrigger.QUIET_PERIOD)) {
      /* eslint-disable no-undef*/
      window.clearTimeout(editorRef.launchRecognitionTimer);
      editorRef.launchRecognitionTimer = window.setTimeout(() => {
        launchRecognition(editorRef, model);
      }, editorRef.configuration.recognitionTriggerDelay);
      /* eslint-enable no-undef */
    } else if (isRecognitionModeConfigured(editor, MyScriptJSConstants.RecognitionTrigger.POINTER_UP)) {
      launchRecognition(editor, model);
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
  window.clearTimeout(editor.sendEventTimer);
  window.clearTimeout(editor.launchRecognitionTimer);
  /* eslint-enable no-undef*/
}

/**
 * Inner function with all the logic on pointerUp.
 * @param {Editor} editor
 */
function managePointerUp(editor) {
  const editorRef = editor;
  editorRef.model.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;

  // Pushing the state in the undo redo manager
  if (editor.undoRedoManager.updateModel) {
    editor.undoRedoManager.updateModel(editor.configuration, editor.model, editor.undoRedoContext, (err, res) => {
      modelChangedCallback(editor, res, MyScriptJSConstants.EventType.CHANGE);
    }); // Push model in undo redo manager
  }

  if (editor.recognizer.addStrokes) {
    addStrokes(editorRef, editor.model);
  }
}

/**
 * Editor
 */
export class Editor {

  /**
   * @param {Element} element DOM element to attach this editor
   * @param {Configuration} [configuration] Configuration to apply
   * @param {Styles} [customStyle] Custom style to apply
   * @param {Behaviors} [behaviors] Custom behaviors to apply
   */
  constructor(element, configuration, customStyle, behaviors) {
    /**
     * Inner reference to the DOM Element
     * @type {Element}
     */
    this.domElement = element;
    this.domElement.classList.add('ms-editor');

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
    this.customStyle = customStyle;
    this.configuration = configuration;

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
    this.innerOptions = MyScriptJSOptions.overrideDefaultConfiguration(configuration);

    /**
     * Current model
     * @type {Model}
     */
    this.model = InkModel.createModel(this.innerOptions);

    // INFO: Recognizer needs model to be initialized
    this.behavior = this.behaviors.getBehaviorFromConfiguration(this.behaviors, this.innerOptions);
  }

  /**
   * Get the current recognition parameters
   * @return {Configuration}
   */
  get configuration() {
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
        this.innerRecognizer.close(this.configuration, this.model, this.recognizerContext, () => logger.info('Recognizer closed'));
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
          this.undoRedoContext = UndoRedoContext.createUndoRedoContext(this.configuration);
          this.undoRedoManager = UndoRedoManager;
        }

        this.innerRecognizer.init(this.configuration, this.model, this.recognizerContext, (err, res) => {
          this.model = res;
          if (this.undoRedoManager.updateModel) {
            this.undoRedoManager.updateModel(this.configuration, this.model, this.undoRedoContext, callback);
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
   * Handle a pointer down
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   * @param {String} [pointerType] Current pointer type
   */
  pointerDown(point, pointerType) {
    logger.debug('Pointer down', point);
    managePointerDown(this);
    this.model = InkModel.initPendingStroke(this.model, point, Object.assign({ pointerType }, this.customStyle.strokeStyle));
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pointer down
  }

  /**
   * Handle a pointer move
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  pointerMove(point) {
    logger.debug('Pointer move', point);
    this.model = InkModel.appendToPendingStroke(this.model, point);
    this.renderer.drawCurrentStroke(this.rendererContext, this.model, this.stroker);
    // Currently no recognition on pointer move
  }

  /**
   * Handle a pointer up
   * @param {{x: Number, y: Number, t: Number}} point Captured point coordinates
   */
  pointerUp(point) {
    logger.debug('Pointer up', point);
    this.model = InkModel.endPendingStroke(this.model, point);
    this.renderer.drawModel(this.rendererContext, this.model, this.stroker);
    managePointerUp(this);
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('Undo current model', this.model);
    triggerCallbacks(this.callbacks, this.model, this.domElement, MyScriptJSConstants.EventType.UNDO);
    this.undoRedoManager.undo(this.configuration, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    });
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('Redo current model', this.model);
    triggerCallbacks(this.callbacks, this.model, this.domElement, MyScriptJSConstants.EventType.REDO);
    this.undoRedoManager.redo(this.configuration, this.model, this.undoRedoContext, (err, res) => {
      this.model = res;
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    });
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('Clear current model', this.model);
    triggerCallbacks(this.callbacks, this.model, this.domElement, MyScriptJSConstants.EventType.CLEAR);
    const callback = (err, res) => {
      modelChangedCallback(this, res, MyScriptJSConstants.EventType.CHANGE, MyScriptJSConstants.EventType.RECOGNITION_RESULT);
    };

    this.recognizer.clear(this.configuration, this.model, this.recognizerContext, (err, res) => {
      this.model = InkModel.createModel(this.configuration);
      if (this.undoRedoManager.updateModel) {
        this.undoRedoManager.updateModel(this.configuration, this.model, this.undoRedoContext, callback);
      } else {
        callback(undefined, this.model);
      }
    });
  }

  /**
   * typeset the current part
   */
  typeset() {
    triggerCallbacks(this.callbacks, this.model, this.domElement, MyScriptJSConstants.EventType.TYPESET);
    if (this.recognizer &&
        this.recognizer.getInfo().availableFeatures.includes(MyScriptJSConstants.RecognizerFeature.TYPESET)) {
      launchTypeset(this, this.model);
    }
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    triggerCallbacks(this.callbacks, this.model, this.domElement, MyScriptJSConstants.EventType.RECOGNIZE);
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
    logger.debug('Resizing editor');
    this.renderer.resize(this.rendererContext, this.model, this.stroker);
    /* eslint-disable no-undef */
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      resize(this);
    }, this.configuration.resizeTriggerDelay);
    /* eslint-disable no-undef*/
  }
}
