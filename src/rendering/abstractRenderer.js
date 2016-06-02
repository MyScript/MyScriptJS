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
        this.typeset = true;
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
     * Is typesetting
     *
     * @returns {Boolean}
     */
    AbstractRenderer.prototype.isTypesetting = function () {
        return this.typeset;
    };

    /**
     * Enable / disable typesetting
     *
     * @param {Boolean} typeset
     */
    AbstractRenderer.prototype.setTypeset = function (typeset) {
        this.typeset = typeset;
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
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    AbstractRenderer.prototype.drawComponents = function (components) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw component
     *
     * @method drawComponent
     * @param {AbstractComponent} component
     */
    AbstractRenderer.prototype.drawComponent = function (component) {
        if (component instanceof scope.StrokeComponent) {
            this.drawStroke(component);
        } else if (component instanceof scope.CharacterInputComponent) {
            this.drawCharacter(component);
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {Rectangle} rectangle
     */
    AbstractRenderer.prototype.drawRectangle = function (rectangle) {
        var params = this.getParameters();
        this.getContext().save();
        try {
            this.getContext().fillStyle = params.getRectColor();
            this.getContext().strokeStyle = params.getColor();
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
     */
    AbstractRenderer.prototype.drawCharacter = function (character) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw stroke component
     *
     * @private
     * @method drawStroke
     * @param {StrokeComponent} stroke
     */
    AbstractRenderer.prototype.drawStroke = function (stroke) {
        if (stroke && stroke.getLength() > 0) {
            _renderStroke(stroke, this.getContext());
        }
    };

    /**
     * Draw stroke components
     *
     * @private
     * @method drawStrokes
     * @param {StrokeComponent[]} strokes
     */
    AbstractRenderer.prototype.drawStrokes = function (strokes) {
        for (var i = 0; i < strokes.length; i++) {
            this.drawStroke(strokes[i]);
        }
    };

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
    function _renderStroke(stroke, context) {
        context.beginPath();
        var length = stroke.getLength();
        var width = stroke.getWidth();
        var firstPoint = stroke.getPointByIndex(0);
        if (length < 3) {
            context.arc(firstPoint.x, firstPoint.y, width * 0.6, 0, Math.PI * 2, true);
        } else {
            context.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
            _renderLine(context, firstPoint, _computeMiddlePoint(firstPoint, stroke.getPointByIndex(1)), width);

            // Possibility to try this (the start looks better when the ink is large)
            //var first = _computeMiddlePoint(stroke[0], stroke[1]);
            //context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

            var nbquadratics = length - 2;
            for (var i = 0; i < nbquadratics; i++) {
                _renderQuadratic(context, _computeMiddlePoint(stroke.getPointByIndex(i), stroke.getPointByIndex(i + 1)), _computeMiddlePoint(stroke.getPointByIndex(i + 1), stroke.getPointByIndex(i + 2)), stroke.getPointByIndex(i + 1), width);
            }
            _renderLine(context, _computeMiddlePoint(stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1)), stroke.getPointByIndex(length - 1), width);
            _renderFinal(context, stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1), width);
        }
        context.closePath();
        _fill(context, stroke.getColor());
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

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);
