(function (scope) {
    'use strict';
    /**
     * Represent the Shape Renderer. It's used to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @constructor
     */
    function ShapeRenderer () {
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
     * Draw shape strokes on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {Stroke[]} strokes
     * @param {ShapeDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawRecognitionResult = function (strokes, recognitionResult, parameters, context) {
        this.drawShapes(strokes, recognitionResult.getSegments(), parameters, context);
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {Object[]} components
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawComponents = function (components, context, parameters) {
        scope.AbstractRenderer.prototype.drawComponents.call(this, components, context, parameters); // super
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.ShapeEllipse) {
                this.drawShapeEllipse(component, context, parameters);
            } else if (component instanceof scope.ShapeLine) {
                this.drawShapeLine(component, context, parameters);
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw the shapes
     *
     * @method drawShapes
     * @param {Stroke[]} strokes
     * @param {ShapeSegment[]} shapes
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapes = function (strokes, shapes, context, parameters) {

        for (var i in shapes) {
            var segment = shapes[i];
            var candidate = segment.getSelectedCandidate();

            if (candidate) {
                if (candidate instanceof scope.ShapeRecognized) {
                    this.drawShapeRecognized(candidate, context, parameters);
                } else if (candidate instanceof scope.ShapeNotRecognized) {
                    this.drawShapeNotRecognized(strokes, segment.getInkRanges(), candidate, context, parameters);
                } else {
                    throw new Error('not implemented');
                }
            }
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

        var primitives = shapeRecognized.getPrimitives();

        for (var i in primitives) {
            this.drawShapePrimitive(primitives[i], context, parameters);
        }
        if (parameters.getShowBoundingBoxes()) {
            var rectangleList = [];

            for (var j in primitives) {
                // Primitive bounding rect
                rectangleList.push(this.getPrimitiveBoundingBox(primitives[j]));
            }
            // Bounding rect of the entire shape
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);
            this.drawRectangle(boundingRect, context, parameters);
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {ShapeInkRange[]} inkRanges
     * @param {ShapeNotRecognized} shapeNotRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    ShapeRenderer.prototype.drawShapeNotRecognized = function (strokes, inkRanges, shapeNotRecognized, context, parameters) {
        for (var i in inkRanges) {
            var extractedStrokes = this.extractStroke(strokes, inkRanges[i]);
            this.drawStrokes(extractedStrokes, context, parameters);
        }

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

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, parameters);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @method drawEllipseArc
     * @param {ShapePoint} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     * @returns {Point[]}
     */
    ShapeRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

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
            if (parameters) {
                context.fillStyle = parameters.getColor();
                context.strokeStyle = parameters.getColor();
                context.globalAlpha = parameters.getAlpha();
                context.lineWidth = 0.5 * parameters.getWidth();
            } else {
                context.fillStyle = this.getParameters().getColor();
                context.strokeStyle = this.getParameters().getColor();
                context.globalAlpha = this.getParameters().getAlpha();
                context.lineWidth = 0.5 * this.getParameters().getWidth();
            }

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

        var points = this.drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, parameters);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, parameters);
        }

        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Get the bounding box of primitive
     *
     * @method getPrimitiveBoundingBox
     * @param {AbstractShapePrimitive} primitive
     * @returns {Object} the bounding box
     */
    ShapeRenderer.prototype.getPrimitiveBoundingBox = function (primitive) {
        var rectangle = null;
        if (primitive instanceof scope.ShapeEllipse) {
            rectangle = scope.MathUtils.getEllipseArcRect(primitive.getCenter(), primitive.getMaxRadius(), primitive.getMinRadius(), primitive.getOrientation(), primitive.getStartAngle(), primitive.getSweepAngle());
        } else if (primitive instanceof scope.ShapeLine) {
            rectangle = scope.MathUtils.getLineRect(primitive.getFirstPoint(), primitive.getLastPoint());
        }
        return rectangle;
    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);