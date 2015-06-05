'use strict';

describe('MusicBarInputComponent: input/music/components/musicBarInputComponent.js', function () {

    describe('Default construction', function () {

        var musicBarInput;
        before(function (done) {
            musicBarInput = new MyScript.MusicBarInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicBarInput).to.be.an('object');
            expect(musicBarInput).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicBarInput).to.be.an.instanceof(MyScript.MusicBarInputComponent);
            expect(musicBarInput).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicBarInput;
        beforeEach(function (done) {
            musicBarInput = new MyScript.MusicBarInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicBarInput.getValue()).to.not.be.undefined;
            expect(musicBarInput.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
        });

        it('value setter', function () {
            expect(musicBarInput.getValue()).to.not.be.undefined;
            expect(musicBarInput.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
            musicBarInput.setValue(new MyScript.MusicBarInput());
            expect(musicBarInput.getValue()).not.to.be.undefined;
            expect(musicBarInput.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
        });

    });

});