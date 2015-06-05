'use strict';

describe('MusicDecorationInput: input/music/components/musicDecorationInput.js', function () {

    describe('Default construction', function () {

        var musicDecorationInput;
        before(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInput();
            done();
        });

        it('check initial state', function () {
            expect(musicDecorationInput).to.be.an('object');
            expect(musicDecorationInput).to.be.an.instanceof(MyScript.MusicDecorationInput);
        });

    });

    describe('Accessors', function () {

        var musicDecorationInput;
        beforeEach(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInput();
            done();
        });

        it('MusicDecorationInput Symbol getter', function () {
            expect(musicDecorationInput.getSymbol()).to.be.undefined;
        });

        it('MusicDecorationInput Symbol setter', function () {
            expect(musicDecorationInput.getSymbol()).to.be.undefined;
            musicDecorationInput.setSymbol('STACCATISSIMO');
            expect(musicDecorationInput.getSymbol()).not.to.be.undefined;
            expect(musicDecorationInput.getSymbol()).to.be.equal('STACCATISSIMO');
        });

        it('MusicDecorationInput Placement getter', function () {
            expect(musicDecorationInput.getPlacement()).to.be.undefined;
        });

        it('MusicDecorationInput Placement setter', function () {
            expect(musicDecorationInput.getPlacement()).to.be.undefined;
            musicDecorationInput.setPlacement('BELOW');
            expect(musicDecorationInput.getPlacement()).not.to.be.undefined;
            expect(musicDecorationInput.getPlacement()).to.be.equal('BELOW');
        });

    });
});