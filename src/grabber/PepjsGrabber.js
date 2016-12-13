import { grabberLogger as logger } from '../configuration/LoggerConfig';

/**
 * @typedef {Object} Grabber
 * @property {function(inkPaper: InkPaper, element: Element)} attachEvents
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
 * @param {InkPaper} inkPaper InkPaper to received down/move/up events
 * @param {Element} element DOM element to attach events listeners
 * @listens {Event} pointermove: a pointer moves, similar to touchmove or mousemove.
 * @listens {Event} pointerdown: a pointer is activated, or a device button held.
 * @listens {Event} pointerup: a pointer is deactivated, or a device button released.
 * @listens {Event} pointerover: a pointer has moved onto an element.
 * @listens {Event} pointerout: a pointer is no longer on an element it once was.
 * @listens {Event} pointerenter: a pointer enters the bounding box of an element.
 * @listens {Event} pointerleave: a pointer leaves the bounding box of an element.
 * @listens {Event} pointercancel: a pointer will no longer generate events.
 */
export function attachEvents(inkPaper, element) {
  logger.debug('attaching events');

  function extractPoint(event, domElement, options) {
    let eventRef = event;
    if (eventRef.changedTouches) {
      eventRef = eventRef.changedTouches[0];
    }
    const rect = domElement.getBoundingClientRect();
    return {
      x: roundFloat(eventRef.clientX - rect.left - domElement.clientLeft, options.recognitionParams.xyFloatPrecision),
      y: roundFloat(eventRef.clientY - rect.top - domElement.clientTop, options.recognitionParams.xyFloatPrecision),
      t: roundFloat(eventRef.timeStamp, options.recognitionParams.timestampFloatPrecision)
    };
  }

  // Disable contextmenu to prevent safari to fire pointerdown only once
  element.addEventListener('contextmenu', (evt) => {
    logger.debug('contextmenu event', evt.pointerId);
    stopPropagation(evt);
    return false;
  });

  element.addEventListener('pointermove', (evt) => {
    logger.debug('pointermove', evt.pointerId);
    evt.preventDefault();
    evt.stopPropagation();
    inkPaper.penMove(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);

  element.addEventListener('pointerdown', (evt) => {
    logger.debug('pointerdown', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penDown(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);


  element.addEventListener('pointerup', (evt) => {
    logger.debug('pointerup', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);

  element.addEventListener('pointerover', (evt) => {
    logger.debug('pointerover - ignored event currently', evt.pointerId);
    stopPropagation(evt);
    return false;
  }, false);

  element.addEventListener('pointerout', (evt) => {
    logger.debug('pointerout', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);


  element.addEventListener('pointerleave', (evt) => {
    logger.debug('pointerleave', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);

  element.addEventListener('pointercancel', (evt) => {
    logger.info('pointercancel', evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }, false);
}
