import { grabberLogger as logger } from '../configuration/LoggerConfig';

/**
 * Grab pointerDown, pointerMove and pointerUp events
 * @typedef {Object} Grabber
 * @property {function(editor: Editor, element: Element): GrabberContext} attachEvents Attach events and decide when to call editor pointerDown/Move/Up methods
 */

/**
 * Grabber context
 * @typedef {Object} GrabberContext
 * @property {function(event: Event)} upEvent Handling function for 'upEvent' event listener
 * @property {function(event: Event)} downEvent Handling function for 'downEvent' event listener
 * @property {function(event: Event)} moveEvent Handling function for 'moveEvent' event listener
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

function extractPoint(event, domElement, configuration) {
  let eventRef = event;
  if (eventRef.changedTouches) {
    eventRef = eventRef.changedTouches[0];
  }
  const rect = domElement.getBoundingClientRect();
  return {
    x: roundFloat(eventRef.clientX - rect.left - domElement.clientLeft, configuration.xyFloatPrecision),
    y: roundFloat(eventRef.clientY - rect.top - domElement.clientTop, configuration.xyFloatPrecision),
    t: roundFloat(Date.now(), configuration.timestampFloatPrecision)
  };
}

/**
 * Listen for the desired events
 * @param {Editor} editor Editor to received down/move/up events
 * @param {Element} element DOM element to attach events listeners
 * @return {GrabberContext} Grabber context
 * @listens {Event} pointermove: a pointer moves, similar to touchmove or mousemove.
 * @listens {Event} pointerdown: a pointer is activated, or a device button held.
 * @listens {Event} pointerup: a pointer is deactivated, or a device button released.
 * @listens {Event} pointerover: a pointer has moved onto an element.
 * @listens {Event} pointerout: a pointer is no longer on an element it once was.
 * @listens {Event} pointerenter: a pointer enters the bounding box of an element.
 * @listens {Event} pointerleave: a pointer leaves the bounding box of an element.
 * @listens {Event} pointercancel: a pointer will no longer generate events.
 */
export function attachEvents(editor, element) {
  function ignoreHandler(evt) {
    logger.trace(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    return false;
  }

  function pointerDownHandler(evt) { // Trigger a pointerDown
    logger.trace(`${evt.type} event`, evt.pointerId);
    if (this.activePointerId) {
      logger.debug('Already in capture mode. No need to activate a new capture');
      if (this.activePointerId === evt.pointerId) {
        logger.error('PointerDown detect with the same id without any pointer up');
      }
    } else {
      this.activePointerId = evt.pointerId;
      stopPropagation(evt);
      editor.pointerDown(extractPoint(evt, element, editor.configuration), evt.pointerType);
    }
    return false;
  }

  function pointerMoveHandler(evt) { // Trigger a pointerMove
    logger.trace(`${evt.type} event`, evt.pointerId);
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === evt.pointerId) {
      stopPropagation(evt);
      editor.pointerMove(extractPoint(evt, element, editor.configuration));
    } else {
      logger.info(`PointerMove detect from another pointerid (${evt.pointerId}), active id is ${this.activePointerId}`);
    }
    return false;
  }

  function pointerUpHandler(evt) { // Trigger a pointerUp
    logger.trace(`${evt.type} event`, evt.pointerId);
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === evt.pointerId) {
      this.activePointerId = undefined; // Managing the active pointer
      stopPropagation(evt);
      editor.pointerUp(extractPoint(evt, element, editor.configuration));
    } else {
      logger.info(`PointerUp detect from another pointerid (${evt.pointerId}), active id is ${this.activePointerId}`);
    }
    return false;
  }

  const events = {};
  // Disable contextmenu to prevent safari to fire pointerdown only once, and ignore pointerover
  ['contextmenu', 'pointerover'].forEach((type) => {
    events[type] = ignoreHandler;
  });
  ['pointerdown'].forEach((type) => {
    events[type] = pointerDownHandler;
  });
  ['pointermove'].forEach((type) => {
    events[type] = pointerMoveHandler;
  });
  ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'].forEach((type) => {
    events[type] = pointerUpHandler;
  });
  logger.debug('attaching events', events);

  Object.keys(events).forEach(type => element.addEventListener(type, events[type], false));

  return events;
}
