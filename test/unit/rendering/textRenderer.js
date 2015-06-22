'use strict';

describe('TextRenderer: rendering/textRenderer.js', function () {

    describe('Default construction', function () {

        var textRenderer;
        before(function (done) {
            textRenderer = new MyScript.TextRenderer();
            done();
        });

        it('Check initial state', function () {
            expect(textRenderer).to.be.an('object');
            expect(textRenderer).to.be.an.instanceOf(MyScript.AbstractRenderer);
            expect(textRenderer).to.be.an.instanceOf(MyScript.TextRenderer);
        });

    });

    describe('Workflow', function () {

        var textRenderer, canvas, currentContext, finalContext;
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
            textRenderer = new MyScript.TextRenderer();
            done();
        });

        it('Clear context', function () {
            expect(function () {
                textRenderer.clear(currentContext, finalContext);
            }).to.not.throw(Error);
        });

        it('Draw string', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()], finalContext);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()], finalContext, textRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.Stroke()], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                textRenderer.drawComponents([new MyScript.Stroke()], finalContext, textRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}], finalContext);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}], finalContext, textRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw char', function () {
            expect(function () {
                textRenderer.drawTextComponent(new MyScript.CharInputComponent(), finalContext);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawTextComponent(new MyScript.CharInputComponent(), finalContext, textRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw unknown text component', function () {
            expect(function () {
                textRenderer.drawTextComponent({test: 'test'}, finalContext);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawTextComponent({test: 'test'}, finalContext, textRenderer.getPenParameters());
            }).to.throw(Error);
        });

        it('Draw input units', function () {
            var inputUnit = new MyScript.TextInputUnit();
            inputUnit.setComponents([new MyScript.Stroke()]);
            expect(function () {
                textRenderer.drawInputUnits([inputUnit], finalContext);
            }).to.not.throw(Error);
            expect(function () {
                textRenderer.drawInputUnits([inputUnit], finalContext, textRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                textRenderer.drawRecognitionResult([], new MyScript.TextDocument(), finalContext);
            }).to.not.throw(Error);
            expect(function () {
                textRenderer.drawRecognitionResult([], new MyScript.TextDocument(), finalContext, textRenderer.getPenParameters());
            }).to.not.throw(Error);
        });

    });

});