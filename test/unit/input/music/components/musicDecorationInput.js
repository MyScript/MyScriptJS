'use strict';

describe('MusicDecorationInput: input/music/components/musicDecorationInput.js', function () {

    describe('Default construction', function () {

        var musicDecorationInput;
        before(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInput();
            done();
        });

        it('Check initial state', function () {
            expect(musicDecorationInput).to.be.an('object');
            expect(musicDecorationInput).to.be.an.instanceOf(MyScript.MusicDecorationInput);
        });

        it('Get symbol', function () {
            expect(musicDecorationInput.getSymbol()).to.be.undefined;
        });

        it('Set symbol', function () {
            musicDecorationInput.setSymbol('STACCATISSIMO');
            expect(musicDecorationInput.getSymbol()).not.to.be.undefined;
            expect(musicDecorationInput.getSymbol()).to.equal('STACCATISSIMO');
        });

        it('Get placement', function () {
            expect(musicDecorationInput.getPlacement()).to.be.undefined;
        });

        it('Set placement', function () {
            musicDecorationInput.setPlacement('BELOW');
            expect(musicDecorationInput.getPlacement()).not.to.be.undefined;
            expect(musicDecorationInput.getPlacement()).to.equal('BELOW');
        });

    });

});