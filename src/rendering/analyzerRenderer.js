(function (scope) {

    /**
     * Represent the Analyzer Renderer. It's use to calculate the analyzer ink rendering in HTML5 canvas
     *
     * @class AnalyzerRenderer
     * @constructor
     */
    function AnalyzerRenderer () {
    }

    /**
     * Inheritance property
     */
    AnalyzerRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    AnalyzerRenderer.prototype.constructor = AnalyzerRenderer;

    /**
     * Draw text on analyser
     *
     * @method drawText
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {Object} text
     * @param {Object} justificationType
     * @param {Object} textHeight
     * @param {Object} baseline
     * @param {RenderingParameters} parameters
     * @param {Object} context
     * @returns {{x: *, y: *}}
     */
    AnalyzerRenderer.prototype.drawText = function (x, y, width, height, text, justificationType, textHeight, baseline, parameters, context) {

        var topLeft = {
                x: x,
                y: y
            },
            textMetrics;

        // If Text height is taller than Bounding box height
        if (textHeight > height) {
            textHeight = height;
        }

        context.font = parameters.getDecoration() + textHeight + 'pt ' + parameters.font;

        textMetrics = context.measureText(text);

        // If Text width is wider than Bounding box width
        if (textMetrics.width > width) {
            textHeight = textHeight * width / textMetrics.width;
            context.font = parameters.getDecoration() + textHeight + 'pt ' + parameters.font;
        } else {
            // If Text is analyzed as centered
            if ('CENTER' === justificationType) {
                topLeft.x = x + (width - textMetrics.width) / 2;
            }
        }

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.globalAlpha = parameters.getAlpha();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.font = parameters.getDecoration() + textHeight + 'pt ' + parameters.font;

            context.fillText(text, topLeft.x, baseline);

        } finally {
            context.restore();
        }
        return topLeft;
    };

    /**
     * Draw table
     *
     * @method tableStrokesDrawing
     * @param {Object} strokes
     * @param {RenderingParameters} parameters
     * @param {Object} tables
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.tableStrokesDrawing = function (strokes, parameters, tables, context) {
        for (var i in tables) {
            if (tables[i].data) {

                if (this.showBoundingBoxes) {
                    for (var j in tables[i].getCells()) {
                        this.drawCell(tables[i].getCells()[j], parameters, context);
                    }
                }
                for (var z in tables[i].getLines()) {
                    this.drawLine(tables[i].getLines()[z], parameters, context);
                }
            }
        }
    };

    /**
     * Draw the text line
     *
     * @method textLineStrokesDrawing
     * @param {Object} strokes
     * @param {RenderingParameters} parameters
     * @param {Object} textLines
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.textLineStrokesDrawing = function (strokes, parameters, textLines, context) {

        for (var i in textLines) {
            var textLine = textLines[i];
            var data = textLine.getData();
            if (data) {

                if (this.showBoundingBoxes) {
                    this.drawRectangle(data.getTopLeftPoint().x, data.getTopLeftPoint().y, data.getWidth(), data.getHeight(), parameters, context);
                }

                var selectedCandidateidx = textLine.result.textSegmentResult.selectedCandidateIdx;
                var text = textLine.result.textSegmentResult.candidates[selectedCandidateidx].label;
                var textHeight = data.getTextHeight();

                var topLeft = this.drawText(data.getTopLeftPoint().getX(), data.getTopLeftPoint().getY(), data.getWidth(), data.getHeight(), text, data.getJustificationType(), data.getTextHeight(), data.getBaselinePos(), parameters, context);

                var lowerBaselinePos = data.getBaselinePos() + textHeight / 10;

                var underlines = textLine.getUnderlineList();

                for (var j in underlines) {
                    var firstCharacter = underlines[j].getData().getFirstCharacter();
                    var lastCharacter = underlines[j].getData().getLastCharacter();

                    var textMetrics = context.measureText(text);

                    textMetrics = context.measureText(text.substring(0, firstCharacter));
                    var x1 = topLeft.x + textMetrics.width;

                    textMetrics = context.measureText(text.substring(firstCharacter, lastCharacter + 1));
                    var x2 = x1 + textMetrics.width;
                    this.drawLine({
                        x: x1,
                        y: lowerBaselinePos
                    }, {
                        x: x2,
                        y: lowerBaselinePos
                    }, parameters, context);
                }
            }
        }
    };

    /**
     * Draw a line
     *
     * @method drawLine
     * @param {Object} line
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.drawLine = function (line, parameters, context) {
        if (line.data === null) {
            this.drawLineByPoints(line.getData().getP1(), line.getData().getP2(), parameters, context);
        }
    };

    /**
     * Draw a cell
     *
     * @method drawCell
     * @param {Object} cell
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.drawCell = function (cell, parameters, context) {
        if (cell.data === null) {
            this.drawRectangle(cell.getData().getTopLeftPoint().getX(), cell.getData().getTopLeftPoint().getY(), cell.getData().getWidth(), cell.getData().getHeight(), parameters, context);
        }
    };

    /**
     * Draw shape strokes on HTML5 canvas
     *
     * @method drawStrokesByRecognitionResult
     * @param {Array} strokes
     * @param {AnalyzerDocument} recognitionResult
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.drawStrokesByRecognitionResult = function (strokes, recognitionResult, parameters, context) {

        var segments = recognitionResult.getShapes();

        for (var i in segments) {
            var segment = segments[i],
                candidate = segment.getSelectedCandidate(),
                extractedStrokes;

            if (candidate) {
                if (candidate instanceof scope.ShapeRecognized) {
                    this.drawRecognizedShape(candidate, parameters, context);
                } else if (candidate instanceof scope.ShapeNotRecognized) {

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
     * @param {ShapeRecognized} shapeRecognized
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.drawRecognizedShape = function (shapeRecognized, parameters, context) {

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
    AnalyzerRenderer.prototype.drawShapePrimitive = function (primitive, parameters, context) {
        if (primitive instanceof scope.ShapeEllipse) {
            this.drawShapeEllipse(primitive, parameters, context);
        } else if (primitive instanceof scope.ShapeLine) {
            this.drawShapeLine(primitive, parameters, context);
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
    AnalyzerRenderer.prototype.drawShapeEllipse = function (shapeEllipse, parameters, context) {

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
     * Draw shape line
     *
     * @method drawShapeLine
     * @param {Object} shapeLine
     * @param {RenderingParameters} parameters
     * @param {Object} context
     */
    AnalyzerRenderer.prototype.drawShapeLine = function (shapeLine, parameters, context) {

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), parameters, context);

        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, parameters, context);
        }

        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, parameters, context);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @method drawEllipseArc
     * @param {ShapePoint} centerPoint
     * @param {number} maxRadius
     * @param {number} minRadius
     * @param {string} orientation
     * @param {number} startAngle
     * @param {number} sweepAngle
     * @param {RenderingParameters} parameters
     * @param {Object} context
     * @returns {Array}
     */
    AnalyzerRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context) {

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



    // Export
    scope.AnalyzerRenderer = AnalyzerRenderer;
})(MyScript);