import { inkpaperLogger as logger } from './configuration/LoggerConfig';
import * as MyScriptJSParameter from './configuration/MyScriptJSParameter';
import * as Model from './model/InkModel';
import MyScriptJSConstants from './configuration/MyScriptJSConstants';

function launchRecognition(inkPaper) {
  const model = inkPaper.model;
  const stroker = inkPaper.stroker;
  const renderer = inkPaper.renderer;
  const renderingStructure = inkPaper.renderingStructure;
  const recognizer = inkPaper.recognizer;
  const domElement = inkPaper.domElement;

  const recognitionCallback = function (recognizedModel) {
    logger.debug('recognition callback', recognizedModel);
    return recognizedModel;
  };

  const sucessEventEmitter = function (recognizedModel) {
    logger.debug('emmiting succes event', recognizedModel);
    domElement.dispatchEvent(new CustomEvent('success', { detail: recognizedModel }));
    return recognizedModel;
  };

  const modelsFusion = function (recognizedModel) {
    if (recognizedModel.currentRecognitionId > model.lastRecognitionRequestId) {
      model.recognizedComponents = recognizedModel.recognizedComponents;
      model.recognizedStrokes = model.recognizedStrokes.concat(Model.extractNonRecognizedStrokes(recognizedModel));

      for (let strokeId = (model.lastRecognitionRequestId + 1); strokeId <= recognizedModel.currentRecognitionId; strokeId++) {
        model.pendingStrokes[strokeId] = undefined;
      }

      model.lastRecognitionRequestId = recognizedModel.currentRecognitionId;
    }
    return recognizedModel;
  };

  const beautificationCallback = function (recognizedModel) {
    logger.debug('beautification callback');
    renderer.drawModel(renderingStructure, model, stroker);
  };
  //FIXME We should not give a reference but a copy of the model

  //Just memorize the current id to ease code reading in the sub functions
  model.currentRecognitionId = model.nextRecognitionRequestId;
  const modelCopy = JSON.parse(JSON.stringify(model));

  //Incrementation of the recogniton request id
  model.nextRecognitionRequestId++;

  recognizer.recognize(inkPaper.paperOptions, modelCopy)
  //FIXME Find the best way to handle Rest and Websocket recogntions
      .then(recognitionCallback)
      .then(modelsFusion)
      .then(sucessEventEmitter)
      .then(beautificationCallback)
      .catch((error) => {
        // Handle any error from all above steps
        //TODO Manage a retry
        logger.info('Error while firing the recognition', error);
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
    this.model = Model.createModel();
    //This switch is only there to allow testing of class inkpaper
    if (domElement) {
      this.domElement = domElement;
      this.renderingStructure = this.renderer.populateRenderDomElement(domElement);
      this.grabber.attachGrabberEvents(this, domElement);
      //Managing the active pointer
      this.activePointerId = undefined;

      // As we are manipulating a dom element no other way to change one of it's attribut without writing an impure function
      // eslint-disable-next-line no-param-reassign
      domElement['data-myscript-ink-paper'] = this;
    }
  }

  penDown(point, pointerId) {
    if (this.activePointerId) {
      //this.activePointerId = undefined;
      logger.debug('Already in capture mode. No need to activate a new capture');
      if (this.activePointerId === pointerId) {
        logger.error('PenDown detect with the same id without any pen up');
      }
    } else {
      logger.debug('InkPaper penDown', pointerId);
      this.activePointerId = pointerId;
      this.model = Model.penDown(this.model, point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    }
    //Currently no recognition on pen down
  }

  penMove(point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug('InkPaper penMove', pointerId, point);
      this.model = Model.penMove(this.model, point);
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
      this.model = Model.penUp(this.model, point);

      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);

      //Firing recognition only if recognizer is configure to do it
      if (MyScriptJSConstants.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logger.debug('PenUp detect from another pointerid {}', pointerId, 'active id is', this.activePointerId);
    }
  }

  undo() {
    logger.debug('InkPaper undo ask');
  }

  redo() {
    logger.debug('InkPaper redo ask');
  }

  clear() {
    logger.debug('InkPaper clear ask');
  }

  askForRecognition() {
    if (MyScriptJSConstants.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      this.recognizer.doRecognition(this.paperOptions, this.model, () => {
        logger.debug('updateModel');
      });
    }
  }


}

//TODO Manage a timed out recogntion
function register(domElement, paperOptions) {

  return new InkPaper(domElement, paperOptions);
}
console.log('Declaration of constant *2');

export default { InkPaper, register };