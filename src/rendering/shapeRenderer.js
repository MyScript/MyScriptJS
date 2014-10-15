/**
 *
 * @param scope
 */
(function (scope) {

    /**
     *
     * @constructor
     */
    function ShapeRenderer () {
    }

    /**
     *
     * @type {AbstractRenderer}
     */
    ShapeRenderer.prototype = Object.create(scope.AbstractRenderer.prototype);

    /**
     *
     * @param strokes
     * @param parameters
     * @param context
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
     *
     * @param strokes
     * @param recognizedParameters
     * @param notRecognizedParameters
     * @param segments
     * @param context
     */
    ShapeRenderer.prototype.strokesDrawing = function (strokes, recognizedParameters, notRecognizedParameters, segments, context) {

        for (var i in segments) {
            var segment = segments[i],
                candidate = segment.getSelectedCandidate(),
                extractedStrokes;

            if (candidate) {
                if (candidate.isRecognized()) {
                    this.drawRecognizedShape(candidate, recognizedParameters, context);
                } else if (candidate.isNotRecognized()) {

                    var inkRanges = segment.getInkRanges();
                    for (var j in inkRanges) {

                        extractedStrokes = this.extractStroke(strokes, inkRanges[j]);

                        for (var k in extractedStrokes) {
                            this.drawStroke(extractedStrokes[k], notRecognizedParameters, context);
                        }
                    }
                }
            }
        }
    };

    /**
     *
     * @param shapeRecognized
     * @param parameters
     * @param context
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
     *
     * @param primitive
     * @param parameters
     * @param context
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive, parameters, context) {
        if (primitive.isEllipse()) {
            this.drawShapeEllipse(primitive, parameters, context);
        } else if (primitive.isLine()) {
            this.drawShapeLine(primitive, parameters, context);
        }
    };

    /**
     *
     * @param shapeLine
     * @param parameters
     * @param context
     */
    ShapeRenderer.prototype.drawShapeLine = function (shapeLine, parameters, context) {

        this.drawLine(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), parameters, context);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, parameters, context);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, parameters, context);
        }
    };

    /**
     *
     * @param shapeEllipse
     * @param parameters
     * @param context
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
     *
     * @param strokes
     * @param inkRange
     */
    ShapeRenderer.prototype.extractStroke = function (strokes, inkRange) {
        var result = [],
            firstPointIndex = Math.floor(inkRange.getFirstPoint()),
            lastPointIndex = Math.ceil(inkRange.getLastPoint());

        for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
            var currentStroke = strokes[strokeIndex];
            var currentStrokePointCount = currentStroke.x.length;

            var newStroke = [];

            for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                newStroke.push({
                    x: currentStroke.x[pointIndex],
                    y: currentStroke.y[pointIndex],
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

            result.push(newStroke);
        }
        return result;
    };

    /**
     *
     * @param primitive
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

    /**
     *
     * @type {ShapeRenderer}
     */
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);