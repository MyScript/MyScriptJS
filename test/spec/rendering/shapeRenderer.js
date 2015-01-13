'use strict';

describe('MyScriptJS: rendering/shapeRenderer.js', function () {

    it('ShapeRenderer object exist', function () {
        expect(MyScript.ShapeRenderer).to.exist;
        expect(MyScript.ShapeRenderer).not.to.be.null;
        expect(MyScript.ShapeRenderer).to.not.be.undefined;
    });

    it('ShapeRenderer constructor', function () {
        var shapeRenderer = new MyScript.ShapeRenderer();
        expect(shapeRenderer).to.be.an('object');
        expect(shapeRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(shapeRenderer).to.be.an.instanceof(MyScript.ShapeRenderer);
    });

    it('ShapeRenderer Draw Strokes By RecognitionResult', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.ShapeDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });

    it('ShapeRenderer Draw Components', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            shapeLine = new MyScript.ShapeLine(),
            components = [],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        components.push(shapeEllipse);
        components.push(shapeLine);

        shapeRenderer.drawComponents(components, parameters, context);
    });

    it('ShapeRenderer Draw Shapes', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            strokes = [new MyScript.Stroke()],
            shapes = [new MyScript.ShapeSegment()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapes(strokes, shapes, parameters, context);
    });

    it('ShapeRenderer Draw Shapes Recognized', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeRecognized = new MyScript.ShapeRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeRecognized(shapeRecognized, parameters, context);
    });

    it('ShapeRenderer Draw Shapes Not Recognized', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            strokes = [new MyScript.Stroke()],
            inkRanges = [new MyScript.ShapeInkRange()],
            shapeNotRecognized = new MyScript.ShapeNotRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeNotRecognized(strokes, inkRanges, shapeNotRecognized, parameters, context);
    });

    it('ShapeRenderer Draw Shape Primitive', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            primitive = new MyScript.AbstractShapePrimitive(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapePrimitive(primitive, parameters, context);
    });

    it('ShapeRenderer Draw Shape Line', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeLine = new MyScript.ShapeLine(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeLine(shapeLine, parameters, context);
    });

    it('ShapeRenderer Draw Ellipse Arc', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            centerPoint = shapeEllipse.getCenter(),
            maxRadius = shapeEllipse.getMaxRadius(),
            minRadius = shapeEllipse.getMinRadius(),
            orientation = shapeEllipse.getOrientation(),
            startAngle = shapeEllipse.getStartAngle(),
            sweepAngle = shapeEllipse.getSweepAngle(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, parameters, context);
    });

    it('ShapeRenderer Draw Shape Ellipse', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeEllipse(shapeEllipse, parameters, context);
    });

    it('ShapeRenderer Primitive Bounding Box', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            primitive = new MyScript.AbstractShapePrimitive();

        shapeRenderer.getPrimitiveBoundingBox(primitive);
    });

});