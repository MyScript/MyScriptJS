(function (scope) {

    /**
     * Represent the Shape Renderer. It's use to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @constructor
     */
    function ShapeRenderer () {
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
     * Draw an ellipse arc on context
     *
     * @method drawEllipseArc
     * @param {Object} centerPoint
     * @param {Object} maxRadius
     * @param {Object} minRadius
     * @param {Object} orientation
     * @param {Object} startAngle
     * @param {Object} sweepAngle
     * @param {RenderingParameters} parameters
     * @param {Object} context
     * @returns {Array}
     */
    ShapeRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context) {

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
     * Draw the non-recognizing  strokes
     *
     * @method nonRecoStrokesDrawing
     * @param {Object} strokes
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.nonRecoStrokesDrawing = function (strokes, parameters, context) {
        for (var i in strokes) {
            var newStroke = [];

            for (var j = 0; j < strokes[i].x.length; j++) {
                newStroke.push({
                    x: strokes[i].x[j],
                    y: strokes[i].y[j],
                    pressure: 0.5,
                    distance: 0.0,
                    length: 0.0,
                    ux: 0.0,
                    uy: 0.0,
                    x1: 0.0,
                    x2: 0.0,
                    y1: 0.0,
                    y2: 0.0
                });
            }
            this.drawStroke(newStroke, parameters, context);
        }
    };

    /**
     * Draw shape strokes on HTML5 canvas
     *
     * @method drawStrokesByRecognitionResult
     * @param {Object} strokes
     * @param {Object} recognizedParameters
     * @param {Object} notRecognizedParameters
     * @param {Object} segments
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {

        var segments = recognitionResult.getSegments();

        for (var i in segments) {
            var segment = segments[i],
                candidate = segment.getSelectedCandidate(),
                extractedStrokes;

            if (candidate) {
                if (candidate.isRecognized()) {
                    this.drawRecognizedShape(candidate, parameters, context);
                } else if (candidate.isNotRecognized()) {

                    var inkRanges = segment.getInkRanges();
                    for (var j in inkRanges) {

                        extractedStrokes = this.extractStroke(strokes, inkRanges[j]);

                        for (var k in extractedStrokes) {
                            this.drawStroke(extractedStrokes[k], parameters, context);
                        }
                    }
                }
            }
        }
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @method drawRecognizedShape
     * @param {Object} shapeRecognized
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawRecognizedShape = function (shapeRecognized, parameters, context) {

        var primitives = shapeRecognized.getPrimitives();

        for (var i in primitives) {
            this.drawShapePrimitive(primitives[i], parameters, context);
        }
        if (this.showBoundingBoxes) {
            var rectangleList = [];

            for (var j in primitives) {
                // Primitive bounding rect
                rectangleList.push(this.getPrimitiveBoundingBox(primitives[j]));
            }
            // Bounding rect of the entire shape
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);
            this.drawRectangle(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height, parameters, context);
        }
    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {Object} primitive
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive, parameters, context) {
        if (primitive.isEllipse()) {
            this.drawShapeEllipse(primitive, parameters, context);
        } else if (primitive.isLine()) {
            this.drawShapeLine(primitive, parameters, context);
        }
    };

    /**
     * Draw shape line
     *
     * @method drawShapeLine
     * @param {Object} shapeLine
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawShapeLine = function (shapeLine, parameters, context) {

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), parameters, context);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, parameters, context);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, parameters, context);
        }
    };

    /**
     * Draw shape ellipse
     *
     * @method drawShapeEllipse
     * @param {Object} shapeEllipse
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    ShapeRenderer.prototype.drawShapeEllipse = function (shapeEllipse, parameters, context) {

        var points = this.drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            parameters, context);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, parameters, context);
        }

        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, parameters, context);
        }
    };

    /**
     * Get the bounding box of primitive
     *
     * @method getPrimitiveBoundingBox
     * @param {Object} primitive
     * @returns {Object} the bounding box
     */
    ShapeRenderer.prototype.getPrimitiveBoundingBox = function (primitive) {
        var rectangle = null;
        if (primitive.isEllipse()) {
            rectangle = scope.MathUtils.getEllipseArcRect(primitive.getCenter(), primitive.getMaxRadius(), primitive.getMinRadius(), primitive.getOrientation(), primitive.getStartAngle(), primitive.getSweepAngle());
        } else if (primitive.isLine()) {
            rectangle = scope.MathUtils.getLineRect(primitive.getFirstPoint(), primitive.getLastPoint());
        }
        return rectangle;
    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);