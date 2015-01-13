'use strict';

describe('MyScriptJS: rendering/mathRenderer.js', function () {

    it('MathRenderer object exist', function () {
        expect(MyScript.MathRenderer).to.exist;
        expect(MyScript.MathRenderer).not.to.be.null;
        expect(MyScript.MathRenderer).to.not.be.undefined;
    });

    it('MathRenderer constructor', function () {
        var mathRenderer = new MyScript.MathRenderer();
        expect(mathRenderer).to.be.an('object');
        expect(mathRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(mathRenderer).to.be.an.instanceof(MyScript.MathRenderer);
        expect(mathRenderer).to.have.ownProperty('cloneStrokes');
        expect(mathRenderer).to.have.ownProperty('strokesToRemove');
    });

    it('MathRenderer Draw Strokes By RecognitionResult', function () {
        var mathRenderer = new MyScript.MathRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.MathDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        mathRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });

    it('MathRenderer Remove Scratch Out Strokes', function () {
        var mathRenderer = new MyScript.MathRenderer(),
            strokes = [new MyScript.Stroke()],
            mathScratchOutResults = [new MyScript.MathScratchOut()];

        mathRenderer.removeScratchOutStrokes(strokes, mathScratchOutResults);
    });
});