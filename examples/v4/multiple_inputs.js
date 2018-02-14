/* eslint-disable no-underscore-dangle,no-unused-expressions,no-console,no-param-reassign,no-undef */
let waitingForIdle = false;
let pointerDownOnInput = false;
let pointerDownOnInputPoint;
let clearForIdle;
let oldInput;
let selectedInput;
let selectedEditor = 0;

// We use two editors to always have one editor ready for input
const editorElement = document.getElementById('editor');
const editorElement2 = document.getElementById('editor2');
let editorElementRef = editorElement;

const undoElement = document.getElementById('undo');
const redoElement = document.getElementById('redo');
const convertElement = document.getElementById('convert');
const mainElement = document.getElementById('mainContent');

const inputs = [];
const inputValues = new Map();

for (let i = 1; i < 5; i++) {
  inputs[i] = document.createElement('div');
  inputs[i].id = `input${i}`;
  inputs[i].setAttribute('touch-action', 'none');
  inputs[i].classList.add('input');
  inputValues.set(inputs[i].id, '');

  const label = document.createElement('label');
  label.setAttribute('for', inputs[i].id);
  label.innerText = `Input N°${i}`;

  mainElement.appendChild(label);
  mainElement.appendChild(inputs[i]);
}

/** The two following functions roundFloat and extractPoint are used to get a point coordinates */

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

function addChangedListeners(editors) {
  editors.forEach((editor) => {
    editor.addEventListener('changed', (event) => {
      undoElement.disabled = !event.detail.canUndo;
      redoElement.disabled = !event.detail.canRedo;
      convertElement.disabled = event.detail.isEmpty;
    });
  });
}

undoElement.addEventListener('click', () => {
  editorElementRef.editor.undo();
});
redoElement.addEventListener('click', () => {
  editorElementRef.editor.redo();
});
convertElement.addEventListener('click', () => {
  editorElementRef.editor.convert();
});


function addIdleListeners(editors) {
  editors.forEach((editor) => {
    editor.addEventListener('idle', () => {
      if (waitingForIdle) {
        if (editor.editor.exports) {
          inputValues.set(oldInput.id, editor.editor.exports['text/plain']);
        }
        const childModel = editor.querySelector('svg:nth-child(3)')
          .cloneNode(true);
        const childBackground = editor.querySelector('svg:nth-child(4)')
          .cloneNode(true);
        childModel.style.zIndex = '10';
        childBackground.style.zIndex = '10';
        while (oldInput.firstChild) {
          oldInput.removeChild(oldInput.firstChild);
        }
        oldInput.appendChild(childBackground);
        oldInput.appendChild(childModel);
        editor.style.display = 'none';
        editor.editor.clear();
        clearForIdle = true;
        waitingForIdle = false;
      }
    });
  });
}

function addInputsPointerDownListener(inputId) {
  const input = document.getElementById(inputId);
  input.addEventListener('pointerdown', (event) => {
    pointerDownOnInput = true;
    pointerDownOnInputPoint = extractPoint(event, input, editorElementRef.editor.configuration);
    if (selectedInput !== input) {
      if (editorElementRef) {
        if (selectedInput) {
          oldInput = selectedInput;
          editorElementRef.editor.convert();
          editorElementRef.editor.waitForIdle();
          waitingForIdle = true;
        }
      }
      clearForIdle = false;
      selectedEditor === 0 ? editorElementRef = editorElement : editorElementRef = editorElement2;
      selectedInput = input;
      editorElementRef.style.width = `${event.target.clientWidth}px`;
      editorElementRef.style.height = `${event.target.clientHeight}px`;
      editorElementRef.style.display = 'block';
      editorElementRef.style.position = 'absolute';
      editorElementRef.style.left = `${event.target.tagName === 'svg' ? event.target.parentElement.offsetLeft + 1 : event.target.offsetLeft + 1}px`;
      editorElementRef.style.top = `${event.target.tagName === 'svg' ? event.target.parentElement.offsetTop + 1 : event.target.offsetTop + 1}px`;
      editorElementRef.style.background = 'white';
      const inputValue = inputValues.get(selectedInput.id);
      if (inputValue) {
        editorElementRef.editor.import_(inputValue, 'text/plain');
      }
      editorElementRef.editor.resize();
      selectedEditor === 0 ? selectedEditor = 1 : selectedEditor = 0;
    }
  });
  input.addEventListener('pointermove', (event) => { // Trigger a pointerMove
    if (this.activePointerId && this.activePointerId === event.pointerId) {
      editorElementRef.editor.pointerMove(extractPoint(event, editorElementRef.editor.domElement, editorElementRef.editor.configuration));
    } else if (pointerDownOnInput) {
      const point = extractPoint(event, editorElementRef.editor.domElement, editorElementRef.editor.configuration);
      const diffX = Math.abs(pointerDownOnInputPoint.x - point.x);
      const diffY = Math.abs(pointerDownOnInputPoint.y - point.y);
      // mMaxDiffX = Math.max(diffX, mMaxDiffX);
      const cond1 = diffX < 1 && diffY > 1; // && mMaxDiffX < 15;
      const cond2 = diffX > 1 && diffY > 1; // && mMaxDiffX < 15;
      if (cond1 || cond2) {
        this.activePointerId = event.pointerId;
        // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
        const pointerId = event.pointerId > 2147483647 ? -1 : event.pointerId;
        editorElementRef.editor.pointerDown(pointerDownOnInputPoint, event.pointerType, pointerId);
      }
    }
  });
  input.addEventListener('pointerup', (event) => { // Trigger a pointerMove
    pointerDownOnInput = false;
    if (this.activePointerId && this.activePointerId === event.pointerId) { // Only considering the active pointer
      this.activePointerId = undefined; // Managing the active pointer
      event.stopPropagation();
      editorElementRef.editor.pointerUp(extractPoint(event, editorElementRef.editor.domElement, editorElementRef.editor.configuration));
    }
  });
}

// Custom grabber
function attach(element, editor) {
  // Used to unfocus any selection for better pointer events
  function unfocus() {
    if (window.getSelection().type !== 'None') {
      window.getSelection()
        .removeAllRanges();
    }
  }

  const context = {
    options: { passive: true },
    listeners: [{
      types: ['pointerdown'],
      listener:
        function pointerDownHandler(evt) { // Trigger a pointerDown
          const pointerDownOnEditor = evt.target.id === editor.domElement.id || evt.target.classList.contains('ms-canvas');
          if (this.activePointerId) {
            if (this.activePointerId === evt.pointerId) {
              console.log(`${evt.type} event with the same id without any pointer up`, evt.pointerId);
            }
          } else if ((evt.button !== 2) && (evt.buttons !== 2) && pointerDownOnEditor) { // Ignore right click
            this.activePointerId = evt.pointerId;
            // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
            const pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
            unfocus();
            evt.stopPropagation();
            editor.pointerDown(extractPoint(evt, element, editor.configuration), evt.pointerType, pointerId);
          }
        }
    }, {
      types: ['pointermove'],
      listener:
        function pointerMoveHandler(evt) { // Trigger a pointerMove
          // Only considering the active pointer
          if (this.activePointerId && this.activePointerId === evt.pointerId) {
            unfocus();
            editor.pointerMove(extractPoint(evt, element, editor.configuration));
          } else if (pointerDownOnInput) {
            const point = extractPoint(evt, element, editor.configuration);
            const diffX = Math.abs(pointerDownOnInputPoint.x - point.x);
            const diffY = Math.abs(pointerDownOnInputPoint.y - point.y);
            // mMaxDiffX = Math.max(diffX, mMaxDiffX);
            const cond1 = diffX < 1 && diffY > 1; // && mMaxDiffX < 15;
            const cond2 = diffX > 1 && diffY > 1; // && mMaxDiffX < 15;
            if (cond1 || cond2) {
              this.activePointerId = evt.pointerId;
              // Hack for iOS 9 Safari : pointerId has to be int so -1 if > max value
              unfocus();
              const pointerId = evt.pointerId > 2147483647 ? -1 : evt.pointerId;
              editor.pointerDown(pointerDownOnInputPoint, evt.pointerType, pointerId);
            }
          }
        }
    }, {
      types: ['pointerup'],
      listener:
        function pointerUpHandler(evt) { // Trigger a pointerUp
          pointerDownOnInput = false;
          if (this.activePointerId && this.activePointerId === evt.pointerId) { // Only considering the active pointer
            this.activePointerId = undefined; // Managing the active pointer
            evt.stopPropagation();
            editor.pointerUp(extractPoint(evt, element, editor.configuration));
          }
        }
    }]
  };

  context.listeners.forEach((item) => {
    item.types.forEach(type => element.addEventListener(type, item.listener, context.options));
  });
  return context;
}

function detach(element, context) {
  context.listeners.forEach((item) => {
    item.types.forEach(type => element.removeEventListener(type, item.listener, context.options));
  });
}

const customGrabber = {
  attach,
  detach
};

editorElement.addEventListener('loaded', () => {
  editorElement.style.display = 'none';
  editorElement2.style.display = 'none';
});

function initEditors(editors) {
  editors.forEach((editor) => {
    MyScript.register(editor, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
          hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad'
        },
        v4: {
          text: {
            guides: {
              enable: false
            },
            smartGuide: false,
            margin: {
              left: 10,
              right: 10,
              top: 5
            }
          }
        }
      }
    }, undefined, undefined, {
      grabber: customGrabber
    });
  });
}

initEditors([editorElement, editorElement2]);

Array.from(inputValues.keys()).forEach((inputId) => {
  addInputsPointerDownListener(inputId);
});

addIdleListeners([editorElement, editorElement2]);
addChangedListeners([editorElement, editorElement2]);

window.addEventListener('resize', () => {
  editorElement.editor.resize();
  editorElement2.editor.resize();
});
