'use strict';

describe('MyScriptJS: rendering/musicRenderer.js', function () {

    it('MusicRenderer object exist', function () {
        expect(MyScript.MusicRenderer).to.exist;
        expect(MyScript.MusicRenderer).not.to.be.null;
        expect(MyScript.MusicRenderer).to.not.be.undefined;
    });

    it('MusicRenderer constructor', function () {
        var musicRenderer = new MyScript.MusicRenderer();
        expect(musicRenderer).to.be.an('object');
        expect(musicRenderer).to.be.an.instanceof(MyScript.AbstractRenderer);
        expect(musicRenderer).to.be.an.instanceof(MyScript.MusicRenderer);
    });

    it('MusicRenderer Draw Strokes By RecognitionResult', function () {
        var musicRenderer = new MyScript.MusicRenderer(),
            strokes = [new MyScript.Stroke()],
            recognitionResult = new MyScript.MusicDocument(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        musicRenderer.drawStrokesByRecognitionResult(strokes, recognitionResult, parameters, context);
    });

    it('MusicRenderer Remove Scratch Out Strokes', function () {
        var musicRenderer = new MyScript.MusicRenderer(),
            strokes = [new MyScript.Stroke()],
            scratchOutResults = [new MyScript.MusicScratchOut()];

        musicRenderer.removeScratchOutStrokes(strokes, scratchOutResults);
    });

    it('MusicRenderer Draw Staff', function () {
        var musicRenderer = new MyScript.MusicRenderer(),
            staff = new MyScript.MusicStaff(),
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        musicRenderer.drawStaff(staff, parameters, context);
    });

    it('MusicRenderer Draw Components', function () {
        var musicRenderer = new MyScript.MusicRenderer(),
            components = [new MyScript.AbstractComponent()],
            parameters = new MyScript.RenderingParameters(),
            context = document.createElement('canvas').getContext('2d');

        musicRenderer.drawComponents(components, parameters, context);
    });
});