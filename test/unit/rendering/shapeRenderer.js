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

        shapeRenderer.drawRecognitionResult(strokes, recognitionResult, context, parameters);
    });

    it('ShapeRenderer Draw Components', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            shapeLine = new MyScript.ShapeLine({firstPoint: {x: 242.55331, y: 220.25092}, lastPoint: {x: 1020.905, y: 220.25092}}),
            components = [],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        components.push(shapeEllipse);
        components.push(shapeLine);

        shapeRenderer.drawComponents(components, context, parameters);
    });

    it('ShapeRenderer Draw Shapes', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            strokes = [new MyScript.Stroke()],
            shapes = [new MyScript.ShapeSegment()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapes(strokes, shapes, context, parameters);
    });

    it('ShapeRenderer Draw Shapes Recognized', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeRecognized = new MyScript.ShapeRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeRecognized(shapeRecognized, context, parameters);
    });

    it('ShapeRenderer Draw Shapes Not Recognized', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            strokes = [new MyScript.Stroke()],
            inkRanges = [new MyScript.ShapeInkRange()],
            shapeNotRecognized = new MyScript.ShapeNotRecognized(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeNotRecognized(strokes, inkRanges, shapeNotRecognized, context, parameters);
    });

    it('ShapeRenderer Draw Shape Primitive', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            primitive = new MyScript.AbstractShapePrimitive(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapePrimitive(primitive, context, parameters);
    });

    it('ShapeRenderer Draw Shape Line', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeLine = new MyScript.ShapeLine({firstPoint: {x: 242.55331, y: 220.25092}, lastPoint: {x: 1020.905, y: 220.25092}}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeLine(shapeLine, context, parameters);
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

        shapeRenderer.drawEllipseArc(centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters);
    });

    it('ShapeRenderer Draw Shape Ellipse', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            shapeEllipse = new MyScript.ShapeEllipse(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        shapeRenderer.drawShapeEllipse(shapeEllipse, context, parameters);
    });

    it('ShapeRenderer Primitive Bounding Box', function () {
        var shapeRenderer = new MyScript.ShapeRenderer(),
            primitive = new MyScript.ShapeLine({firstPoint: {x: 242.55331, y: 220.25092}, lastPoint: {x: 1020.905, y: 220.25092}});

        expect(shapeRenderer.getPrimitiveBoundingBox(primitive)).to.deep.equal(new MyScript.Rectangle({x:242.55331,y:220.25092,height:0,width:778.35169}));
    });

});