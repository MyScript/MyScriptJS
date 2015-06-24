'use strict';

describe('TextRenderer: rendering/textRenderer.js', function () {

    describe('Default construction', function () {

        var textRenderer;
        before(function (done) {
            var canvas = document.createElement('canvas');
            textRenderer = new MyScript.TextRenderer(canvas.getContext('2d'));
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
            var canvas = document.createElement('canvas');
            context = canvas.getContext('2d');
            textRenderer = new MyScript.TextRenderer(context);
            done();
        });

        it('Clear context', function () {
            expect(function () {
                textRenderer.clear();
            }).to.not.throw(Error);
        });

        it('Draw string', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()]);
            }).to.throw(Error);
        });

        it('Draw string (@deprecated)', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.StringInputComponent()], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw stroke', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.Stroke()]);
            }).to.not.throw(Error);
        });

        it('Draw stroke (@deprecated)', function () {
            expect(function () {
                textRenderer.drawComponents([new MyScript.Stroke()], context, textRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw unknown component', function () {
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}]);
            }).to.throw(Error);
        });

        it('Draw unknown component (@deprecated)', function () {
            expect(function () {
                textRenderer.drawComponents([{test: 'test'}], context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw char', function () {
            expect(function () {
                textRenderer.drawTextComponent(new MyScript.CharInputComponent());
            }).to.throw(Error);
        });

        it('Draw char (@deprecated)', function () {
            expect(function () {
                textRenderer.drawTextComponent(new MyScript.CharInputComponent(), context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw unknown text component', function () {
            expect(function () {
                textRenderer.drawTextComponent({test: 'test'});
            }).to.throw(Error);
        });

        it('Draw unknown text component (@deprecated)', function () {
            expect(function () {
                textRenderer.drawTextComponent({test: 'test'}, context, textRenderer.getParameters());
            }).to.throw(Error);
        });

        it('Draw input units', function () {
            var inputUnit = new MyScript.TextInputUnit();
            inputUnit.setComponents([new MyScript.Stroke()]);
            expect(function () {
                textRenderer.drawInputUnits([inputUnit]);
            }).to.not.throw(Error);
        });

        it('Draw input units (@deprecated)', function () {
            var inputUnit = new MyScript.TextInputUnit();
            inputUnit.setComponents([new MyScript.Stroke()]);
            expect(function () {
                textRenderer.drawInputUnits([inputUnit], context, textRenderer.getParameters());
            }).to.not.throw(Error);
        });

        it('Draw recognition result', function () {
            expect(function () {
                textRenderer.drawRecognitionResult([], new MyScript.TextDocument());
            }).to.not.throw(Error);
        });

        it('Draw recognition result (@deprecated)', function () {
            expect(function () {
                textRenderer.drawRecognitionResult([], new MyScript.TextDocument(), context, textRenderer.getParameters());
            }).to.not.throw(Error);
        });

    });

});