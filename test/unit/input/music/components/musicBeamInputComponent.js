'use strict';

describe('MusicBeamInputComponent: input/music/components/musicBeamInputComponent.js', function () {

    describe('Default construction', function () {

        var musicBeamInput;
        before(function (done) {
            musicBeamInput = new MyScript.MusicBeamInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicBeamInput).to.be.an('object');
            expect(musicBeamInput).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicBeamInput).to.be.an.instanceOf(MyScript.MusicBeamInputComponent);
            expect(musicBeamInput).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicBeamInput.getValue()).to.not.be.undefined;
            expect(musicBeamInput.getValue()).to.be.an.instanceOf(MyScript.MusicBeam);
        });

        it('Set value', function () {
            musicBeamInput.setValue(new MyScript.MusicBeam());
            expect(musicBeamInput.getValue()).not.to.be.undefined;
            expect(musicBeamInput.getValue()).to.be.an.instanceOf(MyScript.MusicBeam);
        });

    });

});