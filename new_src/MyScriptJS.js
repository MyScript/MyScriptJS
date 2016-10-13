import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import cloneJSObject from './util/Cloner';

export * from './configuration/DebugConfig';

const sucessEventEmitter = (domElement, recognizedModel) => {
  logger.debug('emmiting succes event', recognizedModel);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  domElement.dispatchEvent(new CustomEvent('success', { detail: recognizedModel }));
  return recognizedModel;
};

function launchRecognition(inkPaper) {
  // InlPaper Under Recogntion
  const inkPaperUR = inkPaper;

  const recognitionCallback = (recognizedModel) => {
    logger.debug('recognition callback', recognizedModel);
    const modelWithStateChanged = recognizedModel;
    modelWithStateChanged.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return modelWithStateChanged;
  };

  const modelsFusionCallback = (recognizedModel) => {
    if (recognizedModel.currentRecognitionId > inkPaperUR.model.lastRecognitionRequestId) {
      inkPaperUR.model.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
      inkPaperUR.model.recognizedComponents = recognizedModel.recognizedComponents;
      inkPaperUR.model.recognizedStrokes = inkPaperUR.model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(recognizedModel));

      for (let strokeId = (inkPaperUR.model.lastRecognitionRequestId + 1); strokeId <= recognizedModel.currentRecognitionId; strokeId++) {
        inkPaperUR.model.pendingStrokes[strokeId] = undefined;
      }
      inkPaperUR.model.lastRecognitionRequestId = recognizedModel.currentRecognitionId;
      inkPaperUR.model.state = MyScriptJSConstants.ModelState.RENDERING_RECOGNITION;
    }
    return recognizedModel;
  };

  const beautificationCallback = (recognizedModel) => {
    logger.debug('beautification callback');
    inkPaperUR.renderer.drawModel(inkPaperUR.renderingStructure, inkPaperUR.model, inkPaperUR.stroker);
  };

  const successEventCallback = (newModel) => {
    sucessEventEmitter(inkPaperUR.domElement, newModel);
  };

  const updateUndoRedoStackCallback = () => {
    inkPaperUR.model.state = MyScriptJSConstants.ModelState.RECOGNITION_OVER;
    UndoRedoManager.updateModelInStack(inkPaperUR.undoRedoManager, inkPaperUR.model);
  };

  // FIXME We should not give a reference but a copy of the model

  // Just memorize the current id to ease code reading in the sub functions
  inkPaperUR.model.currentRecognitionId = inkPaperUR.model.nextRecognitionRequestId;


  // Incrementation of the recogniton request id
  inkPaperUR.model.nextRecognitionRequestId++;
  inkPaperUR.model.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  inkPaperUR.recognizer.recognize(inkPaper.paperOptions, inkPaperUR.model)
  // FIXME Find the best way to handle Rest and Websocket recognitions
      .then(recognitionCallback)
      .then(modelsFusionCallback)
      .then(successEventCallback)
      .then(beautificationCallback)
      .then(updateUndoRedoStackCallback)
      .catch((error) => {
        // Handle any error from all above steps
        // TODO Manage a retry
        inkPaperUR.model.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
        logger.error('Error while firing  the recognition');
        logger.info(error.stack);
      });
  logger.debug('InkPaper penUp end');
}


class InkPaper {


  constructor(domElement, paperOptionsParam) {
    logger.debug(MyScriptJSParameter);
    this.paperOptions = MyScriptJSParameter.enrichParametersWithDefault(paperOptionsParam);
    this.model = InkModel.createModel();
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager();
    // Pushing the initial state in the undo redo manager
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);

    this.domElement = domElement;
    this.renderingStructure = this.renderer.populateRenderDomElement(domElement);
    this.grabber.attachGrabberEvents(this, domElement);
    // Managing the active pointer
    this.activePointerId = undefined;

    this.debug = {
      logger
    };
    // As we are manipulating a dom element no other way to change one of it's attribut without writing an impure function
    // eslint-disable-next-line no-param-reassign
    domElement['data-myscript-ink-paper'] = this;
  }

  set paperOptions(paramPaperOptions) {
    this.innerPaperOptions = paramPaperOptions;
    this.grabber = this.innerPaperOptions.behavior.grabber;
    this.renderer = this.innerPaperOptions.behavior.renderer;
    this.recognizer = this.innerPaperOptions.behavior.recognizer;
    this.stroker = this.innerPaperOptions.behavior.stroker;
  }

  get paperOptions() {
    return this.innerPaperOptions;
  }

  penDown(point, pointerId) {
    if (this.activePointerId) {
      //  this.activePointerId = undefined;
      logger.debug('Already in capture mode. No need to activate a new capture');
      if (this.activePointerId === pointerId) {
        logger.error('PenDown detect with the same id without any pen up');
      }
    } else {
      logger.debug('InkPaper penDown', pointerId, point);
      this.activePointerId = pointerId;
      this.model = InkModel.penDown(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    }
    // Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper penMove', pointerId, point);
      this.model = InkModel.penMove(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    } else {
      logger.debug('PenMove detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
    // Currently no recogntion on pen move
  }

  penUp(point, pointerId) {
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper penUp', pointerId);
      this.activePointerId = undefined;

      // Updtating model
      this.model = InkModel.penUp(this.model, point);
      // Updating undo/redo stack
      this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);

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
    const { newManager, newModel } = UndoRedoManager.undo(this.undoRedoManager);
    this.undoRedoManager = newManager;
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    sucessEventEmitter(this.domElement, newModel);
  }

  /**
   * Redo the last action.
   */
  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoManager.stack.length);
    const { newManager, newModel } = UndoRedoManager.redo(this.undoRedoManager);
    this.undoRedoManager = newManager;
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    sucessEventEmitter(this.domElement, newModel);
  }

  /**
   * Clear the output and the recognition result.
   */
  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.model = InkModel.createModel();
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    this.renderer.clear(this.renderingStructure);
    sucessEventEmitter(this.domElement, this.model);
  }

  /**
   * Explicitly ask to perform a recogntion of input.
   */
  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      this.recognizer.doRecognition(this.paperOptions, this.model, () => {
        logger.debug('updateModel');
      });
    }
  }

  /**
   * Function to call when the dom element link to the current inlk paper has been resized.
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

  set type(type) {
    logger.debug('Setting type to ', type);
    if (type === MyScriptJSConstants.RecognitionType.TEXT) {
      this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_TEXT);
    } else if (type === MyScriptJSConstants.RecognitionType.MATH) {
      this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_MATH);
    } else if (type === MyScriptJSConstants.RecognitionType.ANALYZER) {
      this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_ANALYZER);
    } else if (type === MyScriptJSConstants.RecognitionType.SHAPE) {
      this.paperOptions = MyScriptJSParameter.mergeParameters(this.paperOptions, MyScriptJSParameter.AVAILABLES_MODES.CDK_V3_REST_SHAPE);
    }
  }

  get type() {
    this.paperOptions.behavior.recognizer.getType();
  }

  get protocol() {
    this.paperOptions.recognitonParams.server.scheme;
  }

}
// TODO Manage a timed out recogntion

function register(domElement, paperOptions) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(domElement, paperOptions);
}

export { MyScriptJSConstants, register, InkPaper };

