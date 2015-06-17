'use strict';

(function (scope) {
    /**
     * Represent the Shape Renderer. It's used to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @constructor
     */
    function ShapeRenderer() {
        scope.AbstractRenderer.call(this);
    }

    /**
     * Inheritance property
     */
    ShapeRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    ShapeRenderer.prototype.constructor = ShapeRenderer;

    /**
     * Draw shape recognition result on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {ShapeDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, parameters, context) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        this.drawShapes(components, recognitionResult.getSegments(), params, context);
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawComponents = function (components, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractShapePrimitive) {
                this.drawShapePrimitive(component, context, params);
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component, context, params); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw the shapes
     *
     * @method drawShapes
     * @param {AbstractComponent[]} components
     * @param {ShapeSegment[]} shapes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapes = function (components, shapes, context, parameters) {
        for (var i in shapes) {
            this.drawShapeSegment(components, shapes[i], context, parameters);
        }
    };

    /**
     * Draw shape segment
     *
     * @method drawShapeSegment
     * @param {AbstractComponent[]} components
     * @param {ShapeSegment} segment
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeSegment = function (components, segment, context, parameters) {
        var candidate = segment.getSelectedCandidate();
        if (candidate instanceof scope.ShapeRecognized) {
            this.drawShapeRecognized(candidate, context, parameters);
        } else if (candidate instanceof scope.ShapeNotRecognized) {
            this.drawShapeNotRecognized(components, segment.getInkRanges(), context, parameters);
        } else {
            throw new Error('not implemented');
        }
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @method drawShapeRecognized
     * @param {ShapeRecognized} shapeRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeRecognized = function (shapeRecognized, context, parameters) {
        this.drawComponents(shapeRecognized.getPrimitives(), context, parameters);
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {AbstractComponent[]} components
     * @param {ShapeInkRange[]} inkRanges
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeNotRecognized = function (components, inkRanges, context, parameters) {
        var notRecognized = [];
        for (var i in inkRanges) {
            notRecognized.concat(this.extractStroke(components, inkRanges[i]));
        }
        this.drawComponents(notRecognized, context, parameters);
    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive, context, parameters) {
        if (primitive instanceof scope.ShapeEllipse) {
            this.drawShapeEllipse(primitive, context, parameters);
        } else if (primitive instanceof scope.ShapeLine) {
            this.drawShapeLine(primitive, context, parameters);
        } else {
            throw new Error('Primitive not implemented: ' + primitive.getType());
        }
    };

    /**
     * Draw shape line
     *
     * @method drawShapeLine
     * @param {ShapeLine} shapeLine
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeLine = function (shapeLine, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        drawLine(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, params);
        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, params);
        }
        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, params);
        }
    };

    /**
     * Draw shape ellipse
     *
     * @method drawShapeEllipse
     * @param {ShapeEllipse} shapeEllipse
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeEllipse = function (shapeEllipse, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        var points = drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, params);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, params);
        }
        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, params);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @private
     * @method drawEllipseArc
     * @param {Point} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     * @returns {Point[]}
     */
    var drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

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
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

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
                    boundariesPoints.push(new scope.Point({x: x, y: y}));
                }
            }

            context.stroke();

        } finally {
            context.restore();
        }

        return boundariesPoints;
    };

    /**
     * Draw a line on context
     *
     * @private
     * @method drawLine
     * @param {Point} p1
     * @param {Point} p2
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawLine = function (p1, p2, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            context.moveTo(p1.getX(), p1.getY());
            context.lineTo(p2.getX(), p2.getY());
            context.stroke();
        } finally {
            context.restore();
        }
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     *
     * @private
     * @method phi
     * @param {Number} angle
     * @returns {Number}
     */
    var phi = function (angle) {
        angle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angle < -Math.PI) {
            angle += Math.PI * 2;
        }
        return angle;
    };

    /**
     * Draw an arrow head on context
     *
     * @private
     * @method drawArrowHead
     * @param {Point} headPoint
     * @param {Number} angle
     * @param {Number} length
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    var drawArrowHead = function (headPoint, angle, length, context, parameters) {
        var alpha = phi(angle + Math.PI - (Math.PI / 8)),
            beta = phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.moveTo(headPoint.getX(), headPoint.getY());
            context.beginPath();
            context.lineTo(headPoint.getX() + (length * Math.cos(alpha)), headPoint.getY() + (length * Math.sin(alpha)));
            context.lineTo(headPoint.getX() + (length * Math.cos(beta)), headPoint.getY() + (length * Math.sin(beta)));
            context.lineTo(headPoint.getX(), headPoint.getY());
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Get strokes from shape inkRange
     *
     * @method extractStroke
     * @param {Stroke[]} strokes
     * @param {ShapeInkRange} inkRange
     * @result {Stroke[]} List of strokes from inkRange
     */
    ShapeRenderer.prototype.extractStroke = function (strokes, inkRange) {
        var result = [],
            firstPointIndex = Math.floor(inkRange.getFirstPoint()),
            lastPointIndex = Math.ceil(inkRange.getLastPoint());

        for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
            var currentStroke = strokes[strokeIndex - 1];
            var currentStrokePointCount = currentStroke.getX().length;

            var newStroke = new scope.Stroke(), x = [], y = [];

            for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                x.push(currentStroke.getX()[pointIndex]);
                y.push(currentStroke.getY()[pointIndex]);
            }

            newStroke.setX(x);
            newStroke.setY(y);
            result.push(newStroke);
        }
        return result;
    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);