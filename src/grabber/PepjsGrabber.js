import { grabberLogger as logger } from '../configuration/LoggerConfig';

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

function stopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}

export function attachGrabberEvents(inkPaperParam, domElementParam) {
  const inkPaper = inkPaperParam;
  const domElement = domElementParam;
  logger.debug('attaching events');

  function extractPoint(eventParam, theDomElement) {
    let event = eventParam;
    if (event.changedTouches) event = event.changedTouches[0];
    const rect = theDomElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - theDomElement.clientLeft,
      y: event.clientY - rect.top - theDomElement.clientTop,
      t: event.timeStamp
    };
  }

  // Disable contextmenu to prevent safari to fire pointerdown only once
  domElement.addEventListener('contextmenu', (evt) => {
    logger.debug('contextmenu event', evt.pointerId);
    stopPropagation(evt);
    return false;
  });

  domElement.addEventListener('pointermove', (evt) => {
    logger.debug('pointermove', evt.pointerId);
    evt.preventDefault();
    evt.stopPropagation();
    inkPaper.penMove(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);

  domElement.addEventListener('pointerdown', (evt) => {
    logger.debug('pointerdown', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penDown(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);


  domElement.addEventListener('pointerup', (evt) => {
    logger.debug('pointerup', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);

  domElement.addEventListener('pointerover', (evt) => {
    logger.debug('pointerover - ignored event currently', evt.pointerId);
    stopPropagation(evt);
    return false;
  }, false);

  domElement.addEventListener('pointerout', (evt) => {
    logger.debug('pointerout', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);


  domElement.addEventListener('pointerleave', (evt) => {
    logger.debug('pointerleave', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);

  domElement.addEventListener('pointercancel', (evt) => {
    logger.info('pointercancel', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, domElement), evt.pointerId);
    return false;
  }, false);
}
