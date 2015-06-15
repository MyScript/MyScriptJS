'use strict';

describe('MusicClefInput: input/music/components/musicClefInput.js', function () {

    describe('Default construction', function () {

        var musicClefInput;
        before(function (done) {
            musicClefInput = new MyScript.MusicClefInput();
            done();
        });

        it('Check initial state', function () {
            expect(musicClefInput).to.be.an('object');
            expect(musicClefInput).to.be.an.instanceOf(MyScript.MusicClefInput);
        });

        it('Get Y', function () {
            expect(musicClefInput.getYAnchor()).to.be.undefined;
        });

        it('Set Y', function () {
            musicClefInput.setYAnchor(3.6);
            expect(musicClefInput.getYAnchor()).to.equal(3.6);
        });

        it('Get octave', function () {
            expect(musicClefInput.getOctave()).not.to.be.undefined;
            expect(musicClefInput.getOctave()).to.equal(0);
        });

        it('Set octave', function () {
            musicClefInput.setOctave(7);
            expect(musicClefInput.getOctave()).to.equal(7);
        });

        it('Get symbol', function () {
            expect(musicClefInput.getSymbol()).not.to.be.undefined;
            expect(musicClefInput.getSymbol()).to.equal('G');
        });

        it('Set symbol', function () {
            musicClefInput.setSymbol('G');
            expect(musicClefInput.getSymbol()).not.to.be.undefined;
            expect(musicClefInput.getSymbol()).to.equal('G');
        });

    });

});