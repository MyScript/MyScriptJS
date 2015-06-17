'use strict';

describe('MusicBarInputComponent: input/music/components/musicBarInputComponent.js', function () {

    describe('Default construction', function () {

        var musicBarInput;
        before(function (done) {
            musicBarInput = new MyScript.MusicBarInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicBarInput).to.be.an('object');
            expect(musicBarInput).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicBarInput).to.be.an.instanceOf(MyScript.MusicBarInputComponent);
            expect(musicBarInput).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicBarInput.getValue()).to.not.be.undefined;
            expect(musicBarInput.getValue()).to.be.an.instanceOf(MyScript.MusicBar);
        });

        it('Set value', function () {
            musicBarInput.setValue(new MyScript.MusicBar());
            expect(musicBarInput.getValue()).not.to.be.undefined;
            expect(musicBarInput.getValue()).to.be.an.instanceOf(MyScript.MusicBar);
        });

    });

});