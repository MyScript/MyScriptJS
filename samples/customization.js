/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
var editorElement = document.getElementById('editor');
var resultElement = document.getElementById('result');

/** ===============================================================================================
 * Grabber section
 * ============================================================================================= */

function attachEvents(editor, element) {

  function stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function extractPoint(event, domElement) {
    var rect = domElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left - domElement.clientLeft,
      y: event.clientY - rect.top - domElement.clientTop,
      t: event.timeStamp
    };
  }

  var events = {};
  events['mouseover'] = function ignoreHandler(evt) {
    console.debug(evt.type + 'event', evt);
    stopPropagation(evt);
    return false;
  };

  events['mousedown'] = function penDownHandler(evt) { // Trigger a pointerDown
    console.debug(evt.type + 'event', evt);
    if (this.activePointerId) {
      console.debug('Already in capture mode. No need to activate a new capture');
    } else {
      this.activePointerId = evt.timeStamp;
      stopPropagation(evt);
      editor.pointerDown(extractPoint(evt, element));
    }
    return false;
  };

  events['mousemove'] = function penMoveHandler(evt) { // Trigger a pointerMove
    console.debug(evt.type + 'event', evt);
    // Only considering the active pointer
    if (this.activePointerId) {
      stopPropagation(evt);
      editor.pointerMove(extractPoint(evt, element));
    }
    return false;
  };

  ['mouseup', 'mouseout', 'mouseleave'].forEach(function (type) {
    events[type] = function penUpHandler(evt) { // Trigger a pointerUp
      console.debug(evt.type + 'event', evt);
      // Only considering the active pointer
      if (this.activePointerId) {
        this.activePointerId = undefined; // Managing the active pointer
        stopPropagation(evt);
        editor.pointerUp(extractPoint(evt, element));
      }
      return false;
    };
  });

  Object.keys(events).forEach(function(type) { element.addEventListener(type, events[type], false)});
  return events;
}

var customGrabber = {
  attachEvents: attachEvents
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

document.getElementById('undo').addEventListener('pointerdown', function () {
  editorElement['data-myscript-editor'].undo();
});
document.getElementById('redo').addEventListener('pointerdown', function () {
  editorElement['data-myscript-editor'].redo();
});
document.getElementById('clear').addEventListener('pointerdown', function () {
  editorElement['data-myscript-editor'].clear();
});

window.addEventListener('resize', function () {
  editorElement['data-myscript-editor'].resize();
});
