'use strict';

describe('MathRenderer: rendering/mathRenderer.js', function () {

    describe('Default construction', function () {

        var mathRenderer;
        before(function (done) {
            mathRenderer = new MyScript.MathRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(mathRenderer).to.be.an('object');
            expect(mathRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(mathRenderer).to.be.an.instanceOf(MyScript.MathRenderer);
        });

    });

    describe('Workflow', function () {

        var mathRenderer, canvas, currentContext, finalContext;
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
            mathRenderer = new MyScript.MathRenderer();
            done();
        });

        it('Clear context', function () {
            expect(function () {
                mathRenderer.clear(currentContext, finalContext);
            }).to.not.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                mathRenderer.drawComponents([new MyScript.Stroke()], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                mathRenderer.drawComponents([new MyScript.Stroke()], finalContext, mathRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                mathRenderer.drawComponents([{test: 'test'}], finalContext);
            }).to.throw(Error);
            expect(function () {
                mathRenderer.drawComponents([{test: 'test'}], finalContext, mathRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                mathRenderer.drawRecognitionResult([], new MyScript.MathDocument(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                mathRenderer.drawRecognitionResult([], new MyScript.MathDocument(), finalContext, mathRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Remove scratch out', function () {
            var stroke1 = new MyScript.Stroke({
                x: [354, 355],
                y: [165, 165]
            });
            var stroke2 = new MyScript.Stroke({
                x: [371, 372, 373, 376],
                y: [114, 113, 112, 111]
            });
            var scratchOutResults = [new MyScript.MathScratchOut({
                erasedInkRanges: [{
                    component: 0,
                    firstItem: 0,
                    lastItem: 2
                }], inkRanges: [{component: 1, firstItem: 0, lastItem: 4}]
            })];
            expect(mathRenderer.removeScratchOut([stroke1, stroke2], scratchOutResults).length).to.equal(0);
        });

    });

});