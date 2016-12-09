import { grabberLogger as logger } from '../configuration/LoggerConfig';

/**
 * @typedef {Object} Grabber
 * @property {function(inkPaper: InkPaper, element: Element)} attachGrabberEvents
 */

function stopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}

const floatPrecisionArray = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
function roundFloat(oneFloat, requestedFloatPrecision) {
  if (requestedFloatPrecision || requestedFloatPrecision === 0) {
    let floatPrecision;
    if (requestedFloatPrecision > 10) {
      floatPrecision = floatPrecisionArray[10];
    } else {
      floatPrecision = floatPrecisionArray[requestedFloatPrecision];
    }
    return Math.round(oneFloat * floatPrecision) / floatPrecision;
  }
  return oneFloat;
}

/**
 * Listen for the desired events
 * @param inkPaper
 * @param domElement
 * @listens pointermove: a pointer moves, similar to touchmove or mousemove.
 * @listens pointerdown: a pointer is activated, or a device button held.
 * @listens pointerup: a pointer is deactivated, or a device button released.
 * @listens pointerover: a pointer has moved onto an element.
 * @listens pointerout: a pointer is no longer on an element it once was.
 * @listens pointerenter: a pointer enters the bounding box of an element.
 * @listens pointerleave: a pointer leaves the bounding box of an element.
 * @listens pointercancel: a pointer will no longer generate events.
 */
export function attachGrabberEvents(inkPaper, domElement) {
  const inkPaperRef = inkPaper;
  const domElementRef = domElement;
  logger.debug('attaching events');

  function extractPoint(eventParam, theDomElement, paperOptionsParam) {
    let event = eventParam;
    if (event.changedTouches) event = event.changedTouches[0];
    const rect = theDomElement.getBoundingClientRect();
    return {
      x: roundFloat(event.clientX - rect.left - theDomElement.clientLeft, paperOptionsParam.recognitionParams.xyFloatPrecision),
      y: roundFloat(event.clientY - rect.top - theDomElement.clientTop, paperOptionsParam.recognitionParams.xyFloatPrecision),
      t: roundFloat(event.timeStamp, paperOptionsParam.recognitionParams.timestampFloatPrecision)
    };
  }

  // Disable contextmenu to prevent safari to fire pointerdown only once
  domElementRef.addEventListener('contextmenu', (evt) => {
    logger.debug('contextmenu event', evt.pointerId);
    stopPropagation(evt);
    return false;
  });

  domElementRef.addEventListener('pointermove', (evt) => {
    logger.debug('pointermove', evt.pointerId);
    evt.preventDefault();
    evt.stopPropagation();
    inkPaperRef.penMove(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);

  domElementRef.addEventListener('pointerdown', (evt) => {
    logger.debug('pointerdown', evt.pointerId);
    stopPropagation(evt);
    inkPaperRef.penDown(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);


  domElementRef.addEventListener('pointerup', (evt) => {
    logger.debug('pointerup', evt.pointerId);
    stopPropagation(evt);
    inkPaperRef.penUp(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);

  domElementRef.addEventListener('pointerover', (evt) => {
    logger.debug('pointerover - ignored event currently', evt.pointerId);
    stopPropagation(evt);
    return false;
  }, false);

  domElementRef.addEventListener('pointerout', (evt) => {
    logger.debug('pointerout', evt.pointerId);
    stopPropagation(evt);
    inkPaperRef.penUp(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);


  domElementRef.addEventListener('pointerleave', (evt) => {
    logger.debug('pointerleave', evt.pointerId);
    stopPropagation(evt);
    inkPaperRef.penUp(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);

  domElementRef.addEventListener('pointercancel', (evt) => {
    logger.info('pointercancel', evt.pointerId);
    stopPropagation(evt);
    inkPaperRef.penUp(extractPoint(evt, domElementRef, inkPaperRef.paperOptions), evt.pointerId);
    return false;
  }, false);
}
