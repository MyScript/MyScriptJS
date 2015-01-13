'use strict';

describe('MyScriptJS: rendering/abstractRenderer.js', function () {

    it('AbstractRenderer object exist', function () {
        expect(MyScript.AbstractRenderer).to.exist;
        expect(MyScript.AbstractRenderer).not.to.be.null;
        expect(MyScript.AbstractRenderer).to.not.be.undefined;
    });

    it('AbstractRenderer constructor', function () {
        var abstractRenderer = new MyScript.AbstractRenderer();
        expect(abstractRenderer).to.be.an('object');
        expect(abstractRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(abstractRenderer).to.have.ownProperty('points');
        expect(abstractRenderer).to.have.ownProperty('drawing');
    });

    it('AbstractRenderer Draw Strokes By RecognitionResult', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        expect(function(){abstractRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context)}).to.throw('not implemented');
    });

    it('AbstractRenderer Draw Components', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            components = [new MyScript.AbstractComponent()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawComponents(components, parameters, context);
    });

    it('AbstractRenderer Draw Start', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            eventDown = document.createEvent('MouseEvents');

        eventDown.initMouseEvent('CanvasMouseDownEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);

        abstractRenderer.drawStart(eventDown, 325, 254);
    });

    it('AbstractRenderer Draw Continue', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d'),
            eventDown = document.createEvent('MouseEvents'),
            eventMove = document.createEvent('MouseEvents');

        eventDown.initMouseEvent('CanvasMouseDownEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);
        eventDown.initMouseEvent('CanvasMouseMoveEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);

        abstractRenderer.drawStart(eventDown, 325, 254);
        abstractRenderer.drawContinue(eventMove, 326, 255, parameters, context);
    });

    it('AbstractRenderer Draw End', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d'),
            eventDown = document.createEvent('MouseEvents'),
            eventMove = document.createEvent('MouseEvents'),
            eventUp = document.createEvent('MouseEvents');

        eventDown.initMouseEvent('CanvasMouseDownEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);
        eventDown.initMouseEvent('CanvasMouseMoveEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);
        eventDown.initMouseEvent('CanvasMouseUpEvent', true, true,window, 1, 0, 0, 0, 0, false,false, false, false, 1, null);

        abstractRenderer.drawStart(eventDown, 325, 254);
        abstractRenderer.drawContinue(eventMove, 326, 255, parameters, context);
        abstractRenderer.drawEnd(eventUp, 326, 255, parameters, context);
    });


    it('AbstractRenderer Clear', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.clear(context);
    });

    it('AbstractRenderer Draw Guidelines', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            horizontalSpacing = 100,
            verticalSpacing = 100,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawGuidelines(horizontalSpacing, verticalSpacing, parameters, context);
    });

    it('AbstractRenderer Draw Line By Coordinates', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            lX = 100,
            lY = 100,
            cX = 100,
            cY = 100,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawLineByCoordinates(lX, lY, cX, cY, parameters, context);
    });

    it('AbstractRenderer Draw Line By Points', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            firstPoint = new MyScript.QuadraticPoint({x:2,y:6}),
            lastPoint = new MyScript.QuadraticPoint({x:154,y:241}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawLineByPoints(firstPoint, lastPoint, parameters, context);
    });

    it('AbstractRenderer Draw Rectangle', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            rectangle = new MyScript.Rectangle({x:2,y:6, width:100, height:200}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawRectangle(rectangle, parameters, context);
    });

    it('AbstractRenderer Draw Strokes', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            strokes = [new MyScript.Stroke()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawStrokes(strokes, parameters, context);
    });

    it('AbstractRenderer Draw Stroke', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            stroke = new MyScript.Stroke(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawStroke(stroke, parameters, context);
    });

    it('AbstractRenderer Draw Point', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            point = new MyScript.QuadraticPoint({x:154,y:241}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawPoint(point, parameters, context);
    });

    it('AbstractRenderer Draw Arrow Head', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            headPoint = new MyScript.QuadraticPoint({x:154,y:241}),
            angle = 45,
            length = 100,
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawArrowHead(headPoint, angle, length, parameters, context);
    });

    it('AbstractRenderer Extract Stroke', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            stroke1 = new MyScript.Stroke(),
            stroke2 = new MyScript.Stroke(),
            stroke3 = new MyScript.Stroke(),
            stroke4 = new MyScript.Stroke(),
            inkRange = new MyScript.ShapeInkRange(),
            strokes = [];

        strokes.push(stroke1);
        strokes.push(stroke2);
        strokes.push(stroke3);
        strokes.push(stroke4);


        abstractRenderer.extractStroke(strokes, inkRange);
    });

    it('AbstractRenderer Draw Quadratric Start', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            p1 = new MyScript.QuadraticPoint({x:154,y:241}),
            p2 = new MyScript.QuadraticPoint({x:155,y:241}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawQuadratricStart(p1, p2, parameters, context);
    });


    it('AbstractRenderer Draw Quadratric Continue', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            p1 = new MyScript.QuadraticPoint({x:154,y:241}),
            p2 = new MyScript.QuadraticPoint({x:155,y:241}),
            p3 = new MyScript.QuadraticPoint({x:156,y:241}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawQuadratricContinue(p1, p2, p3, parameters, context);
    });

    it('AbstractRenderer Draw Quadratric End', function () {
        var abstractRenderer = new MyScript.AbstractRenderer(),
            p1 = new MyScript.QuadraticPoint({x:154,y:241}),
            p2 = new MyScript.QuadraticPoint({x:155,y:241}),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        abstractRenderer.drawQuadratricEnd(p1, p2, parameters, context);
    });
});