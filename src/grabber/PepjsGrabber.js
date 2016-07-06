'use strict';

(function(scope, logging) {
  var logger = logging.getLogger('grabber');

  function PepjsGrabber() {
    this.type = "PepjsGrabber";
  }

  /**
   * Listen for the desired events
   *
   * pointermove: a pointer moves, similar to touchmove or mousemove.
   * pointerdown: a pointer is activated, or a device button held.
   * pointerup: a pointer is deactivated, or a device button released.
   * pointerover: a pointer has moved onto an element.
   * pointerout: a pointer is no longer on an element it once was.
   * pointerenter: a pointer enters the bounding box of an element.
   * pointerleave: a pointer leaves the bounding box of an element.
   * pointercancel: a pointer will no longer generate events.
   */

  PepjsGrabber.prototype.attachEvents = function (inkPaperParam, domElementParam) {
    var inkPaper = inkPaperParam;
    var domElement = domElementParam;
    logger.debug('attaching events');

    function extractPoint(event, domElement) {
      if (event.changedTouches) event = event.changedTouches[0];
      var rect = domElement.getBoundingClientRect();
      return {
        x: event.clientX - rect.left - domElement.clientLeft,
        y: event.clientY - rect.top - domElement.clientTop,
        t: event.timeStamp
      };
    }

    //Desactivation of contextmenu to prevent safari to fire pointerdown only once
    domElement.addEventListener("contextmenu", function(evt) {
      logger.debug("contextmenu event", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    });

    domElement.addEventListener('pointermove', function (evt) {
      logger.debug("pointermove", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      inkPaper.penMove(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);

    domElement.addEventListener("pointerdown", function(evt) {
      logger.debug("pointerdown", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      inkPaper.penDown(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);



    domElement.addEventListener('pointerup', function (evt) {
      logger.debug("pointerup", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      //TODO Build the stroke with all the dots collected
      inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);

    domElement.addEventListener('pointerover', function (evt) {
      logger.debug("pointerover - ignored event currently", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }, false);

    domElement.addEventListener('pointerout', function (evt) {
      logger.debug("pointerout", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);


    domElement.addEventListener('pointerleave', function (evt) {
      logger.debug("pointerleave", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);

    domElement.addEventListener('pointercancel', function (evt) {
      logger.info("pointercancel", evt.pointerId);
      evt.preventDefault();
      evt.stopPropagation();
      inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
      return false;
    }, false);
  }



  // Export
  scope.PepjsGrabber = PepjsGrabber;
})(MyScript, logging);
