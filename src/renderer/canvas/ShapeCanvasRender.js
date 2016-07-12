'use strict';

(function (scope, logging) {
  var logger = logging.getLogger('renderer');

  scope.CanvasRender.prototype.drawShapePrimitive = function(component){
    console.log("Shape rendering on");
    return;
    switch (component.type) {
      case 'inputCharacter':
        //FIXME This sound not rendere yet
        _drawCharacter(component, context, parameters);
        break;
      case 'ellipse':
        _drawShapeEllipse(primitive, context, parameters);
        break;
      case 'line':
        _drawShapeLine(primitive, context, parameters);
        break;
      default:
        if (component.hasOwnProperty('components')) {
          _drawComponents(component.components, context, parameters);
        } else {
          throw new Error('Component not implemented: ' + component.type);
        }
        break;
    }
  }

  function _drawShapes(components, shapes, context, parameters) {
    for (var i in shapes) {
      _drawShapeSegment(components, shapes[i], context, parameters);
    }
  }

  function _drawShapeSegment(components, segment, context, parameters) {
    var candidate = segment.candidates[segment.selectedCandidateIndex];
    switch (candidate.type) {
      case 'recognizedShape':
        return _drawShapeRecognized(candidate, context, parameters);
      case 'notRecognized':
        return _drawShapeNotRecognized(components, segment.inkRanges, context, parameters);
      default:
        throw new Error('Shape candidate not implemented: ' + candidate.type);
    }
  }

  function _drawShapeNotRecognized(components, inkRanges, context, parameters) {
    _drawComponents(_extractComponents(components, inkRanges), context, parameters);
  }

  function _drawShapeRecognized(shapeRecognized, context, parameters) {
    _drawComponents(shapeRecognized.primitives, context, parameters);
  }

  function _drawShapePrimitive(primitive, context, parameters) {
    switch (primitive.type) {

      default:
        throw new Error('Primitive not implemented: ' + primitive.type);
    }
  }

  function _drawShapeLine(shapeLine, context, parameters) {
    _drawLine(shapeLine.firstPoint, shapeLine.lastPoint, context, parameters);
    if (shapeLine.beginDecoration === 'ARROW_HEAD') {
      _drawArrowHead(shapeLine.firstPoint, shapeLine.beginTangentAngle, 12.0, context, parameters);
    }
    if (shapeLine.endDecoration === 'ARROW_HEAD') {
      _drawArrowHead(shapeLine.lastPoint, shapeLine.endTangentAngle, 12.0, context, parameters);
    }
  }

  function _drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

    var angleStep = 0.02; // angle delta between interpolated

    var z1 = Math.cos(orientation);
    var z3 = Math.sin(orientation);
    var z2 = z1;
    var z4 = z3;
    z1 *= maxRadius;
    z2 *= minRadius;
    z3 *= maxRadius;
    z4 *= minRadius;

    var n = Math.floor(Math.abs(sweepAngle) / angleStep);

    var boundariesPoints = [];

    context.save();
    try {
      context.fillStyle = parameters.color;
      context.strokeStyle = parameters.color;
      context.lineWidth = 0.5 * parameters.width;

      context.beginPath();

      for (var i = 0; i <= n; i++) {

        var angle = startAngle + (i / n) * sweepAngle; // points on the arc, in radian
        var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

        var cosAlpha = Math.cos(alpha);
        var sinAlpha = Math.sin(alpha);

        // current point
        var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
        var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        if (i === 0 || i === n) {
          boundariesPoints.push({x: x, y: y});
        }
      }

      context.stroke();

    } finally {
      context.restore();
    }

    return boundariesPoints;
  }

  //GOOD
  function _drawShapeEllipse(shapeEllipse, context, parameters) {
    var points = _drawEllipseArc(
        shapeEllipse.center,
        shapeEllipse.maxRadius,
        shapeEllipse.minRadius,
        shapeEllipse.orientation,
        shapeEllipse.startAngle,
        shapeEllipse.sweepAngle,
        context, parameters);

    if (shapeEllipse.beginDecoration && shapeEllipse.beginDecoration === 'ARROW_HEAD') {
      _drawArrowHead(points[0], shapeEllipse.beginTangentAngle, 12.0, context, parameters);
    }
    if (shapeEllipse.endDecoration && shapeEllipse.endDecoration === 'ARROW_HEAD') {
      _drawArrowHead(points[1], shapeEllipse.endTangentAngle, 12.0, context, parameters);
    }
  }

  function _drawArrowHead(headPoint, angle, length, context, parameters) {
    var alpha = _phi(angle + Math.PI - (Math.PI / 8)),
        beta = _phi(angle - Math.PI + (Math.PI / 8));

    context.save();
    try {
      context.fillStyle = parameters.color;
      context.strokeStyle = parameters.color;
      context.lineWidth = 0.5 * parameters.width;

      context.moveTo(headPoint.x, headPoint.y);
      context.beginPath();
      context.lineTo(headPoint.x + (length * Math.cos(alpha)), headPoint.y + (length * Math.sin(alpha)));
      context.lineTo(headPoint.x + (length * Math.cos(beta)), headPoint.y + (length * Math.sin(beta)));
      context.lineTo(headPoint.x, headPoint.y);
      context.fill();

    } finally {
      context.restore();
    }
  }

}(MyScript, logging))

