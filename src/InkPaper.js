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
    console.log(this.renderer);
    this.renderingStructure = this.renderer.populateRenderDomElement(domElement);
    this.recognizer = getSelectedRecognizer();
    this.stroker = new scope.QuadraticCanvasStroker();
    this.grabber.attachEvents(this, domElement, this.model, null, null);

    //Managing the active pointer
    this.activePointerId = undefined;
  }


  function getSelectedRecognizer(type) {
    // TODO Use a recognizer factory and paramas
    return Object.create(scope.Cdkv3RestTextRecognizer.prototype);
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
  }

  InkPaper.prototype.penMove = function (point, pointerId) {
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug("InkPaper penMove", pointerId, point);
      this.model.penMove(point);
      this.renderer.drawCurrentStroke(this.renderingStructure, this.model, this.stroker);

    } else {
      logger.debug("PenMove detect from another pointerid {}", pointerId, "active id is", this.activePointerId);
    }
    //Currently no recogntion on pen move
  }

  InkPaper.prototype.penUp = function (point, pointerId) {

    //Only considering the active pointer
    if (this.activePointerId && this.activePointerId === pointerId) {
      logger.debug("InkPaper penUp", pointerId);
      this.activePointerId = undefined;

      //Updtating model
      this.model.penUp(point);


      this.renderer.drawPendingStrokes(this.renderingStructure, this.model, this.stroker);

      //Firing recognition only if recognizer is configure to do it
      if (scope.RecognitionSlot.ON_PEN_UP in this.recognizer.getAvailableRecognitionSlots()) {
        var domElementToDispatch = this.domElement;

        var recognitionCallback = function (recognizedModel) {
          logging.debug('recognition callback', recognizedModel)
          domElementToDispatch.dispatchEvent(new CustomEvent('success', {detail: recognizedModel}));
        };
        var beautificationCallback = function () {
          logging.debug('beautification callback')
        };
        //FIXME We should not give a reference but a copy of the model

        this.recognizer.recognize(this.paperOptions, this.model)
            .then(recognitionCallback)
            //TODO Merge current model and recognize one
            .catch(function (error) {
              // Handle any error from all above steps
              //TODO Manage a retry
              logging.info("Error while firing the recognition", error);
            })
            .done();
      }
    } else {
      logging.debug("PenUp detect from another pointerid {}", pointerId, "active id is", this.activePointerId);
    }
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
