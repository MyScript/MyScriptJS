'use strict';

describe('MusicDecorationInputComponent: input/music/components/musicDecorationInputComponent.js', function () {

    describe('Default construction', function () {

        var musicDecorationInput;
        before(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicDecorationInput).to.be.an('object');
            expect(musicDecorationInput).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicDecorationInput).to.be.an.instanceof(MyScript.MusicDecorationInputComponent);
            expect(musicDecorationInput).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicDecorationInput;
        beforeEach(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicDecorationInput.getValue()).to.not.be.undefined;
            expect(musicDecorationInput.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
        });

        it('value setter', function () {
            expect(musicDecorationInput.getValue()).to.not.be.undefined;
            expect(musicDecorationInput.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
            musicDecorationInput.setValue(new MyScript.MusicDecorationInput());
            expect(musicDecorationInput.getValue()).not.to.be.undefined;
            expect(musicDecorationInput.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
        });

    });

});