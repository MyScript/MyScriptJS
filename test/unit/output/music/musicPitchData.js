'use strict';

describe('MusicPitchData: output/music/musicPitchData.js', function () {

    describe('Default construction', function () {

        var musicPitchData;
        before(function (done) {
            musicPitchData = new MyScript.MusicPitchData();
            done();
        });

        it('Check initial state', function () {
            expect(musicPitchData).to.be.an('object');
            expect(musicPitchData).to.be.an.instanceOf(MyScript.MusicPitchData);
        });

        it('Alteration getter', function () {
            expect(musicPitchData.getAlteration()).to.be.undefined;
        });

        it('Octave getter', function () {
            expect(musicPitchData.getOctave()).to.be.undefined;
        });

        it('Step getter', function () {
            expect(musicPitchData.getStep()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicPitchData;
        before(function (done) {
            musicPitchData = new MyScript.MusicPitchData({
                alteration: 'alteration',
                octave: 'octave',
                step: 'step'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicPitchData).to.be.an('object');
            expect(musicPitchData).to.be.an.instanceOf(MyScript.MusicPitchData);
        });

        it('Test MusicKeySignatureData object construction', function () {
            expect(musicPitchData.getAlteration()).to.not.be.undefined;
            expect(musicPitchData.getOctave()).to.not.be.undefined;
            expect(musicPitchData.getStep()).to.not.be.undefined;
        });

    });

});