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
        this.shapeRenderer = new scope.ShapeRenderer();
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
     * Get shape renderer
     *
     * @method getShapeRenderer
     * @returns {ShapeRenderer}
     */
    AnalyzerRenderer.prototype.getShapeRenderer = function () {
        return this.shapeRenderer;
    };

    /**
     * Set shape renderer
     *
     * @method setShapeRenderer
     * @param {ShapeRenderer} shapeRenderer
     */
    AnalyzerRenderer.prototype.setShapeRenderer = function (shapeRenderer) {
        this.shapeRenderer = shapeRenderer;
    };

    /**
     * Draw shape recognition result on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {AnalyzerDocument} recognitionResult
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawRecognitionResult = function (components, recognitionResult, context, parameters) {
        this.shapeRenderer.drawShapes(components, recognitionResult.getShapes(), context, parameters);
        this.drawTables(components, recognitionResult.getTables(), context, parameters);
        this.drawTextLines(components, recognitionResult.getTextLines(), context, parameters);
//        this.drawGroups(strokes, recognitionResult.getGroups(), context, parameters); // TODO: not implemented
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawComponents = function (components, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractShapePrimitive) {
                this.shapeRenderer.drawShapePrimitive(component, context, params);
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component, context, params); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw table
     *
     * @method drawTables
     * @param {AbstractComponent[]} components
     * @param {AnalyzerTable[]} tables
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTables = function (components, tables, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }
        for (var i in tables) {
            if (this.getShowBoundingBoxes()) {
                for (var j in tables[i].getCells()) {
                    this.drawCell(tables[i].getCells()[j], context, params);
                }
            }
            for (var k in tables[i].getLines()) {
                var data = tables[i].getLines()[k].getData();
                drawLine(data.getP1(), data.getP2(), context, params);
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
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawTextLines = function (components, textLines, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }

        for (var i in textLines) {
            var textLine = textLines[i];
            var data = textLine.getData();
            if (data) {
                if (this.getShowBoundingBoxes()) {
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
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawText = function (boundingBox, text, justificationType, textHeight, baseline, context, parameters) {
        var params = this.getPenParameters();
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
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawUnderline = function (boundingBox, underline, text, textHeight, baseline, context, parameters) {
        var params = this.getPenParameters();
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
        drawLine(new scope.Point({x: x1, y: baseline}), new scope.Point({x: x2, y: baseline}), context, params);
    };

    /**
     * Draw Groups
     *
     * @method drawGroups
     * @param {AbstractComponent[]} components
     * @param {AnalyzerGroup[]} groups
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawGroups = function (components, groups, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw a cell
     *
     * @method drawCell
     * @param {AnalyzerCell} cell
     * @param {Object} context
     * @param {PenParameters} [parameters]
     */
    AnalyzerRenderer.prototype.drawCell = function (cell, context, parameters) {
        var params = this.getPenParameters();
        if (parameters) {
            params = parameters;
        }
        if (cell.getData()) {
            this.drawRectangle(cell.getData().getBoundingBox(), context, params);
        }
    };

    /**
     * Draw a line on context
     *
     * @private
     * @method drawLine
     * @param {Point} p1
     * @param {Point} p2
     * @param {Object} context
     * @param {PenParameters} [parameters]
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

    // Export
    scope.AnalyzerRenderer = AnalyzerRenderer;
})(MyScript);