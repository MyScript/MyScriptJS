'use strict';

describe('MusicClefInputComponent: input/music/components/musicClefInputComponent.js', function () {

    describe('Default construction', function () {

        var musicClefInput;
        before(function (done) {
            musicClefInput = new MyScript.MusicClefInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicClefInput).to.be.an('object');
            expect(musicClefInput).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicClefInput).to.be.an.instanceOf(MyScript.MusicClefInputComponent);
            expect(musicClefInput).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicClefInput.getValue()).to.not.be.undefined;
            expect(musicClefInput.getValue()).to.be.an.instanceOf(MyScript.MusicClefInput);
        });

        it('Set value', function () {
            musicClefInput.setValue(new MyScript.MusicClefInput());
            expect(musicClefInput.getValue()).not.to.be.undefined;
            expect(musicClefInput.getValue()).to.be.an.instanceOf(MyScript.MusicClefInput);
        });

    });

});