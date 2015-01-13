'use strict';

describe('MyScriptJS: rendering/analyzerRenderer.js', function () {

    it('AnalyzerRenderer object exist', function () {
        expect(MyScript.AnalyzerRenderer).to.exist;
        expect(MyScript.AnalyzerRenderer).not.to.be.null;
        expect(MyScript.AnalyzerRenderer).to.not.be.undefined;
    });

    it('AnalyzerRenderer constructor', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer();
        expect(analyzerRenderer).to.be.an('object');
        expect(analyzerRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(analyzerRenderer).to.be.an.instanceof(MyScript.AnalyzerRenderer);
    });

    it('AnalyzerRenderer Draw Strokes By RecognitionResult', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.AnalyzerDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });


    it('AnalyzerRenderer Draw Tables', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            tables = [new MyScript.AnalyzerTable()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawTables(strokes, tables, parameters, context);
    });

    it('AnalyzerRenderer Draw Text Lines', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            textLines = [new MyScript.AnalyzerTextLine()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawTextLines(strokes, textLines, parameters, context);
    });

    it('AnalyzerRenderer Draw Text', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            boundingBox = new MyScript.Rectangle(),
            text = '',
            justificationType = '',
            textHeight = 100,
            baseline = 14,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawText(boundingBox, text, justificationType, textHeight, baseline, parameters, context);
    });

    it('AnalyzerRenderer Draw Under Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            boundingBox = new MyScript.Rectangle(),
            text = '',
            underline = new MyScript.AnalyzerUnderline(),
            baseline = 14,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawUnderline(boundingBox, underline, text, baseline, parameters, context);
    });

    it('AnalyzerRenderer Draw Groups', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            groups = [new MyScript.AnalyzerGroup()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        expect(function(){analyzerRenderer.drawGroups(strokes, groups, parameters, context)}).to.throw('not implemented');
    });

    it('AnalyzerRenderer Draw Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            line = new MyScript.AnalyzerLine(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawLine(line, parameters, context);
    });

    it('AnalyzerRenderer Draw Cell', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            cell = new MyScript.AnalyzerCell(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawLine(cell, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            shapes = [new MyScript.ShapeSegment()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapes(strokes, shapes, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes Recognized', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeRecognized = new MyScript.ShapeRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeRecognized(shapeRecognized, parameters, context);
    });

    it('AnalyzerRenderer Draw Shapes Not Recognized', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            strokes = [new MyScript.Stroke()],
            inkRanges = [new MyScript.AnalyzerInkRange()],
            shapeNotRecognized = new MyScript.ShapeNotRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeNotRecognized(strokes, inkRanges, shapeNotRecognized, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Primitive', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            primitive = new MyScript.AbstractShapePrimitive(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapePrimitive(primitive, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Line', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeLine = new MyScript.ShapeLine(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeLine(shapeLine, parameters, context);
    });

    it('AnalyzerRenderer Draw Ellipse Arc', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeLine = new MyScript.ShapeLine(),
            centerPoint = shapeLine.getCenter(),
            maxRadius = shapeLine.getMaxRadius(),
            minRadius = shapeLine.getMinRadius(),
            orientation = shapeLine.getOrientation(),
            startAngle = shapeLine.getStartAngle(),
            sweepAngle = shapeLine.getSweepAngle(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context);
    });

    it('AnalyzerRenderer Draw Shape Ellipse', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        analyzerRenderer.drawShapeEllipse(shapeEllipse, parameters, context);
    });

    it('AnalyzerRenderer Primitive Bounding Box', function () {
        var analyzerRenderer = new MyScript.AnalyzerRenderer(),
            primitive = new MyScript.AbstractShapePrimitive();

        analyzerRenderer.getPrimitiveBoundingBox(primitive);
    });
});