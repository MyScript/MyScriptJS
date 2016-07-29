'use strict';

(function (scope, logging) {

  var logger = logging.getLogger('inkpaper');


  //TODO Replace this ugly new with a create function
  function InkPaper(domElement, paperOptions) {
    this.type = "InkPaper";
    this.grabber = scope.Grabber.create(paperOptions);

    //TODO use the right pattern
    this.model = new scope.InkModel();
    this.domElement = domElement;

    this.paperOptions = paperOptions;
    this.renderer =  scope.RendererFactory.create('canvas');
    this.renderingStructure = this.renderer.populateRenderDomElement(domElement);
    this.recognizer = scope.RecognizerFactory.create('Cdkv3RestMathRecognizer');
    this.stroker = new scope.QuadraticCanvasStroker();
    this.grabber.attachEvents(this, domElement, this.model, null, null);

    //Managing the active pointer
    this.activePointerId = undefined;

    domElement['data-myscript-ink-paper'] = this;
  }





  InkPaper.prototype.penDown = function (point, pointerId) {

    if (this.activePointerId) {
      //this.activePointerId = undefined;
      logger.debug("Already in capture mode. No need to activate a new capture");
      if (this.activePointerId === pointerId) {
        logger.error("PenDown detect with the same id without any pen up");
      }
    } else {
      logger.debug("InkPaper penDown", pointerId);
      this.activePointerId = pointerId;
      this.model.penDown(point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);
    }
    //Currently no recognition on pen down
  };

  InkPaper.prototype.penMove = function (point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug("InkPaper penMove", pointerId, point);
      this.model.penMove(point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);

    } else {
      logger.debug("PenMove detect from another pointerid {}", pointerId, "active id is", this.activePointerId);
    }
    //Currently no recogntion on pen move
  };

  InkPaper.prototype.penUp = function (point, pointerId) {

    //Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug("InkPaper penUp", pointerId);
      this.activePointerId = undefined;

      //Updtating model
      this.model.penUp(point);


      this.renderer.drawModel(this.renderingStructure, this.model, this.stroker);

      //Firing recognition only if recognizer is configure to do it
      if (scope.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        launchRecognition(this);
      }
    } else {
      logging.debug("PenUp detect from another pointerid {}", pointerId, "active id is", this.activePointerId);
    }
  };

  InkPaper.prototype.undo = function(){
    logger.debug("InkPaper undo ask");
  };

  InkPaper.prototype.redo = function(){
    logger.debug("InkPaper redo ask");
  };

  InkPaper.prototype.clear = function(){
    logger.debug("InkPaper clear ask");
  };



  function launchRecognition(inkPaper){

    var model = inkPaper.model;
    var stroker = inkPaper.stroker;
    var renderer = inkPaper.renderer;
    var renderingStructure = inkPaper.renderingStructure;
    var recognizer = inkPaper.recognizer;
    var domElement = inkPaper.domElement;
    var renderingStructure = inkPaper.renderingStructure;

    var recognitionCallback = function (recognizedModel) {
      logging.debug('recognition callback', recognizedModel);
      return recognizedModel
    };

    var sucessEventEmitter = function(recognizedModel) {
      logging.debug('emmiting succes event', recognizedModel);
      domElement.dispatchEvent(new CustomEvent('success', {detail: recognizedModel}));
      return recognizedModel;
    };

    var modelsFusion = function(recognizedModel){
        if(recognizedModel.currentRecognitionId > model.lastRecognitionRequestId) {
          model.recognizedComponents = recognizedModel.recognizedComponents;
          model.recognizedStrokes = model.recognizedStrokes.concat(scope.InkModel.extractNonRecognizedStrokes(recognizedModel));
          
          for(var strokeId = (model.lastRecognitionRequestId + 1); strokeId <= recognizedModel.currentRecognitionId; strokeId++ ){
            model.pendingStrokes[strokeId] = undefined;
          }
          
          model.lastRecognitionRequestId = recognizedModel.currentRecognitionId;
        }
      return recognizedModel;
    };

    var beautificationCallback = function (recognizedModel) {
      logging.debug('beautification callback');
      renderer.drawModel(renderingStructure, model, stroker);
    };
    //FIXME We should not give a reference but a copy of the model

    //Just memorize the current id to ease code reading in the sub functions
    model.currentRecognitionId = model.nextRecognitionRequestId;
    var modelCopy = JSON.parse(JSON.stringify(model));

    //Incrementation of the recogniton request id
    model.nextRecognitionRequestId++;

    recognizer.recognize(inkPaper.paperOptions, modelCopy)
    //FIXME Find the best way to handle Rest and Websocket recogntions
        .then(recognitionCallback)
        .then(modelsFusion)
        .then(sucessEventEmitter)
        .then(beautificationCallback)
        .catch(function (error) {
          // Handle any error from all above steps
          //TODO Manage a retry
          logging.info("Error while firing the recognition", error);
        });
    logger.debug("InkPaper penUp end");

  }

  InkPaper.prototype.askForRecognition = function () {
    if (scope.RecognitionSlot.ON_DEMAND in this.recognizer.getAvailaibleRecognitionSlots) {
      this.recognizer.doRecognition(this.paperOptions, this.model, function () {
        logging.debug('updateModel')
      });
    }
  }

  //TODO Manage a timed out recogntion
  function register(domElement, paperOptions) {
    if (!paperOptions) {
      paperOptions = scope.defaultOption;
    }
    var inkPaper = new InkPaper(domElement, paperOptions);
    return inkPaper;
  }

  // Export
  scope.InkPaper = InkPaper;
  scope.InkPaper.register = register;
})(MyScript, logging);
