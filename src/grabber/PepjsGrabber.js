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

  function ignoreHandler(evt) {
    logger.debug(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    return false;
  }

  function penDownHandler(evt) {
    logger.debug(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    inkPaper.penDown(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }

  function penMoveHandler(evt) {
    logger.debug(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    inkPaper.penMove(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }

  function penUpHandler(evt) {
    logger.debug(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    inkPaper.penUp(extractPoint(evt, element, inkPaper.options), evt.pointerId);
    return false;
  }

  // Ignore these events and stop propagation
  const disabledEvents = ['contextmenu', 'pointerover']; // Disable contextmenu to prevent safari to fire pointerdown only once, and ignore pointerover
  disabledEvents.forEach(type => element.addEventListener(type, ignoreHandler, false));

  // Trigger a penDown
  const downEvents = ['pointerdown'];
  downEvents.forEach(type => element.addEventListener(type, penDownHandler, false));

  // Trigger a penMove
  const moveEvents = ['pointermove'];
  moveEvents.forEach(type => element.addEventListener(type, penMoveHandler, false));

// Trigger a penUp
  const upEvents = ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'];
  upEvents.forEach(type => element.addEventListener(type, penUpHandler, false));
}
