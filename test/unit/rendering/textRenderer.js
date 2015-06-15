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

        var textRenderer, context;
        before(function (done) {
            context = document.createElement('canvas').getContext('2d');
            textRenderer = new MyScript.TextRenderer();
            done();
        });

        it('Clear context', function () {
            textRenderer.clear(context);
        });

        it('Draw stroke', function () {
            textRenderer.drawComponents([new MyScript.Stroke()], context);
            textRenderer.drawComponents([new MyScript.Stroke()], context, textRenderer.getParameters());
        });

        it('Draw character', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.CharacterInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([new MyScript.CharacterInputComponent()], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw char', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.CharInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([new MyScript.CharInputComponent()], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw string', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()], context);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}], context);
            }).to.throw(Error);
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw input units', function () {
            var inputUnit = new MyScript.TextInputUnit();
            inputUnit.setComponents([new MyScript.Stroke()]);
            textRenderer.drawInputUnits([inputUnit], context);
            textRenderer.drawInputUnits([inputUnit], context, textRenderer.getParameters());
        });

        it('Draw recognition result', function () {
            textRenderer.drawRecognitionResult([], new MyScript.TextDocument(), context);
            textRenderer.drawRecognitionResult([], new MyScript.TextDocument(), context, textRenderer.getParameters());
        });

    });

});