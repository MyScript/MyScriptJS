'use strict';

(function (scope) {
    /**
     * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function AbstractRenderer(context) {
        this.penParameters = new scope.PenParameters();
        this.showBoundingBoxes = false;
        this.context = context;
        this.points = [];
        this.drawing = false;
    }

    /**
     * Get the context
     *
     * @returns {Object}
     */
    AbstractRenderer.prototype.getContext = function () {
        return this.context;
    };

    /**
     * Set the context (legacy code for non-regression)
     *
     * @private
     * @returns {Object}
     */
    AbstractRenderer.prototype._setContext = function (context) {
        this.context = context;
    };

    /**
     * This property is use to show or not show the bounding box
     *
     * @method getShowBoundingBoxes
     * @returns {Boolean}
     */
    AbstractRenderer.prototype.getShowBoundingBoxes = function () {
        return this.showBoundingBoxes;
    };

    /**
     * Set the show state of bounding box
     *
     * @method setShowBoundingBoxes
     * @param {Boolean} showBoundingBoxes
     */
    AbstractRenderer.prototype.setShowBoundingBoxes = function (showBoundingBoxes) {
        this.showBoundingBoxes = showBoundingBoxes;
    };

    /**
     * Get the default pen parameters
     *
     * @returns {PenParameters}
     */
    AbstractRenderer.prototype.getParameters = function () {
        return this.penParameters;
    };

    /**
     * Set the default pen parameters
     *
     * @param {PenParameters} penParameters
     */
    AbstractRenderer.prototype.setParameters = function (penParameters) {
        this.penParameters = penParameters;
    };

    /**
     * Clear the recognition context
     *
     * @method clear
     */
    AbstractRenderer.prototype.clear = function () {
        this.getContext().clearRect(0, 0, this.getContext().canvas.width, this.getContext().canvas.height);
    };

    /**
     * Draw recognition result on HTML5 canvas.
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {Object} recognitionResult
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawComponents = function (components, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw component
     *
     * @method drawComponent
     * @param {AbstractComponent} component
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawComponent = function (component, context, parameters) {
        if (component instanceof scope.Stroke) {
            this.drawStroke(component, context, parameters);
        } else if (component instanceof scope.CharacterInputComponent) {
            this.drawCharacter(component, context, parameters);
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {Rectangle} rectangle
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawRectangle = function (rectangle, context, parameters) {
        if (context) {
            this._setContext(context);
        }
        if (parameters) {
            this.setParameters(parameters);
        }

        var params = this.getParameters();
        this.getContext().save();
        try {
            this.getContext().fillStyle = params.getRectColor();
            this.getContext().strokeStyle = params.getColor();
            this.getContext().globalAlpha = params.getAlpha();
            this.getContext().lineWidth = 0.5 * params.getWidth();
            this.getContext().fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
        } finally {
            this.getContext().restore();
        }
    };

    /**
     * Draw character component
     *
     * @private
     * @method drawCharacter
     * @param {CharacterInputComponent} character
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawCharacter = function (character, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw stroke component
     *
     * @private
     * @method drawStroke
     * @param {Stroke} stroke
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawStroke = function (stroke, context, parameters) {
        if (context) {
            this._setContext(context);
        }
        if (parameters) {
            this.setParameters(parameters);
        }
        _render(this.getContext(), stroke);
    };

    /**
     * Draw stroke components
     *
     * @private
     * @method drawStrokes
     * @param {Stroke[]} strokes
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawStrokes = function (strokes, context, parameters) {
        for(var i = 0; i < strokes.length;i++){
            this.drawStroke(strokes[i], context, parameters);
        }
    };

    /*******************************************************************************************************************
     * Algorithm methods to compute rendering
     ******************************************************************************************************************/

    function _computeLinksPoints(point, angle, width) {
        var radius = point.p * width;
        return [{
            x : (point.x - Math.sin(angle) * radius),
            y : (point.y + Math.cos(angle) * radius)
        }, {
            x : (point.x + Math.sin(angle) * radius),
            y : (point.y - Math.cos(angle) * radius)
        }
        ];
    }

    function _computeMiddlePoint(point1, point2) {
        return {
            x : ((point2.x + point1.x) / 2),
            y : ((point2.y + point1.y) / 2),
            p : ((point2.p + point1.p) / 2)
        };
    }

    function _computeAxeAngle(begin, end) {
        return Math.atan2(end.y - begin.y, end.x - begin.x);
    }

    function _fill(context, color, alpha) {
        if (color !== undefined) {
            context.globalAlpha = alpha;
            context.fillStyle = color;
            context.fill();
        }
    }

    function _render(context, stroke) {
        if (stroke !== undefined && stroke.getLength() > 0) {
            if (stroke.getColor()) {
                _renderStroke(context, stroke);
            }
        }
    }

    function _renderStroke(context, stroke) {
        context.beginPath();
        var length = stroke.getLength();
        var width = stroke.getWidth();
        var firstPoint = stroke.getPointByIndex(0);
        if (length < 3){
            context.arc(firstPoint.x, firstPoint.y, width * 0.2, 0, Math.PI * 2, true);
        }else {
            context.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
            _renderLine(context, firstPoint, _computeMiddlePoint(firstPoint, stroke.getPointByIndex(1)), width);

            // Possibility to try this (the start looks better when the ink is large)
            //var first = _computeMiddlePoint(stroke[0], stroke[1]);
            //context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

            var nbquadratics = length - 2;
            for (var i = 0; i < nbquadratics; i++){
                _renderQuadratic(context, _computeMiddlePoint(stroke.getPointByIndex(i), stroke.getPointByIndex(i + 1)), _computeMiddlePoint(stroke.getPointByIndex(i + 1), stroke.getPointByIndex(i + 2)), stroke.getPointByIndex(i + 1), width);
            }
            _renderLine(context, _computeMiddlePoint(stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1)), stroke.getPointByIndex(length - 1), width);
            _renderFinal(context, stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1), width);
        }
        context.closePath();
        _fill(context, stroke.getColor(), stroke.getAlpha());
    }

    function _renderFinal(context, begin, end, width) {
        var ARCSPLIT = 6;
        var angle = _computeAxeAngle(begin, end);
        var linkPoints = _computeLinksPoints(end, angle, width);
        context.moveTo(linkPoints[0].x, linkPoints[0].y);
        for (var i = 1; i <= ARCSPLIT; i++) {
            var newAngle = angle - i * Math.PI / ARCSPLIT;
            context.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
        }
    }

    function _renderLine(context, begin, end, width) {
        var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, end), width);
        var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
    }

    function _renderQuadratic(context, begin, end, ctrl, width) {
        var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, ctrl), width);
        var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(ctrl, end), width);
        var linkPoints3 = _computeLinksPoints(ctrl, _computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
    }

    /**
     * DEPRECATED METHODS
     */

    /**
     * Record the beginning of drawing
     *
     * @deprecated
     * @method drawStart
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawStart = function (x, y, context, parameters) {
        if (context) {
            this._setContext(context);
        }
        if (parameters) {
            this.setParameters(parameters);
        }
        this.points = [];
        this.drawing = true;
        this.points.push(new scope.QuadraticPoint({x: x, y: y}));
    };

    /**
     * Record the drawing
     *
     * @deprecated
     * @method drawContinue
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawContinue = function (x, y, context, parameters) {
        if (this.drawing) {
            if (context) {
                this._setContext(context);
            }
            if (parameters) {
                this.setParameters(parameters);
            }

            var params = this.getParameters();
            var delta = 2 + (params.getWidth() / 4);
            var last = this.points[this.points.length - 1];

            if (Math.abs(last.getX() - x) >= delta || Math.abs(last.getY() - y) >= delta) {

                if (this.points.length === 1) { // firstPoint

                    var pA = this.points[this.points.length - 1]; // firstPoint
                    var pB = new scope.QuadraticPoint({x: x, y: y});
                    var pAB = new scope.QuadraticPoint({
                        x: 0.5 * (pA.getX() + pB.getX()),
                        y: 0.5 * (pA.getY() + pB.getY())
                    });
                    _computePointParameters(pA, pAB, params.getPressureType());
                    _computePointParameters(pAB, pB, params.getPressureType());

                    _computeFirstControls(pA, pAB, params.getWidth());
                    _computeControls(pAB, pB, params.getWidth());

                    this.points.push(pAB);
                    this.points.push(pB);

                    _drawFirstSegment(pA, pAB, this.getContext(), params);

                } else {
                    var pAB = this.points[this.points.length - 2]; // jshint ignore:line
                    var pB = this.points[this.points.length - 1]; // jshint ignore:line
                    var pC = new scope.QuadraticPoint({x: x, y: y});
                    var pBC = new scope.QuadraticPoint({
                        x: 0.5 * (pB.getX() + pC.getX()),
                        y: 0.5 * (pB.getY() + pC.getY())
                    });
                    _computePointParameters(pB, pBC, params.getPressureType());
                    _computePointParameters(pBC, pC, params.getPressureType());

                    _computeControls(pB, pBC, params.getWidth());
                    _computeControls(pBC, pC, params.getWidth());

                    this.points.push(pBC);
                    this.points.push(pC);

                    _drawSegment(pAB, pB, pBC, this.getContext(), params);
                }
            }
        }
    };

    /**
     * Stop record of drawing
     *
     * @deprecated
     * @method drawEnd
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [context] DEPRECATED, use renderer constructor instead
     * @param {PenParameters} [parameters] DEPRECATED, use setParameters instead
     */
    AbstractRenderer.prototype.drawEnd = function (x, y, context, parameters) {
        if (this.drawing) {
            var params = this.getParameters();
            if (context) {
                this._setContext(context);
            }
            if (parameters) {
                this.setParameters(parameters);
            }

            if (this.points.length === 1) {
                _drawPoint(new scope.QuadraticPoint({x: x, y: y}), this.getContext(), params);
            } else if (this.points.length > 1) {
                var pA = this.points[this.points.length - 1];
                var pB = new scope.QuadraticPoint({x: x, y: y});
                var pAB = new scope.QuadraticPoint({
                    x: 0.5 * (pA.getX() + pB.getX()),
                    y: 0.5 * (pA.getY() + pB.getY())
                });
                _computePointParameters(pA, pAB, params.getPressureType());
                _computePointParameters(pAB, pB, params.getPressureType());

                _computeControls(pA, pAB, params.getWidth());
                _computeLastControls(pB, params.getWidth());

                this.points.push(pAB);
                this.points.push(pB);

                _drawLastSegment(pAB, pB, this.getContext(), params);
            }
            this.drawing = false;
        }
    };

    /**
     * Draw point on context
     *
     * @private
     * @deprecated
     * @method _drawPoint
     * @param {QuadraticPoint} point
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawPoint = function (point, context, parameters) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 1;

            context.beginPath();
            context.arc(point.getX(), point.getY(), 0.25 * parameters.getWidth(), 0, 2 * Math.PI);
            context.fill();
        } finally {
            context.restore();
        }

    };

    /**
     * Draw the first stroke segment on context
     *
     * @private
     * @deprecated
     * @method _drawFirstSegment
     * @param {QuadraticPoint} pA
     * @param {QuadraticPoint} pB
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawFirstSegment = function (pA, pB, context, parameters) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = 1;
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(pA.getP1().getX(), pA.getP1().getY());
            context.lineTo(pB.getP1().getX(), pB.getP1().getY());
            context.lineTo(pB.getP2().getX(), pB.getP2().getY());
            context.lineTo(pA.getP2().getX(), pA.getP2().getY());
            context.closePath();
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Draw middle stroke segment on context
     *
     * @private
     * @deprecated
     * @method _drawSegment
     * @param {QuadraticPoint} pA
     * @param {QuadraticPoint} pB
     * @param {QuadraticPoint} pC
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawSegment = function (pA, pB, pC, context, parameters) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = 1;
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(pA.getP1().getX(), pA.getP1().getY());
            context.quadraticCurveTo(pB.getP1().getX(), pB.getP1().getY(), pC.getP1().getX(), pC.getP1().getY());
            context.lineTo(pC.getP2().getX(), pC.getP2().getY());
            context.quadraticCurveTo(pB.getP2().getX(), pB.getP2().getY(), pA.getP2().getX(), pA.getP2().getY());
            context.closePath();
            context.fill();

        } finally {
            context.restore();
        }
    };

    /**
     * Draw the last stroke segment on context
     *
     * @private
     * @deprecated
     * @method _drawLastSegment
     * @param {QuadraticPoint} pA
     * @param {QuadraticPoint} pB
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawLastSegment = function (pA, pB, context, parameters) {

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = 1;
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(pA.getP1().getX(), pA.getP1().getY());
            context.lineTo(pB.getP1().getX(), pB.getP1().getY());
            context.lineTo(pB.getP2().getX(), pB.getP2().getY());
            context.lineTo(pA.getP2().getX(), pA.getP2().getY());
            context.closePath();
            context.fill();

        } finally {
            context.restore();
        }
    };

    /**
     * Compute distance and unit vector from the previous point.
     *
     * @private
     * @deprecated
     * @method _computePointParameters
     * @param {QuadraticPoint} previous
     * @param {QuadraticPoint} point
     * @param {String} pressureType
     */
    var _computePointParameters = function (previous, point, pressureType) {
        var dx = point.getX() - previous.getX(),
            dy = point.getY() - previous.getY(),
            d = Math.sqrt((dx * dx) + (dy * dy));

        if (d !== 0) {
            point.setDistance(d);
            point.setCos(dx / d);
            point.setSin(dy / d);
        }
        point.setLength(previous.getLength() + point.getDistance());

        switch (pressureType) {
            case 'SIMULATED':
                _computePressure(point);
                break;
            case 'CONSTANT':
                point.setPressure(1.0);
                break;
            case 'REAL':
                // keep the current pressure
                break;
            default:
                throw new Error('Unknown pressure type');
        }
    };

    /**
     * Compute simulated pressure of given point.
     *
     * @private
     * @deprecated
     * @method _computePressure
     * @param {QuadraticPoint} point
     */
    var _computePressure = function (point) {
        var k, pressure;
        if (point.getDistance() < 10) {
            k = 0.2 + Math.pow(0.1 * point.getDistance(), 0.4);
        } else if (point.getDistance() > point.getLength() - 10) {
            k = 0.2 + Math.pow(0.1 * (point.getLength() - point.getDistance()), 0.4);
        } else {
            k = 1.0;
        }

        pressure = k * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(point.getDistance()));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        point.setPressure(pressure);
    };

    /**
     * Compute control points of the first point.
     *
     * @private
     * @deprecated
     * @method _computeFirstControls
     * @param {QuadraticPoint} first First point of the list to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var _computeFirstControls = function (first, next, penWidth) {
        var r = 0.5 * (penWidth * first.getPressure()),
            nx = r * next.getSin(),
            ny = r * next.getCos();

        first.getP1().setX(first.getX() - nx);
        first.getP1().setY(first.getY() + ny);
        first.getP2().setX(first.getX() + nx);
        first.getP2().setY(first.getY() - ny);
    };

    /**
     * Compute control points between two points.
     *
     * @private
     * @deprecated
     * @method _computeControls
     * @param {QuadraticPoint} point Point to be computed
     * @param {QuadraticPoint} next Next point
     * @param {Number} penWidth Pen width
     */
    var _computeControls = function (point, next, penWidth) {
        var cos = point.getCos() + next.getCos(),
            sin = point.getSin() + next.getSin(),
            u = Math.sqrt((cos * cos) + (sin * sin));

        if (u !== 0) {
            // compute control points
            var r = 0.5 * penWidth * point.getPressure();
            var nx = -r * sin / u;
            var ny = r * cos / u;
            point.getP1().setX(point.getX() + nx);
            point.getP1().setY(point.getY() + ny);
            point.getP2().setX(point.getX() - nx);
            point.getP2().setY(point.getY() - ny);
        }
    };

    /**
     * Compute control points of the last point.
     *
     * @private
     * @deprecated
     * @method _computeLastControls
     * @param {QuadraticPoint} last Last point to be computed
     * @param {Number} penWidth Pen width
     */
    var _computeLastControls = function (last, penWidth) {
        var r = 0.5 * penWidth * last.getPressure(),
            nx = -r * last.getSin(),
            ny = r * last.getCos();

        last.getP1().setX(last.getX() + nx);
        last.getP1().setY(last.getY() + ny);
        last.getP2().setX(last.getX() - nx);
        last.getP2().setY(last.getY() - ny);
    };

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);