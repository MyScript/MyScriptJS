'use strict';

(function (scope) {


  function QuadraticCanvasStroker() {
    this.type = "QuadraticCanvasStroker";
  }

  /*******************************************************************************************************************
   * Algorithm methods to compute rendering
   ******************************************************************************************************************/

  function _computeLinksPoints(point, angle, width) {
    var radius = point.p * width;
    return [{
      x: (point.x - Math.sin(angle) * radius),
      y: (point.y + Math.cos(angle) * radius)
    }, {
      x: (point.x + Math.sin(angle) * radius),
      y: (point.y - Math.cos(angle) * radius)
    }
    ];
  }

  function _computeMiddlePoint(point1, point2) {
    return {
      x: ((point2.x + point1.x) / 2),
      y: ((point2.y + point1.y) / 2),
      p: ((point2.p + point1.p) / 2)
    };
  }

  function _computeAxeAngle(begin, end) {
    return Math.atan2(end.y - begin.y, end.x - begin.x);
  }

  function _fill(context, color) {
    if (color !== undefined) {
      context.fillStyle = color;
      context.fill();
    }
  }

  /**
   *
   * @param stroke
   * @param context
   * @param parameters
   * @private
   */
  QuadraticCanvasStroker.prototype.renderStroke = function (canvasContext, stroke) {
    var StrokeComponent = scope.StrokeComponent;
    canvasContext.beginPath();
    var length = scope.StrokeComponent.getLength(stroke);
    //FIXME this should be a parameter
    var width = stroke.width && stroke.width > 0 ? stroke.width : 3 ;
    var color = stroke.color ? stroke.color : 'black';
    var firstPoint = scope.StrokeComponent.getPointByIndex(stroke, 0);
    if (length < 3) {
      canvasContext.arc(firstPoint.x, firstPoint.y, width * 0.6, 0, Math.PI * 2, true);
    } else {
      canvasContext.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
      _renderLine(canvasContext, firstPoint, _computeMiddlePoint(firstPoint, StrokeComponent.getPointByIndex(stroke, 1)), width);

      // Possibility to try this (the start looks better when the ink is large)
      //var first = _computeMiddlePoint(stroke[0], stroke[1]);
      //context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

      var nbquadratics = length - 2;
      for (var i = 0; i < nbquadratics; i++) {
        _renderQuadratic(canvasContext, _computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i), StrokeComponent.getPointByIndex(stroke, i + 1)), _computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, i + 1), StrokeComponent.getPointByIndex(stroke, i + 2)), StrokeComponent.getPointByIndex(stroke, i + 1), width);
      }
      _renderLine(canvasContext, _computeMiddlePoint(StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1)), StrokeComponent.getPointByIndex(stroke, length - 1), width);
      _renderFinal(canvasContext, StrokeComponent.getPointByIndex(stroke, length - 2), StrokeComponent.getPointByIndex(stroke, length - 1), width);
    }
    canvasContext.closePath();
    _fill(canvasContext, color);
  }

  function _renderFinal(canvasContext, begin, end, width) {
    var ARCSPLIT = 6;
    var angle = _computeAxeAngle(begin, end);
    var linkPoints = _computeLinksPoints(end, angle, width);
    canvasContext.moveTo(linkPoints[0].x, linkPoints[0].y);
    for (var i = 1; i <= ARCSPLIT; i++) {
      var newAngle = angle - i * Math.PI / ARCSPLIT;
      canvasContext.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
    }
  }

  function _renderLine(canvasContext, begin, end, width) {
    var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, end), width);
    var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(begin, end), width);

    canvasContext.moveTo(linkPoints1[0].x, linkPoints1[0].y);
    canvasContext.lineTo(linkPoints2[0].x, linkPoints2[0].y);
    canvasContext.lineTo(linkPoints2[1].x, linkPoints2[1].y);
    canvasContext.lineTo(linkPoints1[1].x, linkPoints1[1].y);
  }

  function _renderQuadratic(canvasContext, begin, end, ctrl, width) {
    var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, ctrl), width);
    var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(ctrl, end), width);
    var linkPoints3 = _computeLinksPoints(ctrl, _computeAxeAngle(begin, end), width);

    canvasContext.moveTo(linkPoints1[0].x, linkPoints1[0].y);
    canvasContext.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
    canvasContext.lineTo(linkPoints2[1].x, linkPoints2[1].y);
    canvasContext.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
  }

  // Export
  scope.QuadraticCanvasStroker = QuadraticCanvasStroker;
})(MyScript);
