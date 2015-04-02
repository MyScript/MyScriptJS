'use strict';

describe('MyScriptJS: output/music/musicPitchData.js', function () {

    it('MusicPitchData object exist', function () {
        expect(MyScript.MusicPitchData).to.exist;
        expect(MyScript.MusicPitchData).not.to.be.null;
        expect(MyScript.MusicPitchData).to.not.be.undefined;
    });

    var musicPitchData = new MyScript.MusicPitchData();
    it('MusicPitchData constructor', function () {
        expect(musicPitchData).to.be.an('object');
        expect(musicPitchData).to.be.an.instanceof(MyScript.MusicPitchData);
    });

    it('MusicPitchData Alteration getter', function () {
        expect(musicPitchData.getAlteration()).to.be.undefined;
    });

    it('MusicPitchData Octave getter', function () {
        expect(musicPitchData.getOctave()).to.be.undefined;
    });

    it('MusicPitchData Step getter', function () {
        expect(musicPitchData.getStep()).to.be.undefined;
    });

    var obj = {
        alteration: 'alteration',
        octave: 'octave',
        step: 'step'
    };
    var musicPitchData2 = new MyScript.MusicPitchData(obj);
    it('Test MusicKeySignatureData object construction', function () {
        expect(musicPitchData2.getAlteration()).to.not.be.undefined;
        expect(musicPitchData2.getOctave()).to.not.be.undefined;
        expect(musicPitchData2.getStep()).to.not.be.undefined;
    });

});