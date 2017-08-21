/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
var editorElement = document.getElementById('editor');
var resultElement = document.getElementById('result');

/** ===============================================================================================
 * Grabber section
 * ============================================================================================= */

function attach(element, editor) {

  function extractPoint(event, domElement) {
    var rect = domElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - domElement.clientLeft,
      y: event.clientY - rect.top - domElement.clientTop,
      t: event.timeStamp
    };
  }

  const context = {
    options: { passive: true },
    listeners: [{
      types: ['mousedown'],
      listener:
        function penDownHandler(evt) { // Trigger a pointerDown
          if (!this.activePointerId) { // DO NOT consider the active pointer
            this.activePointerId = evt.timeStamp;
            editor.pointerDown(extractPoint(evt, element));
          }
        }
    }, {
      types: ['mousemove'],
      listener:
        function penMoveHandler(evt) { // Trigger a pointerMove
          if (this.activePointerId) { // Only considering the active pointer
            editor.pointerMove(extractPoint(evt, element));
          }
        }
    }, {
      types: ['mouseup', 'mouseout', 'mouseleave'],
      listener:
        function penUpHandler(evt) { // Trigger a pointerUp
          if (this.activePointerId) { // Only considering the active pointer
            this.activePointerId = undefined; // Managing the active pointer
            editor.pointerUp(extractPoint(evt, element));
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

var customGrabber = {
  attach: attach,
  detach: detach
};

/** ===============================================================================================
 * Stroker section
 * ============================================================================================= */

function drawStroke(context, stroke) {
  var length = stroke.x.length;
  var color = stroke.color ? stroke.color : context.strokeStyle;
  var width = stroke.width ? stroke.width : context.lineWidth;
  var nbpoints = length - 1;

  context.save();
  try {
    context.setLineDash([10, 15]);
    context.beginPath();
    if (length < 2) {
      context.arc(stroke.x[0], stroke.y[0], 1, 0, Math.PI * 2, true);
    } else {
      for (var i = 0; i < nbpoints; i++) {
        context.moveTo(stroke.x[i], stroke.y[i]);
        context.lineTo(stroke.x[i + 1], stroke.y[i + 1]);
      }
    }
    if (color !== undefined) {
      context.strokeStyle = color;
      context.lineWidth = width;
      context.stroke();
    }
  } finally {
    context.restore();
  }
}

var customStroker = {
  getInfo: function getInfo() {
    return {
      type: 'canvas',
      name: 'custom',
      apiVersion: 'V3'
    };
  },
  drawStroke: drawStroke
};

/** ===============================================================================================
 * Apply configuration
 * ============================================================================================= */

MyScript.register(editorElement, {
  renderingParams: {
    stroker: 'custom'
  },
}, undefined, undefined, {
  grabber: customGrabber,
  strokerList: [customStroker]
});

document.getElementById('undo').addEventListener('click', function () {
  editorElement.editor.undo();
});
document.getElementById('redo').addEventListener('click', function () {
  editorElement.editor.redo();
});
document.getElementById('clear').addEventListener('click', function () {
  editorElement.editor.clear();
});

window.addEventListener('resize', function () {
  editorElement.editor.resize();
});
