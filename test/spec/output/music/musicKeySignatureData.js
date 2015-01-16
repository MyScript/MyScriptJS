'use strict';

describe('MyScriptJS: output/music/musicKeySignatureData.js', function () {

    var expect = require('chai').expect;

    it('MusicKeySignatureData object exist', function () {
        expect(MyScript.MusicKeySignatureData).to.exist;
        expect(MyScript.MusicKeySignatureData).not.to.be.null;
        expect(MyScript.MusicKeySignatureData).to.not.be.undefined;
    });

    it('MusicKeySignatureData constructor', function () {
        var musicKeySignatureData = new MyScript.MusicKeySignatureData();
        expect(musicKeySignatureData).to.be.an('object');
        expect(musicKeySignatureData).to.be.an.instanceof(MyScript.MusicKeySignatureData);
    });

    it('MusicKeySignatureData Fifths getter', function () {
        var musicKeySignatureData = new MyScript.MusicKeySignatureData();
        expect(musicKeySignatureData.getFifths()).to.be.undefined;
    });

    it('MusicKeySignatureData Cancel getter', function () {
        var musicKeySignatureData = new MyScript.MusicKeySignatureData();
        expect(musicKeySignatureData.getCancel()).to.be.undefined;
    });
});