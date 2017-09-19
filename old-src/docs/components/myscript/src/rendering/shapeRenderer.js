'use strict';

(function (scope) {
    /**
     * Represent the Shape Renderer. It's used to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function ShapeRenderer(context) {
        scope.AbstractRenderer.call(this, context);
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
     * @param {ShapeDocument} document
     */
    ShapeRenderer.prototype.drawRecognitionResult = function (components, document) {
        this.clear();
        if (document && (document instanceof scope.ShapeDocument)) {
            this.drawShapes(components, document.getSegments());
            var lastComponents = [];
            var processedComponents = _extractComponents(components, document.getInkRanges());

            for (var i in components) {
                var component = components[i];
                if (processedComponents.indexOf(component) !== -1) {
                    lastComponents.push(component);
                }
            }
            this.drawComponents(lastComponents);
        } else {
            this.drawComponents(components);
        }
        return {components : components, document : document}
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    ShapeRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractShapePrimitive) {
                _drawShapePrimitive(component, this.getContext(), this.getParameters());
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
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
     */
    ShapeRenderer.prototype.drawShapes = function (components, shapes) {
        for (var i in shapes) {
            this.drawShapeSegment(components, shapes[i]);
        }
    };

    /**
     * Draw shape segment
     *
     * @method drawShapeSegment
     * @param {AbstractComponent[]} components
     * @param {ShapeSegment} segment
     */
    ShapeRenderer.prototype.drawShapeSegment = function (components, segment) {
        var candidate = segment.getSelectedCandidate();
        if (candidate instanceof scope.ShapeRecognized) {
            _drawShapeRecognized(candidate, this.getContext(), this.getParameters());
        } else if (candidate instanceof scope.ShapeNotRecognized) {
            this.drawComponents(_extractComponents(components, segment.getInkRanges()));
        } else {
            throw new Error('not implemented');
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {AbstractComponent[]} components
     * @param {ShapeInkRange[]} inkRanges
     */
    ShapeRenderer.prototype.drawShapeNotRecognized = function (components, inkRanges) {
        this.drawComponents(_extractComponents(components, inkRanges));
    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive) {
        _drawShapePrimitive(primitive, this.getContext(), this.getParameters());
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @private
     * @method _drawShapeRecognized
     * @param {ShapeRecognized} shapeRecognized
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeRecognized = function (shapeRecognized, context, parameters) {
        for (var i in shapeRecognized.getPrimitives()) {
            _drawShapePrimitive(shapeRecognized.getPrimitives()[i], context, parameters);
        }
    };

    /**
     * Draw shape primitive
     *
     * @private
     * @method _drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapePrimitive = function (primitive, context, parameters) {
        if (primitive instanceof scope.ShapeEllipse) {
            _drawShapeEllipse(primitive, context, parameters);
        } else if (primitive instanceof scope.ShapeLine) {
            _drawShapeLine(primitive, context, parameters);
        } else {
            throw new Error('Primitive not implemented: ' + primitive.getType());
        }
    };

    /**
     * Draw shape line
     *
     * @private
     * @method _drawShapeLine
     * @param {ShapeLine} shapeLine
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeLine = function (shapeLine, context, parameters) {
        _drawLine(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, parameters);
        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, parameters);
        }
        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw shape ellipse
     *
     * @private
     * @method _drawShapeEllipse
     * @param {ShapeEllipse} shapeEllipse
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeEllipse = function (shapeEllipse, context, parameters) {
        var points = _drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, parameters);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, parameters);
        }
        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @private
     * @method _drawEllipseArc
     * @param {Point} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     * @returns {Point[]}
     */
    var _drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

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
     * @method _drawLine
     * @param {Point} p1
     * @param {Point} p2
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawLine = function (p1, p2, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
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
     * @method _phi
     * @param {Number} angle
     * @returns {Number}
     */
    var _phi = function (angle) {
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
     * @method _drawArrowHead
     * @param {Point} headPoint
     * @param {Number} angle
     * @param {Number} length
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawArrowHead = function (headPoint, angle, length, context, parameters) {
        var alpha = _phi(angle + Math.PI - (Math.PI / 8)),
            beta = _phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
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
     * Return components from ink ranges
     *
     * @private
     * @param components
     * @param inkRanges
     * @returns {AbstractComponent[]}
     */
    var _extractComponents = function (components, inkRanges) {
        var result = [];

        for (var i in inkRanges) {
            var inkRange = inkRanges[i];

            var firstPointIndex = Math.floor(inkRange.getFirstPoint());
            var lastPointIndex = Math.ceil(inkRange.getLastPoint());

            for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
                var currentStroke = components[strokeIndex];
                var currentStrokePointCount = currentStroke.getX().length;

                var newStroke = new scope.StrokeComponent();
                newStroke.setColor(currentStroke.getColor());
                newStroke.setWidth(currentStroke.getWidth());

                for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                    newStroke.addPoint(currentStroke.getX()[pointIndex], currentStroke.getY()[pointIndex], currentStroke.getT()[pointIndex]);
                }
                result.push(newStroke);
            }
        }
        return result;

    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);
