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

function extractPoint(event, domElement, configuration, offsetTop = 0, offsetLeft = 0) {
  let eventRef = event;
  if (eventRef.changedTouches) {
    eventRef = eventRef.changedTouches[0];
  }
  const rect = domElement.getBoundingClientRect();
  return {
    x: roundFloat(eventRef.clientX - rect.left - domElement.clientLeft - offsetLeft, configuration.xyFloatPrecision),
    y: roundFloat(eventRef.clientY - rect.top - domElement.clientTop - offsetTop, configuration.xyFloatPrecision),
    t: roundFloat(Date.now(), configuration.timestampFloatPrecision)
  };
}

/**
 * Listen for the desired events
 * @param {Element} element DOM element to attach events listeners
 * @param {Editor} editor Editor to received down/move/up events
 * @param {Number} [offsetTop=0]
 * @param {Number} [offsetLeft=0]
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
export function attach(element, editor, offsetTop = 0, offsetLeft = 0) {
  function unFocus() {
    if (document.selection) {
      document.selection.empty();
    } else {
      window.getSelection().removeAllRanges();
    }
  }

  function pointerDownHandler(evt) { // Trigger a pointerDown
    if (this.activePointerId) {
      if (this.activePointerId === evt.pointerId) {
        logger.warn(`${evt.type} event with the same id without any pointer up`, evt.pointerId);
      }
    } else if ((evt.button !== 2) && (evt.buttons !== 2)) { // Ignore right click
      this.activePointerId = evt.pointerId;
      // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
      const pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
      unFocus();
      evt.stopPropagation();
      editor.pointerDown(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft), evt.pointerType, pointerId);
    }
  }

  function pointerMoveHandler(evt) { // Trigger a pointerMove
    // Only considering the active pointer
    if (this.activePointerId && this.activePointerId === evt.pointerId) {
      evt.stopPropagation();
      editor.pointerMove(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
    } else {
      logger.trace(`${evt.type} event from another pointerid (${evt.pointerId})`, this.activePointerId);
    }
  }

  function pointerUpHandler(evt) { // Trigger a pointerUp
    const prompterIds = ['prompter', 'prompter-text-container', 'prompter-text', 'paragraph-icon', 'ellipsis'];
    // Check if pointer entered into any prompter elements
    const pointerEnteredPrompter = evt.relatedTarget && prompterIds.includes(evt.relatedTarget.id);
    // Check if pointer didn't stay in the prompter and pointer exited the prompter
    const pointerExitedPrompter = evt.relatedTarget && evt.target && prompterIds.includes(evt.target.id);
    // Check if pointer moved between words in prompter
    const pointerMovedWords = evt.relatedTarget && evt.target && (evt.target.tagName === 'SPAN' || evt.relatedTarget.tagName === 'SPAN');
    if (pointerEnteredPrompter || pointerExitedPrompter || pointerMovedWords) {
      evt.stopPropagation();
    } else if (this.activePointerId && this.activePointerId === evt.pointerId) { // Only considering the active pointer
      this.activePointerId = undefined; // Managing the active pointer
      evt.stopPropagation();
      editor.pointerUp(extractPoint(evt, element, editor.configuration, offsetTop, offsetLeft));
    } else {
      logger.trace(`${evt.type} event from another pointerid (${evt.pointerId})`, this.activePointerId);
    }
  }

  const context = {
    options: editor.configuration.listenerOptions,
    listeners: [{
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
