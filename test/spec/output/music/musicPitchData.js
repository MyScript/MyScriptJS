'use strict';

describe('MyScriptJS: output/music/musicPitchData.js', function () {

    var expect = require('chai').expect;

    it('MusicPitchData object exist', function () {
        expect(MyScript.MusicPitchData).to.exist;
        expect(MyScript.MusicPitchData).not.to.be.null;
        expect(MyScript.MusicPitchData).to.not.be.undefined;
    });

    it('MusicPitchData constructor', function () {
        var musicPitchData = new MyScript.MusicPitchData();
        expect(musicPitchData).to.be.an('object');
        expect(musicPitchData).to.be.an.instanceof(MyScript.MusicPitchData);
    });

    it('MusicPitchData Alteration getter', function () {
        var musicPitchData = new MyScript.MusicPitchData();
        expect(musicPitchData.getAlteration()).to.be.undefined;
    });

    it('MusicPitchData Octave getter', function () {
        var musicPitchData = new MyScript.MusicPitchData();
        expect(musicPitchData.getOctave()).to.be.undefined;
    });

    it('MusicPitchData Step getter', function () {
        var musicPitchData = new MyScript.MusicPitchData();
        expect(musicPitchData.getStep()).to.be.undefined;
    });

});