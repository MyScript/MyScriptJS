'use strict';

describe('MyScriptJS: input/music/musicRecognitionInput.js', function () {

    var expect = require('chai').expect;

    it('MusicRecognitionInput object exist', function () {
        expect(MyScript.MusicRecognitionInput).to.exist;
        expect(MyScript.MusicRecognitionInput).not.to.be.null;
        expect(MyScript.MusicRecognitionInput).to.not.be.undefined;
    });

    it('MusicRecognitionInput constructor', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput).to.be.an('object');
        expect(musicRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
        expect(musicRecognitionInput).to.be.an.instanceof(MyScript.MusicRecognitionInput);
    });

    it('MusicRecognitionInput components getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getComponents()).to.be.undefined;
    });

    it('MusicRecognitionInput components setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getComponents()).to.be.undefined;
        musicRecognitionInput.setComponents(new MyScript.AbstractComponent());
        expect(musicRecognitionInput.getComponents()).not.to.be.undefined;
    });

    it('MusicRecognitionInput result types getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getResultTypes()).to.be.empty;
    });

    it('MusicRecognitionInput result types setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getResultTypes()).to.be.undefined;

        musicRecognitionInput.setResultTypes(['MUSICXML', 'ScoreTree']);
        expect(musicRecognitionInput.getResultTypes().length).to.equal(2);
        expect(musicRecognitionInput.getResultTypes()[0]).to.equal('MUSICXML');
        expect(musicRecognitionInput.getResultTypes()[1]).to.equal('ScoreTree');

    });

    it('MusicRecognitionInput user resources getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getUserResources()).to.be.empty;
    });

    it('MusicRecognitionInput user resources setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getUserResources()).to.be.undefined;

        musicRecognitionInput.setUserResources(['music-ak', 'music-grm-standard']);
        expect(musicRecognitionInput.getUserResources().length).to.equal(2);
        expect(musicRecognitionInput.getUserResources()[0]).to.equal('music-ak');
        expect(musicRecognitionInput.getUserResources()[1]).to.equal('music-grm-standard');
    });

    it('MusicRecognitionInput ScratchOut Detection Sensitivity getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.be.empty;
    });

    it('MusicRecognitionInput ScratchOut Detection Sensitivity setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.be.undefined;
        musicRecognitionInput.setScratchOutDetectionSensitivity(15);
        expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
        expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
    });

    it('MusicRecognitionInput Staff getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getStaff()).to.be.empty;
    });

    it('MusicRecognitionInput Staff setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getStaff()).to.be.undefined;
        musicRecognitionInput.setStaff(new MyScript.MusicStaff());
        expect(musicRecognitionInput.getStaff()).not.to.be.undefined;
    });

    it('MusicRecognitionInput Divisions getter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getDivisions()).to.be.empty;
    });

    it('MusicRecognitionInput Divisions setter', function () {
        var musicRecognitionInput = new MyScript.MusicRecognitionInput();
        expect(musicRecognitionInput.getDivisions()).to.be.undefined;
        musicRecognitionInput.setDivisions(480);
        expect(musicRecognitionInput.getDivisions()).not.to.be.undefined;
        expect(musicRecognitionInput.getDivisions()).to.equal(480);
    });

});