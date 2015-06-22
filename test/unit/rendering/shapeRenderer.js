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

        var shapeRenderer, canvas, currentContext, finalContext;
        before(function (done) {
            canvas = document.createElement('canvas');
            currentContext = canvas.getContext('2d');
            canvas.id = 'current';
            canvas.style.width = 800;
            canvas.style.height = 600;
            canvas.style.zIndex = '2';
            canvas.style.position = 'absolute';
            canvas.width = 800;
            canvas.height = 600;

            canvas = document.createElement('canvas');
            finalContext = canvas.getContext('2d');
            canvas.id = 'final';
            canvas.style.width = 800;
            canvas.style.height = 600;
            canvas.style.zIndex = '2';
            canvas.style.position = 'absolute';
            canvas.width = 800;
            canvas.height = 600;
            shapeRenderer = new MyScript.ShapeRenderer();
            done();
        });

        it('Clear context', function () {
            expect(function () {
                shapeRenderer.clear(currentContext, finalContext);
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.Stroke()], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([new MyScript.Stroke()], finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw ellipse', function () {
            var shapeEllipse = new MyScript.ShapeEllipse({
                beginDecoration: 'ARROW_HEAD',
                beginTangentAngle: 0.8050692,
                center: {x: 484.5391, y: 267.50476},
                endDecoration: 'ARROW_HEAD',
                endTangentAngle: 0.8039634,
                maxRadius: 230.76974,
                minRadius: 122.8728,
                orientation: -0.056189466,
                startAngle: 2.9027889,
                sweepAngle: 3.1410782});
            expect(function () {
                shapeRenderer.drawComponents([shapeEllipse], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([shapeEllipse], finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw shape line', function () {
            var shapeLine = new MyScript.ShapeLine({
                firstPoint: {x:1, y: 2},
                lastPoint: {x:3, y: 4},
                beginDecoration: 'ARROW_HEAD',
                beginTangentAngle: 3.1415927,
                endDecoration: 'ARROW_HEAD',
                endTangentAngle: 0});
            expect(function () {
                shapeRenderer.drawComponents([shapeLine], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([shapeLine], finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                shapeRenderer.drawComponents([{test: 'test'}], finalContext);
            }).to.throw(Error);
            expect(function () {
                shapeRenderer.drawComponents([{test: 'test'}], finalContext, shapeRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw unknown shape primitive', function () {
            expect(function () {
                shapeRenderer.drawShapePrimitive({test: 'test'}, finalContext);
            }).to.throw(Error);
            expect(function () {
                shapeRenderer.drawShapePrimitive({test: 'test'}, finalContext, shapeRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw shapes', function () {
            var shapes = [
                new MyScript.ShapeSegment({
                    candidates: [new MyScript.ShapeRecognized()],
                    selectedCandidateIndex: 0
                }),
                new MyScript.ShapeSegment({
                    candidates: [new MyScript.ShapeNotRecognized()],
                    selectedCandidateIndex: 0
                }),
                new MyScript.ShapeSegment({
                    candidates: [{test: 'test'}],
                    selectedCandidateIndex: 0
                })];
            expect(function () {
                shapeRenderer.drawShapes([], shapes, finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawShapes([], shapes, finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw shape recognized', function () {
            expect(function () {
                shapeRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawShapeRecognized(new MyScript.ShapeRecognized(), finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw shape not recognized', function () {
            expect(function () {
                shapeRenderer.drawShapeNotRecognized([], [], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawShapeNotRecognized([], [], finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                shapeRenderer.drawRecognitionResult([], new MyScript.ShapeDocument(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                shapeRenderer.drawRecognitionResult([], new MyScript.ShapeDocument(), finalContext, shapeRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

    });

});