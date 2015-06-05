'use strict';

describe('MusicClefInputComponent: input/music/components/musicClefInputComponent.js', function () {

    describe('Default construction', function () {

        var musicClefInput;
        before(function (done) {
            musicClefInput = new MyScript.MusicClefInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicClefInput).to.be.an('object');
            expect(musicClefInput).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicClefInput).to.be.an.instanceof(MyScript.MusicClefInputComponent);
            expect(musicClefInput).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicClefInput;
        beforeEach(function (done) {
            musicClefInput = new MyScript.MusicClefInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicClefInput.getValue()).to.not.be.undefined;
            expect(musicClefInput.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
        });

        it('value setter', function () {
            expect(musicClefInput.getValue()).to.not.be.undefined;
            expect(musicClefInput.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
            musicClefInput.setValue(new MyScript.MusicClefInput());
            expect(musicClefInput.getValue()).not.to.be.undefined;
            expect(musicClefInput.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
        });

    });

});