'use strict';

describe('MyScriptJS: input/music/components/musicBeamInput.js', function () {

    var expect = require('chai').expect;

    it('MusicBeamInput object exist', function () {
        expect(MyScript.MusicBeamInput).to.exist;
        expect(MyScript.MusicBeamInput).not.to.be.null;
        expect(MyScript.MusicBeamInput).to.not.be.undefined;
    });

    it('MusicBeamInput constructor', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput).to.be.an('object');
        expect(musicBeamInput).to.be.an.instanceof(MyScript.MusicBeamInput);
    });

    it('MusicBeamInput Placement getter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getPlacement()).to.be.undefined;
    });

    it('MusicBeamInput Placement setter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getPlacement()).to.be.undefined;
        musicBeamInput.setPlacement('ABOVE');
        expect(musicBeamInput.getPlacement()).not.to.be.undefined;
        expect(musicBeamInput.getPlacement()).to.be.equal('ABOVE');
    });

    it('MusicBeamInput Slope getter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getSlope()).to.be.undefined;
    });

    it('MusicBeamInput Slope setter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getSlope()).to.be.undefined;
        musicBeamInput.setSlope('HORIZONTAL');
        expect(musicBeamInput.getSlope()).not.to.be.undefined;
        expect(musicBeamInput.getSlope()).to.be.equal('HORIZONTAL');
    });

    it('MusicBeamInput left count getter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getLeftCount()).to.be.undefined;
    });

    it('MusicBeamInput left count setter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getLeftCount()).to.be.undefined;
        musicBeamInput.setLeftCount(6);
        expect(musicBeamInput.getLeftCount()).not.to.be.undefined;
        expect(musicBeamInput.getLeftCount()).to.be.equal(6);
    });

    it('MusicBeamInput right count getter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getRightCount()).to.be.undefined;
    });

    it('MusicBeamInput right count setter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getRightCount()).to.be.undefined;
        musicBeamInput.setRightCount(8);
        expect(musicBeamInput.getRightCount()).not.to.be.undefined;
        expect(musicBeamInput.getRightCount()).to.be.equal(8);
    });

    it('MusicBeamInput gap getter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getGap()).to.be.undefined;
    });

    it('MusicBeamInput gap setter', function () {
        var musicBeamInput = new MyScript.MusicBeamInput();
        expect(musicBeamInput.getGap()).to.be.undefined;
        musicBeamInput.setGap(8.6);
        expect(musicBeamInput.getGap()).not.to.be.undefined;
        expect(musicBeamInput.getGap()).to.be.equal(8.6);
    });
});