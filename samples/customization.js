/* global window, document, $, MyScript, JSONEditor, JSONFormatter */
var inkPaperElement = document.getElementById('inkPaper');
var resultElement = document.getElementById('result');

/** ===============================================================================================
 * Grabber section
 * ============================================================================================= */

function attachEvents(inkPaper, element) {

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

  events['mousedown'] = function penDownHandler(evt) { // Trigger a penDown
    console.debug(evt.type + 'event', evt);
    if (this.activePointerId) {
      console.debug('Already in capture mode. No need to activate a new capture');
    } else {
      this.activePointerId = evt.timeStamp;
      stopPropagation(evt);
      inkPaper.penDown(extractPoint(evt, element));
    }
    return false;
  };

  events['mousemove'] = function penMoveHandler(evt) { // Trigger a penMove
    console.debug(evt.type + 'event', evt);
    // Only considering the active pointer
    if (this.activePointerId) {
      stopPropagation(evt);
      inkPaper.penMove(extractPoint(evt, element));
    }
    return false;
  };

  ['mouseup', 'mouseout', 'mouseleave'].forEach(function (type) {
    events[type] = function penUpHandler(evt) { // Trigger a penUp
      console.debug(evt.type + 'event', evt);
      // Only considering the active pointer
      if (this.activePointerId) {
        this.activePointerId = undefined; // Managing the active pointer
        stopPropagation(evt);
        inkPaper.penUp(extractPoint(evt, element));
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
  drawStroke: drawStroke
};

/** ===============================================================================================
 * Apply configuration
 * ============================================================================================= */

var behaviors = {
  grabber: customGrabber,
  stroker: customStroker
};

MyScript.register(inkPaperElement, undefined, undefined, behaviors);

// inkPaperElement.addEventListener('change', function (e) {
//   var rawResult = e.detail.rawResult;
//   if (rawResult && rawResult.result) {
//     resultElement.innerHTML = '<span>' + rawResult.result.results[0].value + '</span>';
//   } else {
//     resultElement.innerHTML = '';
//   }
// });

document.getElementById('undo').addEventListener('pointerdown', function () {
  inkPaperElement['data-myscript-ink-paper'].undo();
});
document.getElementById('redo').addEventListener('pointerdown', function () {
  inkPaperElement['data-myscript-ink-paper'].redo();
});
document.getElementById('clear').addEventListener('pointerdown', function () {
  inkPaperElement['data-myscript-ink-paper'].clear();
});

window.addEventListener('resize', function () {
  inkPaperElement['data-myscript-ink-paper'].resize();
});
