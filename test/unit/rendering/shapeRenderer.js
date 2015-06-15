'use strict';

describe('ShapeRenderer: rendering/shapeRenderer.js', function () {

    describe('Default construction', function () {

        var shapeRenderer;
        before(function (done) {
            shapeRenderer = new MyScript.ShapeRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(shapeRenderer).to.be.an('object');
            expect(shapeRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(shapeRenderer).to.be.an.instanceOf(MyScript.ShapeRenderer);
        });

    });

    describe('Workflow', function () {

        var shapeRenderer, context;
        before(function (done) {
            context = document.createElement('canvas').getContext('2d');
            shapeRenderer = new MyScript.ShapeRenderer();
            shapeRenderer.getParameters().setShowBoundingBoxes(true);
            done();
        });

        it('Clear context', function () {
            shapeRenderer.clear(context);
        });

        it('Draw stroke', function () {
            shapeRenderer.drawComponents([new MyScript.Stroke()], context);
            shapeRenderer.drawComponents([new MyScript.Stroke()], context, shapeRenderer.getParameters());
        });

        it('Draw character', function () {
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.CharacterInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.CharacterInputComponent()], context, shapeRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw ellipse', function () {
            shapeRenderer.drawComponents([new MyScript.ShapeEllipse()], context);
            shapeRenderer.drawComponents([new MyScript.ShapeEllipse()], context, shapeRenderer.getParameters());
        });

        it('Draw shape line', function () {
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.ShapeLine()], context);
            }).to.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.ShapeLine()], context, shapeRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                shapeRenderer.drawComponents([{test: 'test'}], context);
            }).to.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([{test: 'test'}], context, shapeRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw shape recognized', function () {
            shapeRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), context);
            shapeRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), context, shapeRenderer.getParameters());
        });

        it('Draw shape not recognized', function () {
            shapeRenderer.drawShapeNotRecognized([], [], new MyScript.ShapeNotRecognized(), context);
            shapeRenderer.drawShapeNotRecognized([], [], new MyScript.ShapeNotRecognized(), context, shapeRenderer.getParameters());
        });

        it('Draw line by points', function () {
            shapeRenderer.drawLine(new MyScript.Point({x:1, y: 2}), new MyScript.Point({x:3, y: 4}), context);
            shapeRenderer.drawLine(new MyScript.Point({x:1, y: 2}), new MyScript.Point({x:3, y: 4}), context, shapeRenderer.getParameters());
        });

        it('Draw arrow head', function () {
            shapeRenderer.drawArrowHead(new MyScript.Point({x:1, y: 2}), -45, 10, context);
            shapeRenderer.drawArrowHead(new MyScript.Point({x:1, y: 2}), -45, 10, context, shapeRenderer.getParameters());
        });

        it('Draw recognition result', function () {
            shapeRenderer.drawRecognitionResult([], new MyScript.ShapeDocument(), context);
            shapeRenderer.drawRecognitionResult([], new MyScript.ShapeDocument(), context, shapeRenderer.getParameters());
        });

    });

});