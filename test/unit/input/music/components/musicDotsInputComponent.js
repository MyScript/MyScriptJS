'use strict';

describe('MusicDotsInputComponent: input/music/components/musicDotsInputComponent.js', function () {

    describe('Default construction', function () {

        var musicDotsInputComponent;
        before(function (done) {
            musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicDotsInputComponent).to.be.an('object');
            expect(musicDotsInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicDotsInputComponent).to.be.an.instanceOf(MyScript.MusicDotsInputComponent);
            expect(musicDotsInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicDotsInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicDotsInputComponent.setValue(594);
            expect(musicDotsInputComponent.getValue()).not.to.be.undefined;
            expect(musicDotsInputComponent.getValue()).to.equal(594);
        });

    });

});