import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

export * from './configuration/DebugConfig';

const successEventEmitter = (domElement, recognizedModel, eventName = 'success') => {
  logger.debug('emitting success event', recognizedModel);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  domElement.dispatchEvent(new CustomEvent(eventName, { detail: recognizedModel }));
  return recognizedModel;
};

function launchRecognition(inkPaper) {
  // InkPaper Under Recognition
  const inkPaperReference = inkPaper;
  const modelReference = inkPaperReference.model;

  const recognitionCallback = (modelCloneWithRecognition) => {
    logger.debug('recognition callback', modelCloneWithRecognition);
    const modelWithStateChanged = modelCloneWithRecognition;
    modelWithStateChanged.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return modelWithStateChanged;
  };

  const modelsFusionCallback = (modelClonedWithRecognition) => {
    if (modelClonedWithRecognition.currentRecognitionId > modelReference.lastRecognitionRequestId) {
      modelReference.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
      modelReference.recognizedSymbols = modelClonedWithRecognition.recognizedSymbols;
     // modelReference.rawRecognizedStrokes = inkPaperReference.model.rawRecognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(modelClonedWithRecognition));

      for (let strokeId = (modelClonedWithRecognition.lastRecognitionRequestId + 1); strokeId <= modelClonedWithRecognition.currentRecognitionId; strokeId++) {
        modelReference.rawRecognizedStrokes.push(...modelClonedWithRecognition.pendingStrokes[strokeId]);
        modelReference.pendingStrokes[strokeId] = undefined;
      }
      modelReference.lastRecognitionRequestId = modelClonedWithRecognition.currentRecognitionId;
      modelReference.state = MyScriptJSConstants.ModelState.RENDERING_RECOGNITION;
    }
    return modelClonedWithRecognition;
  };

  const beautificationCallback = (modelCloneWithRecognition) => {
    logger.debug('beautification callback');
    inkPaperReference.renderer.drawModel(inkPaperReference.renderingStructure, modelReference, inkPaperReference.stroker);
    return modelCloneWithRecognition;
  };

  const successEventCallback = (modelCloneWithRecognition) => {
    successEventEmitter(inkPaperReference.domElement, modelCloneWithRecognition);
    return modelCloneWithRecognition;
  };

  const updateUndoRedoStackCallback = (modelCloneWithRecognition) => {
    modelReference.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
    UndoRedoManager.pushModel(inkPaperReference.undoRedoManager, inkPaperReference.model);
    return modelCloneWithRecognition;
  };

  const modelClone = InkModel.cloneModel(modelReference);

  // Just memorize the current id to ease code reading in the sub functions
  // Incrementation of the recognition request id
  modelClone.currentRecognitionId = modelReference.nextRecognitionRequestId++;
  modelClone.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;

  inkPaperReference.recognizer.recognize(inkPaper.paperOptions, modelClone)
  // FIXME Find the best way to handle Rest and Websocket recognitions
      .then(recognitionCallback)
      .then(modelsFusionCallback)
      .then(successEventCallback)
      .then(beautificationCallback)
      .then(updateUndoRedoStackCallback)
      .catch((error) => {
        // Handle any error from all above steps
        // TODO Manage a retry
        modelReference.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
        logger.error('Error while firing  the recognition');
        logger.info(error.stack);
      });
  logger.debug('InkPaper initPendingStroke end');
}


class InkPaper {

  constructor(domElement, paperOptionsParam) {
    this.paperOptions = MyScriptJSParameter.enrichParametersWithDefault(paperOptionsParam);
    this.model = InkModel.createModel();
    this.domElement = domElement;
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager(this.domElement);
    // Pushing the initial state in the undo redo manager
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);

    this.renderingStructure = this.renderer.populateRenderDomElement(this.domElement);
    this.grabber.attachGrabberEvents(this, this.domElement);
    // Managing the active pointer
    this.activePointerId = undefined;

    this.debug = {
      logger
    };
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
      logger.debug('InkPaper endPendingStroke', pointerId, point);
      this.activePointerId = pointerId;
      this.model = InkModel.endPendingStroke(this.model, point, this.paperOptions.renderingParams.strokeStyle);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    }
    // Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper appendToPendingStroke', pointerId, point);
      this.model = InkModel.appendToPendingStroke(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    } else {
      logger.debug('PenMove detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
    // Currently no recognition on pen move
  }

  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper initPendingStroke', pointerId);
      this.activePointerId = undefined;

      // Updating model
      this.model = InkModel.initPendingStroke(this.model, point);
      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
      // Updating undo/redo stack
      // this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);

      // Firing recognition only if recognizer is configure to do it
      if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logger.debug('PenUp detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('InkPaper undo ask', this.undoRedoManager.stack.length);
    const { undoRedoManagerReference, newModel } = UndoRedoManager.undo(this.undoRedoManager);
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    successEventEmitter(this.domElement, newModel);
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoManager.stack.length);
    const { undoRedoManagerReference, newModel } = UndoRedoManager.redo(this.undoRedoManager);
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    successEventEmitter(this.domElement, newModel);
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.model = InkModel.createModel();
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    this.renderer.clear(this.renderingStructure);
    successEventEmitter(this.domElement, this.model);
  }

  /**
   * Explicitly ask to perform a recognition of input.
   */
  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      this.recognizer.doRecognition(this.paperOptions, this.model, () => {
        logger.debug('updateModel');
      });
    }
  }


  /**
   * Function to call when the dom element link to the current ink paper has been resized.
   */
  resize() {
    logger.debug('Resizing inkPaper');
    // Using a timeout here to prevent multiple redraw while user is resizing the window
    /* eslint-disable no-undef */
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      logger.debug(this);
      this.renderer.updateCanvasSizeToParentOne(this.domElement, this.renderingStructure, this.model, this.stroker);
    }, 20);
    /* eslint-enable no-undef */
  }

  updateRecognizer() {
    if (this.protocol !== MyScriptJSConstants.Protocol.WS && this.protocol !== MyScriptJSConstants.Protocol.REST) {
      logger.error('Unknown protocol ' + this.innerProtocol + ', using WS');
      this.protocol = MyScriptJSConstants.Protocol.WS;
    }
    if (this.protocol === MyScriptJSConstants.Protocol.REST) {
      if (this.type === MyScriptJSConstants.RecognitionType.TEXT) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_TEXT);
      } else if (this.type === MyScriptJSConstants.RecognitionType.MATH) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_MATH);
      } else if (this.type === MyScriptJSConstants.RecognitionType.ANALYZER) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_ANALYZER);
      } else if (this.type === MyScriptJSConstants.RecognitionType.SHAPE) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_SHAPE);
      } else {
        logger.error('Unknown recognition type ' + this.type + ', using TEXT');
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_TEXT);
      }
    } else if (this.protocol === MyScriptJSConstants.Protocol.WS) {
      if (this.type === MyScriptJSConstants.RecognitionType.TEXT) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_TEXT);
      } else if (this.type === MyScriptJSConstants.RecognitionType.MATH) {
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_MATH);
      } else {
        logger.error('Unknown recognition type ' + this.type + ', using TEXT');
        this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_TEXT);
      }
    }
  }

  set paperOptions(paramPaperOptions) {
    this.innerPaperOptions = paramPaperOptions;
    this.grabber = this.innerPaperOptions.behavior.grabber;
    this.renderer = this.innerPaperOptions.behavior.renderer;
    this.recognizer = this.innerPaperOptions.behavior.recognizer;
    this.stroker = this.innerPaperOptions.behavior.stroker;
    // FIXME We need to reset the model and move all the recognized strokes as input strokes
  }

  get paperOptions() {
    return this.innerPaperOptions;
  }

  set type(type) {
    logger.debug('Setting type to ', type);
    this.innerType = type;
    this.clear();
    this.updateRecognizer();
  }

  get type() {
    if (!this.innerType) {
      this.innerType = this.paperOptions.behavior.recognizer.getType();
    }
    return this.innerType;
  }

  set protocol(protocol) {
    logger.debug('Setting protocol to ', protocol);
    this.innerProtocol = protocol;
    this.clear();
    this.updateRecognizer();
  }

  get protocol() {
    if (!this.innerProtocol) {
      this.innerProtocol = this.paperOptions.behavior.recognizer.getProtocol();
    }
    return this.innerProtocol;
  }

  /**
   * Return the stats allowing to monitor what ink size is send to the server.
   * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
   */
  getStats() {
    return ModelStats.computeStats(this.model);
  }
}
// TODO Manage a timed out recognition

function register(domElement, paperOptions) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(domElement, paperOptions);
}

export {
    MyScriptJSConstants,
    register,
    InkPaper
};

