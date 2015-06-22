'use strict';

(function (scope) {
    /**
     * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @constructor
     */
    function AbstractRenderer() {
        this.penParameters = new scope.PenParameters();
        this.showBoundingBoxes = false;
    }

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
    AbstractRenderer.prototype.getPenParameters = function () {
        return this.penParameters;
    };

    /**
     * Set the default pen parameters
     *
     * @param {PenParameters} penParameters
     */
    AbstractRenderer.prototype.setPenParameters = function (penParameters) {
        this.penParameters = penParameters;
    };

    /**
     * Clear the recognition context
     *
     * @method clear
     * @param {Context2d} context
     */
    AbstractRenderer.prototype.clear = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };

    /**
     * Draw recognition result on HTML5 canvas.
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {Object} recognitionResult
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AbstractRenderer.prototype.drawComponents = function (components, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw component
     *
     * @method drawComponent
     * @param {AbstractComponent} component
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AbstractRenderer.prototype.drawComponent = function (component, currentContext, finalContext, parameters) {
        if (component instanceof scope.Stroke) {
            this.drawStroke(component, currentContext, finalContext);
        } else if (component instanceof scope.CharacterInputComponent) {
            this.drawCharacter(component, finalContext, parameters);
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw a rectangle on context
     *
     * @method drawRectangle
     * @param {Rectangle} rectangle
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AbstractRenderer.prototype.drawRectangle = function (rectangle, context, parameters) {

        context.save();
        try {
            var params = this.getPenParameters();
            if (parameters) {
                params = parameters;
            }
            context.fillStyle = params.getRectColor();
            context.strokeStyle = params.getColor();
            context.globalAlpha = params.getAlpha();
            context.lineWidth = 0.5 * params.getWidth();
            context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
        } finally {
            context.restore();
        }
    };

    /**
     * Draw character component
     *
     * @private
     * @method drawCharacter
     * @param {CharacterInputComponent} character
     * @param {Object} context
     * @param {PenParameters} [parameters]
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
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawStroke = function (stroke, context) {
        render(context, stroke);
    };

    /**
     * Draw stroke components
     *
     * @private
     * @method drawStrokes
     * @param {Stroke[]} strokes
     * @param {Object} context
     */
    AbstractRenderer.prototype.drawStrokes = function (strokes, context) {
        for(var i = 0; i < strokes.length;i++){
            this.drawStroke(strokes[i], context);
        }
    };

    /*******************************************************************************************************************
     * Algorithm methods to compute rendering
     ******************************************************************************************************************/

    function computeLinksPoints(point, angle, width) {
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

    function computeMiddlePoint(point1, point2) {
        return {
            x : ((point2.x + point1.x) / 2),
            y : ((point2.y + point1.y) / 2),
            p : ((point2.p + point1.p) / 2)
        };
    }

    function computeAxeAngle(begin, end) {
        return Math.atan2(end.y - begin.y, end.x - begin.x);
    }

    function fill(context, color, alpha) {
        if (color !== undefined) {
            context.globalAlpha = alpha;
            context.fillStyle = color;
            context.fill();
        }
    }

    function render(context, stroke) {
        if (stroke !== undefined && stroke.getLength() > 0) {
            if (stroke.getColor()) {
                renderStroke(context, stroke);
            }
        }
    }

    function renderStroke(context, stroke) {
        context.beginPath();
        var length = stroke.getLength();
        var width = stroke.getWidth();
        var firstPoint = stroke.getPointByIndex(0);
        if (length < 3){
            context.arc(firstPoint.x, firstPoint.y, width * 0.2, 0, Math.PI * 2, true);
        }else {
            context.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
            renderLine(context, firstPoint, computeMiddlePoint(firstPoint, stroke.getPointByIndex(1)), width);

            // Possibility to try this (the start looks better when the ink is large)
            //var first = computeMiddlePoint(stroke[0], stroke[1]);
            //context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

            var nbquadratics = length - 2;
            for (var i = 0; i < nbquadratics; i++){
                renderQuadratic(context, computeMiddlePoint(stroke.getPointByIndex(i), stroke.getPointByIndex(i + 1)), computeMiddlePoint(stroke.getPointByIndex(i + 1), stroke.getPointByIndex(i + 2)), stroke.getPointByIndex(i + 1), width);
            }
            renderLine(context, computeMiddlePoint(stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1)), stroke.getPointByIndex(length - 1), width);
            renderFinal(context, stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1), width);
        }
        context.closePath();
        fill(context, stroke.getColor(), stroke.getAlpha());
    }

    function renderFinal(context, begin, end, width) {
        var ARCSPLIT = 6;
        var angle = computeAxeAngle(begin, end);
        var linkPoints = computeLinksPoints(end, angle, width);
        context.moveTo(linkPoints[0].x, linkPoints[0].y);
        for (var i = 1; i <= ARCSPLIT; i++) {
            var newAngle = angle - i * Math.PI / ARCSPLIT;
            context.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
        }
    }

    function renderLine(context, begin, end, width) {
        var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, end), width);
        var linkPoints2 = computeLinksPoints(end, computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
    }

    function renderQuadratic(context, begin, end, ctrl, width) {
        var linkPoints1 = computeLinksPoints(begin, computeAxeAngle(begin, ctrl), width);
        var linkPoints2 = computeLinksPoints(end, computeAxeAngle(ctrl, end), width);
        var linkPoints3 = computeLinksPoints(ctrl, computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
    }

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);