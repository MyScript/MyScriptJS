import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import * as ModelStats from './util/ModelStats';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import * as ImageRenderer from './renderer/canvas/ImageRenderer';
import * as RecognizerContext from './model/RecognizerContext';
import emitEvent from './callback/EventCallback';

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
    logger.debug('modelsFusionCallback callback');
    return InkModel.mergeRecognizedModelIntoModel(modelClonedWithRecognition, modelReference);
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
    UndoRedoManager.pushModel(inkPaperReference.undoRedoManager, modelCloneWithRecognition);
    return modelCloneWithRecognition;
  };

  const modelClone = InkModel.cloneAndUpdateRecognitionPositions(modelReference);
  inkPaperReference.recognizer.manageResetState(inkPaper.paperOptions, modelClone, inkPaperReference.recognizer, inkPaper.recognizerContext)
      .then(
          () => {
            inkPaperReference.recognizer.recognize(inkPaper.paperOptions, modelClone, inkPaper.recognizerContext)
  // FIXME Find the best way to handle Rest and Websocket recognitions
      .then(recognitionCallback)
      .then(modelsFusionCallback)
      .then(updateUndoRedoStackCallback)
      .then(successEventCallback)
      .then(beautificationCallback)
      .catch((error) => {
        // Handle any error from all above steps
        // TODO Manage a retry
        modelReference.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
        UndoRedoManager.pushModel(inkPaperReference.undoRedoManager, modelReference);
        emitEvent(inkPaperReference.domElement, { undoRedoPosition: inkPaperReference.undoRedoManager.currentPosition, undoRedoStackLength: inkPaperReference.undoRedoManager.stack.length }, 'undoredoupdated');
        logger.error('Error while firing  the recognition');
        logger.info(error.stack);
      });
          }
      );
  logger.debug('InkPaper initPendingStroke end');
}


export class InkPaper2 {

  constructor(domElement, paperOptionsParam, behaviorsParam) {
    this.paperOptions = MyScriptJSParameter.enrichParametersWithDefault(paperOptionsParam);
    this.behaviors = MyScriptJSParameter.enrichBehaviorsWithDefault(behaviorsParam);
    this.model = this.recognizer.populateModel(this.paperOptions, InkModel.createModel());
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
      this.model = InkModel.initPendingStroke(this.model, point, this.paperOptions.renderingParams.strokeStyle);
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
      logger.debug(`PenMove detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
    // Currently no recognition on pen move
  }

  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper initPendingStroke', pointerId);
      this.activePointerId = undefined;

      // Updating model
      this.model = InkModel.endPendingStroke(this.model, point);
      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
      // Updating undo/redo stack
      // this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);

      // Firing recognition only if recognizer is configure to do it
      if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logger.debug(`PenUp detect from another pointerid (${pointerId}), active id is ${this.activePointerId}`);
    }
  }

  /**
   * Undo the last action.
   */
  undo() {
    logger.debug('InkPaper undo ask', this.undoRedoManager.stack.length);
    this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
    this.recognizer.reset(this.paperOptions, this.model, this.recognizerContext);
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
    this.recognizer.reset(this.paperOptions, this.model, this.recognizerContext);
    this.model = this.recognizer.populateModel(this.paperOptions, InkModel.createModel(this.model));
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);
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
      logger.error(`Unknown ${this.innerProtocol} protocol, using WS`);
      this.protocol = MyScriptJSConstants.Protocol.WS;
    }
    if (this.protocol === MyScriptJSConstants.Protocol.REST) {
      if (this.type === MyScriptJSConstants.RecognitionType.TEXT) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_TEXT);
      } else if (this.type === MyScriptJSConstants.RecognitionType.MATH) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_MATH);
      } else if (this.type === MyScriptJSConstants.RecognitionType.ANALYZER) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_ANALYZER);
      } else if (this.type === MyScriptJSConstants.RecognitionType.SHAPE) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_SHAPE);
      } else if (this.type === MyScriptJSConstants.RecognitionType.MUSIC) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_MUSIC);
      } else {
        logger.error(`Unknown ${this.type} recognition type, using TEXT`);
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_TEXT);
      }
    } else if (this.protocol === MyScriptJSConstants.Protocol.WS) {
      if (this.type === MyScriptJSConstants.RecognitionType.TEXT) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_TEXT);
      } else if (this.type === MyScriptJSConstants.RecognitionType.MATH) {
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_MATH);
      } else {
        logger.error(`Unknown ${this.type} recognition type, using TEXT`);
        this.behaviors = MyScriptJSParameter.mergeBehaviors(this.behaviors, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_WS_TEXT);
      }
    }
    this.model = this.recognizer.populateModel(this.paperOptions, this.model);
  }

  set paperOptions(paramPaperOptions) {
    this.innerPaperOptions = paramPaperOptions;
    // FIXME We need to reset the model and move all the recognized strokes as input strokes
  }

  get paperOptions() {
    return this.innerPaperOptions;
  }

  set behaviors(paramBehaviors) {
    this.innerBehaviors = paramBehaviors;
    this.grabber = this.innerBehaviors.grabber;
    this.renderer = this.innerBehaviors.renderer;
    this.recognizer = this.innerBehaviors.recognizer;
    this.recognizerContext = RecognizerContext.createEmptyRecognizerContext();
    this.recognizer.init(this.innerPaperOptions, this.recognizerContext);
    this.stroker = this.innerBehaviors.stroker;
    // FIXME We need to reset the model and move all the recognized strokes as input strokes
  }

  get behaviors() {
    return this.innerBehaviors;
  }

  set type(type) {
    logger.debug(`Setting type to ${type}`);
    this.innerType = type;
    this.clear();
    this.updateRecognizer();
  }

  get type() {
    if (!this.innerType) {
      this.innerType = this.behaviors.recognizer.getType();
    }
    return this.innerType;
  }

  set protocol(protocol) {
    logger.debug(`Setting protocol to ${protocol}`);
    this.innerProtocol = protocol;
    this.clear();
    this.updateRecognizer();
  }

  get protocol() {
    if (!this.innerProtocol) {
      this.innerProtocol = this.behaviors.recognizer.getProtocol();
    }
    return this.innerProtocol;
  }

  get png() {
    return ImageRenderer.getImage(this.model, this.stroker);
  }

  set recognizer(recognizer) {
    this.innerRecognizer = recognizer;
  }

  get recognizer() {
    return this.innerRecognizer;
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

export function register(domElement, paperOptions, behaviors) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper2(domElement, paperOptions, behaviors);
}
