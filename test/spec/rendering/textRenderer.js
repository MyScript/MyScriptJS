'use strict';

describe('MyScriptJS: rendering/textRenderer.js', function () {

    it('TextRenderer object exist', function () {
        expect(MyScript.TextRenderer).to.exist;
        expect(MyScript.TextRenderer).not.to.be.null;
        expect(MyScript.TextRenderer).to.not.be.undefined;
    });

    it('TextRenderer constructor', function () {
        var textRenderer = new MyScript.TextRenderer();
        expect(textRenderer).to.be.an('object');
        expect(textRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(textRenderer).to.be.an.instanceof(MyScript.TextRenderer);
        expect(textRenderer).to.have.ownProperty('cloneStrokes');
        expect(textRenderer).to.have.ownProperty('strokesToRemove');
    });

    it('TextRenderer Draw Strokes By RecognitionResult', function () {
        var textRenderer = new MyScript.TextRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.TextDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        textRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });

    it('TextRenderer Draw Input Units', function () {
        var textRenderer = new MyScript.TextRenderer(),
            inputUnits = [new MyScript.TextInputUnit()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        textRenderer.drawInputUnits(inputUnits, parameters, context);
    });

    it('TextRenderer Draw Components', function () {
        var textRenderer = new MyScript.TextRenderer(),
            components = [new MyScript.AbstractTextInputComponent()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        textRenderer.drawComponents(components, parameters, context);
    });
});