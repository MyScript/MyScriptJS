'use strict';

describe('MusicClef: output/music/musicClef.js', function () {

    describe('Default construction', function () {

        var musicClef;
        before(function (done) {
            musicClef = new MyScript.MusicClef();
            done();
        });

        it('Check initial state', function () {
            expect(musicClef).to.be.an('object');
            expect(musicClef).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicClef).to.be.an.instanceOf(MyScript.MusicClef);
        });

        it('Get y anchor', function () {
            expect(musicClef.getYAnchor()).to.equal(undefined);
        });

        it('Set y anchor', function () {
            musicClef.setYAnchor(0);
            expect(musicClef.getYAnchor()).to.equal(0);
        });

        it('Get line', function () {
            expect(musicClef.getLine()).to.equal(undefined);
        });

        it('Set line', function () {
            musicClef.setLine(1);
            expect(musicClef.getLine()).to.equal(1);
        });

        it('Get octave', function () {
            expect(musicClef.getOctave()).to.equal(0);
        });

        it('Set octave', function () {
            musicClef.setOctave(2);
            expect(musicClef.getOctave()).to.equal(2);
        });

        it('Get symbol', function () {
            expect(musicClef.getSymbol()).to.equal('G');
        });

        it('Set symbol', function () {
            musicClef.setSymbol('F');
            expect(musicClef.getSymbol()).to.equal('F');
        });

    });

});