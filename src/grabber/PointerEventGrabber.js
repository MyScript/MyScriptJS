import { grabberLogger as logger } from '../configuration/LoggerConfig';

/**
 * Grab pointerDown, pointerMove and pointerUp events
 * @typedef {Object} Grabber
 * @property {function(element: Element, editor: Editor): GrabberContext} attach Attach events and decide when to call editor pointerDown/Move/Up methods
 * @property {function(element: Element, context: GrabberContext)} detach Detach the grabber
 */

/**
 * Grabber listener
 * @typedef {Object} GrabberListener
 * @property {Array<String>} types Event types to listen
 * @property {function(event: Event)} listener Event listener for these events
 */

/**
 * Grabber context
 * @typedef {Object} GrabberContext
 * @property {Boolean|Object} options Options object that specifies characteristics about the event listener. (@see addEventListener.options for detail)
 * @property {Array<GrabberListener>} listeners Registered listeners
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
 * @param {Element} element DOM element to attach events listeners
 * @param {Editor} editor Editor to received down/move/up events
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
export function attach(element, editor) {
  function ignoreHandler(evt) {
    logger.trace(`${evt.type} event`, evt.pointerId);
    stopPropagation(evt);
    return false;
  }

  function pointerDownHandler(evt) { // Trigger a pointerDown
    if (this.activePointerId) {
      if (this.activePointerId === evt.pointerId) {
        logger.warn(`${evt.type} event with the same id without any pointer up`, evt.pointerId);
      }
    } else {
      this.activePointerId = evt.pointerId;
      stopPropagation(evt);
      editor.pointerDown(extractPoint(evt, element, editor.configuration), evt.pointerType, evt.pointerId);
    }
    return false;
  }

  function pointerMoveHandler(evt) { // Trigger a pointerMove
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === evt.pointerId) {
      stopPropagation(evt);
      editor.pointerMove(extractPoint(evt, element, editor.configuration));
    } else {
      logger.trace(`${evt.type} event from another pointerid (${evt.pointerId})`, this.activePointerId);
    }
    return false;
  }

  function pointerUpHandler(evt) { // Trigger a pointerUp
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === evt.pointerId) {
      this.activePointerId = undefined; // Managing the active pointer
      stopPropagation(evt);
      editor.pointerUp(extractPoint(evt, element, editor.configuration));
    } else {
      logger.trace(`${evt.type} event from another pointerid (${evt.pointerId})`, this.activePointerId);
    }
    return false;
  }

  const context = {
    options: editor.configuration.capture,
    listeners: [{
      types: ['contextmenu', 'pointerover'],
      listener: ignoreHandler
    }, {
      types: ['pointerdown'],
      listener: pointerDownHandler
    }, {
      types: ['pointermove'],
      listener: pointerMoveHandler
    }, {
      types: ['pointerup', 'pointerout', 'pointerleave', 'pointercancel'],
      listener: pointerUpHandler
    }]
  };

  logger.debug('attaching listeners', context);
  context.listeners.forEach((item) => {
    item.types.forEach(type => element.addEventListener(type, item.listener, context.options));
  });
  return context;
}

export function detach(element, context) {
  logger.debug('detaching listeners', context);
  context.listeners.forEach((item) => {
    item.types.forEach(type => element.removeEventListener(type, item.listener, context.options));
  });
}
