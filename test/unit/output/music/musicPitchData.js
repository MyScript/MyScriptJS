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

        it('Get alteration', function () {
            expect(musicPitchData.getAlteration()).to.equal(undefined);
        });

        it('Get octave', function () {
            expect(musicPitchData.getOctave()).to.equal(undefined);
        });

        it('Get step', function () {
            expect(musicPitchData.getStep()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var musicPitchData;
        before(function (done) {
            musicPitchData = new MyScript.MusicPitchData({
                alteration: 0,
                octave: 1,
                step: 'step'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicPitchData).to.be.an('object');
            expect(musicPitchData).to.be.an.instanceOf(MyScript.MusicPitchData);
        });

        it('Get alteration', function () {
            expect(musicPitchData.getAlteration()).to.equal(0);
        });

        it('Get octave', function () {
            expect(musicPitchData.getOctave()).to.equal(1);
        });

        it('Get step', function () {
            expect(musicPitchData.getStep()).to.equal('step');
        });

    });

});