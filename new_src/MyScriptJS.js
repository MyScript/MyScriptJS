import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as InkModel from './model/InkModel';
import * as UndoRedoManager from './model/UndoRedoManager';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';
import DebugConfig from './configuration/DebugConfig';


const sucessEventEmitter = (domElement, recognizedModel) => {
  logger.debug('emmiting succes event', recognizedModel);
  // We are making usage of a browser provided class
  // eslint-disable-next-line no-undef
  domElement.dispatchEvent(new CustomEvent('success', { detail: recognizedModel }));
  return recognizedModel;
};

function launchRecognition(inkPaper) {
  const inkPaperUnderRecognition = inkPaper;
  const model = InkModel.clone(inkPaper.model);
  const stroker = inkPaper.stroker;
  const renderer = inkPaper.renderer;
  const renderingStructure = inkPaper.renderingStructure;
  const recognizer = inkPaper.recognizer;
  const domElement = inkPaper.domElement;

  const recognitionCallback = (recognizedModel) => {
    logger.debug('recognition callback', recognizedModel);
    const modelWithStateChanged = recognizedModel;
    modelWithStateChanged.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
    return modelWithStateChanged;
  };

  const modelsFusion = (recognizedModel) => {
    if (recognizedModel.currentRecognitionId > model.lastRecognitionRequestId) {
      model.recognizedComponents = recognizedModel.recognizedComponents;
      model.recognizedStrokes = model.recognizedStrokes.concat(InkModel.extractNonRecognizedStrokes(recognizedModel));

      for (let strokeId = (model.lastRecognitionRequestId + 1); strokeId <= recognizedModel.currentRecognitionId; strokeId++) {
        model.pendingStrokes[strokeId] = undefined;
      }
      model.lastRecognitionRequestId = recognizedModel.currentRecognitionId;
      model.state = MyScriptJSConstants.ModelState.PROCESSING_RECOGNITION_RESULT;
      inkPaperUnderRecognition.model = model;
    }
    return recognizedModel;
  };

  const beautificationCallback = (recognizedModel) => {
    logger.debug('beautification callback');
    renderer.drawModel(renderingStructure, model, stroker);
  };
  //FIXME We should not give a reference but a copy of the model

  //Just memorize the current id to ease code reading in the sub functions
  model.currentRecognitionId = model.nextRecognitionRequestId;


  //Incrementation of the recogniton request id
  model.nextRecognitionRequestId++;
  model.state = MyScriptJSConstants.ModelState.ASKING_FOR_RECOGNITION;
  recognizer.recognize(inkPaper.paperOptions, model)
  //FIXME Find the best way to handle Rest and Websocket recogntions
      .then(recognitionCallback)
      .then(modelsFusion)
      .then((newModel) => {
        sucessEventEmitter(domElement, newModel);
      })
      .then(beautificationCallback)
      .catch((error) => {
        // Handle any error from all above steps
        //TODO Manage a retry
        model.state = MyScriptJSConstants.ModelState.RECOGNITION_ERROR;
        logger.error('Error while firing  the recognition');
        logger.info(error.stack);
      });
  logger.debug('InkPaper penUp end');
}


class InkPaper {


  //TODO Replace this ugly new with a create function
  constructor(domElement, paperOptionsParam) {
    logger.debug(MyScriptJSParameter);
    this.paperOptions = MyScriptJSParameter.enrichParametersWithDefault(paperOptionsParam);
    this.grabber = this.paperOptions.behavior.grabber;
    this.renderer = this.paperOptions.behavior.renderer;
    this.recognizer = this.paperOptions.behavior.recognizer;
    this.stroker = this.paperOptions.behavior.stroker;
    this.model = InkModel.createModel();
    this.undoRedoManager = UndoRedoManager.createUndoRedoManager();
    //Pushing the initial state in the undo redo manager
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);

    this.domElement = domElement;
    this.renderingStructure = this.renderer.populateRenderDomElement(domElement);
    this.grabber.attachGrabberEvents(this, domElement);
    //Managing the active pointer
    this.activePointerId = undefined;

    this.debug = {
      logger
    };
    // As we are manipulating a dom element no other way to change one of it's attribut without writing an impure function
    // eslint-disable-next-line no-param-reassign
    domElement['data-myscript-ink-paper'] = this;
  }

  penDown(point, pointerId) {
    if (this.activePointerId) {
      //this.activePointerId = undefined;
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
    //Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper penMove', pointerId, point);
      this.model = InkModel.penMove(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    } else {
      logger.debug('PenMove detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
    //Currently no recogntion on pen move
  }

  penUp(point, pointerId) {
    //Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper penUp', pointerId);
      this.activePointerId = undefined;

      //Updtating model
      this.model = InkModel.penUp(this.model, point);
      // Updating undo/redo stack
      this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);

      //Firing recognition only if recognizer is configure to do it
      if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logger.debug('PenUp detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
  }


  undo() {
    logger.debug('InkPaper undo ask', this.undoRedoManager.stack.length);
    const { newManager, newModel } = UndoRedoManager.undo(this.undoRedoManager);
    this.undoRedoManager = newManager;
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    sucessEventEmitter(this.domElement, newModel);
  }

  redo() {
    logger.debug('InkPaper redo ask', this.undoRedoManager.stack.length);
    const { newManager, newModel } = UndoRedoManager.redo(this.undoRedoManager);
    this.undoRedoManager = newManager;
    this.model = newModel;
    this.renderer.drawModel(this.renderingStructure, newModel, this.stroker);
    sucessEventEmitter(this.domElement, newModel);
  }

  clear() {
    logger.debug('InkPaper clear ask', this.undoRedoManager.stack.length);
    this.model = InkModel.createModel();
    this.undoRedoManager = UndoRedoManager.pushModel(this.undoRedoManager, this.model);
    this.renderer.clear(this.renderingStructure);
    sucessEventEmitter(this.domElement, this.model);
  }

  askForRecognition() {
    if (this.recognizer && MyScriptJSConstants.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      this.recognizer.doRecognition(this.paperOptions, this.model, () => {
        logger.debug('updateModel');
      });
    }
  }

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
}
//TODO Manage a timed out recogntion

function register(domElement, paperOptions) {
  logger.debug('Registering a new inkpaper');
  return new InkPaper(domElement, paperOptions);
}

export default { InkPaper, register, DebugConfig };