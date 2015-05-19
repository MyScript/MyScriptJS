'use strict';

(function (scope) {
    /**
     * Represent the Analyzer Renderer. It's used to calculate the analyzer ink rendering in HTML5 canvas
     *
     * @class AnalyzerRenderer
     * @extends AbstractRenderer
     * @constructor
     */
    function AnalyzerRenderer() {
        scope.AbstractRenderer.call(this);
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
     * Draw shape recognition result on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {AnalyzerDocument} recognitionResult
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) {
        this.drawShapes(components, recognitionResult.getShapes(), context, parameters);
        this.drawTables(components, recognitionResult.getTables(), context, parameters);
        this.drawTextLines(components, recognitionResult.getTextLines(), context, parameters);
//        this.drawGroups(strokes, recognitionResult.getGroups(), context, parameters); // TODO: not implemented
    };

    /**
     * Draw table
     *
     * @method drawTables
     * @param {AbstractComponent[]} components
     * @param {AnalyzerTable[]} tables
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTables = function (components, tables, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in tables) {
            if (params.getShowBoundingBoxes()) {
                for (var j in tables[i].getCells()) {
                    this.drawCell(tables[i].getCells()[j], context, params);
                }
            }
            for (var k in tables[i].getLines()) {
                this.drawLine(tables[i].getLines()[k], context, params);
            }
        }
    };

    /**
     * Draw the text line
     *
     * @method drawTextLines
     * @param {AbstractComponent[]} components
     * @param {AnalyzerTextLine[]} textLines
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTextLines = function (components, textLines, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        for (var i in textLines) {
            var textLine = textLines[i];
            var data = textLine.getData();
            if (data) {
                if (params.getShowBoundingBoxes()) {
                    this.drawRectangle(data.getBoundingBox(), context, params);
                }

                var text = textLine.getTextDocument().getTextSegment().getSelectedCandidate().getLabel();
                this.drawText(data.getBoundingBox(), text, data.getJustificationType(), data.getTextHeight(), data.getBaselinePos(), context, params);

                var underlines = textLine.getUnderlineList();
                for (var j in underlines) {
                    this.drawUnderline(data.getBoundingBox(), underlines[j], text, data.getTextHeight(), data.getBaselinePos() + data.getTextHeight() / 10, context, params);
                }
            }
        }
    };

    /**
     * Draw text on analyser
     *
     * @method drawText
     * @param {Rectangle} boundingBox
     * @param {String} text
     * @param {String} justificationType
     * @param {Number} textHeight
     * @param {Number} baseline
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawText = function (boundingBox, text, justificationType, textHeight, baseline, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        context.save();
        try {
            context.fillStyle = params.getColor();
            context.strokeStyle = params.getColor();
            context.globalAlpha = params.getAlpha();
            context.lineWidth = 0.5 * params.getWidth();
            context.font = params.getDecoration() + textHeight + 'px ' + params.getFont();
            context.textAlign = (justificationType === 'CENTER') ? 'center' : 'left';

            context.fillText(text, boundingBox.getX(), baseline, boundingBox.getWidth());

        } finally {
            context.restore();
        }
    };

    /**
     * Draw Underline
     *
     * @method drawUnderline
     * @param {Rectangle} boundingBox
     * @param {AnalyzerUnderline} underline
     * @param {String} text
     * @param {Number} textHeight
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawUnderline = function (boundingBox, underline, text, textHeight, baseline, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var topLeft = boundingBox.getTopLeftPoint();
        var firstCharacter = underline.getData().getFirstCharacter();
        var lastCharacter = underline.getData().getLastCharacter();

        context.font = params.getDecoration() + textHeight + 'px ' + params.getFont();

        var textMetrics = context.measureText(text.substring(0, firstCharacter));
        var x1 = topLeft.x + textMetrics.width;

        textMetrics = context.measureText(text.substring(firstCharacter, lastCharacter + 1));
        var x2 = x1 + textMetrics.width;
        this.drawLine(new scope.AnalyzerLine({
            data: new scope.AnalyzerLineData({
                p1: {x: x1, y: baseline},
                p2: {x: x2, y: baseline}
            })
        }), context, params);
    };

    /**
     * Draw Groups
     *
     * @method drawGroups
     * @param {AbstractComponent[]} components
     * @param {AnalyzerGroup[]} groups
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawGroups = function (components, groups, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw a line
     *
     * @method drawLine
     * @param {AnalyzerLine} line
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawLine = function (line, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        if (line.getData()) {
            this.drawLineByPoints(line.getData().getP1(), line.getData().getP2(), context, params);
        }
    };

    /**
     * Draw a cell
     *
     * @method drawCell
     * @param {AnalyzerCell} cell
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawCell = function (cell, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        if (cell.getData()) {
            this.drawRectangle(cell.getData().getBoundingBox(), context, params);
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
    AnalyzerRenderer.prototype.drawShapes = function (components, shapes, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        for (var i in shapes) {
            var segment = shapes[i];
            var candidate = segment.getSelectedCandidate();

            if (candidate) {
                if (candidate instanceof scope.ShapeRecognized) {
                    this.drawShapeRecognized(candidate, context, params);
                } else if (candidate instanceof scope.ShapeNotRecognized) {
                    this.drawShapeNotRecognized(components, segment.getInkRanges(), candidate, context, params);
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
    AnalyzerRenderer.prototype.drawShapeRecognized = function (shapeRecognized, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        var primitives = shapeRecognized.getPrimitives();

        for (var i in primitives) {
            this.drawShapePrimitive(primitives[i], context, params);
        }
        if (params.getShowBoundingBoxes()) {
            var rectangleList = [];

            for (var j in primitives) {
                // Primitive bounding rect
                rectangleList.push(this.getPrimitiveBoundingBox(primitives[j]));
            }
            // Bounding rect of the entire shape
            var boundingRect = scope.MathUtils.getBoundingRect(rectangleList);
            this.drawRectangle(boundingRect, context, params);
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {AbstractComponent[]} components
     * @param {AnalyzerInkRange[]} inkRanges
     * @param {ShapeNotRecognized} shapeNotRecognized
     * @param {Object} context
     * @param {RenderingParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawShapeNotRecognized = function (components, inkRanges, shapeNotRecognized, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in inkRanges) {
            var extractedStrokes = this.extractStroke(components, inkRanges[i]);
            this.drawStrokes(extractedStrokes, context, params);
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
    AnalyzerRenderer.prototype.drawShapePrimitive = function (primitive, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        if (primitive instanceof scope.ShapeEllipse) {
            this.drawShapeEllipse(primitive, context, params);
        } else if (primitive instanceof scope.ShapeLine) {
            this.drawShapeLine(primitive, context, params);
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
    AnalyzerRenderer.prototype.drawShapeLine = function (shapeLine, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        this.drawLineByPoints(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, params);
        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, params);
        }
        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, params);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
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
    AnalyzerRenderer.prototype.drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

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
            context.fillStyle = params.getColor();
            context.strokeStyle = params.getColor();
            context.globalAlpha = params.getAlpha();
            context.lineWidth = 0.5 * params.getWidth();

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
    AnalyzerRenderer.prototype.drawShapeEllipse = function (shapeEllipse, context, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }

        var points = this.drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, params);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, params);
        }
        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            this.drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, params);
        }
    };

    /**
     * Get the bounding box of primitive
     *
     * @method getPrimitiveBoundingBox
     * @param {AbstractShapePrimitive} primitive
     * @returns {Rectangle} rectangle
     */
    AnalyzerRenderer.prototype.getPrimitiveBoundingBox = function (primitive) {
        var rectangle = null;
        if (primitive instanceof scope.ShapeEllipse) {
            rectangle = scope.MathUtils.getEllipseArcRect(primitive.getCenter(), primitive.getMaxRadius(), primitive.getMinRadius(), primitive.getOrientation(), primitive.getStartAngle(), primitive.getSweepAngle());
        } else if (primitive instanceof scope.ShapeLine) {
            rectangle = scope.MathUtils.getLineRect(primitive.getFirstPoint(), primitive.getLastPoint());
        }
        return rectangle;
    };

    // Export
    scope.AnalyzerRenderer = AnalyzerRenderer;
})(MyScript);