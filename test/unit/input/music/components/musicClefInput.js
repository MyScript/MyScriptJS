'use strict';

describe('MusicClefInput: input/music/components/musicClefInput.js', function () {

    describe('Default construction', function () {

        var musicClefInput;
        before(function (done) {
            musicClefInput = new MyScript.MusicClefInput();
            done();
        });

        it('check initial state', function () {
            expect(musicClefInput).to.be.an('object');
            expect(musicClefInput).to.be.an.instanceof(MyScript.MusicClefInput);
        });

    });

    describe('Accessors', function () {

        var musicClefInput;
        before(function (done) {
            musicClefInput = new MyScript.MusicClefInput();
            done();
        });

        it('Y Anchor getter', function () {
            expect(musicClefInput.getYAnchor()).to.be.undefined;
        });

        it('Y Anchor setter', function () {
            musicClefInput.setYAnchor(3.6);
            expect(musicClefInput.getYAnchor()).to.be.equal(3.6);
        });

        it('Octave getter', function () {
            expect(musicClefInput.getOctave()).not.to.be.undefined;
            expect(musicClefInput.getOctave()).to.be.equal(0);
        });

        it('Octave setter', function () {
            musicClefInput.setOctave(7);
            expect(musicClefInput.getOctave()).to.be.equal(7);
        });

        it('Symbol getter', function () {
            expect(musicClefInput.getSymbol()).not.to.be.undefined;
            expect(musicClefInput.getSymbol()).to.be.equal('G');
        });

        it('Symbol setter', function () {
            musicClefInput.setSymbol('G');
            expect(musicClefInput.getSymbol()).not.to.be.undefined;
            expect(musicClefInput.getSymbol()).to.be.equal('G');
        });

    });

});