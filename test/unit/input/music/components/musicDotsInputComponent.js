'use strict';

describe('MusicDotsInputComponent: input/music/components/musicDotsInputComponent.js', function () {

    describe('Default construction', function () {

        var musicDotsInputComponent;
        before(function (done) {
            musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicDotsInputComponent).to.be.an('object');
            expect(musicDotsInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicDotsInputComponent).to.be.an.instanceof(MyScript.MusicDotsInputComponent);
            expect(musicDotsInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicDotsInputComponent;
        beforeEach(function (done) {
            musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicDotsInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicDotsInputComponent.getValue()).to.be.undefined;
            musicDotsInputComponent.setValue(594);
            expect(musicDotsInputComponent.getValue()).not.to.be.undefined;
            expect(musicDotsInputComponent.getValue()).to.be.equal(594);
        });

    });

});