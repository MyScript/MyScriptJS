'use strict';

describe('MusicDecorationInputComponent: input/music/components/musicDecorationInputComponent.js', function () {

    describe('Default construction', function () {

        var musicDecorationInput;
        before(function (done) {
            musicDecorationInput = new MyScript.MusicDecorationInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicDecorationInput).to.be.an('object');
            expect(musicDecorationInput).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicDecorationInput).to.be.an.instanceOf(MyScript.MusicDecorationInputComponent);
            expect(musicDecorationInput).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicDecorationInput.getValue()).to.not.be.undefined;
            expect(musicDecorationInput.getValue()).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Set value', function () {
            musicDecorationInput.setValue(new MyScript.MusicDecoration());
            expect(musicDecorationInput.getValue()).not.to.be.undefined;
            expect(musicDecorationInput.getValue()).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

    });

});