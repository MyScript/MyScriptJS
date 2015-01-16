'use strict';

describe('MyScriptJS: output/music/musicScratchOut.js', function () {

    var expect = require('chai').expect;

    it('MusicScratchOut object exist', function () {
        expect(MyScript.MusicScratchOut).to.exist;
        expect(MyScript.MusicScratchOut).not.to.be.null;
        expect(MyScript.MusicScratchOut).to.not.be.undefined;
    });

    it('MusicScratchOut constructor', function () {
        var musicScratchOut = new MyScript.MusicScratchOut();
        expect(musicScratchOut).to.be.an('object');
        expect(musicScratchOut).to.be.an.instanceof(MyScript.MusicScratchOut);
        expect(musicScratchOut).to.have.ownProperty('inputRanges');
        expect(musicScratchOut).to.have.ownProperty('erasedInputRanges');
    });

    it('MusicScratchOut Input Ranges getter', function () {
        var musicScratchOut = new MyScript.MusicScratchOut();
        expect(musicScratchOut.getInputRanges()).to.be.empty;
    });

    it('MusicScratchOut Erased Input Ranges getter', function () {
        var musicScratchOut = new MyScript.MusicScratchOut();
        expect(musicScratchOut.getErasedInputRanges()).to.be.empty;
    });

});