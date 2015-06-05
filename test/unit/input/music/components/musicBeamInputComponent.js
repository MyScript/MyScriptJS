'use strict';

describe('MusicBeamInputComponent: input/music/components/musicBeamInputComponent.js', function () {

    describe('Default construction', function () {

        var musicBeamInput;
        before(function (done) {
            musicBeamInput = new MyScript.MusicBeamInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicBeamInput).to.be.an('object');
            expect(musicBeamInput).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicBeamInput).to.be.an.instanceof(MyScript.MusicBeamInputComponent);
            expect(musicBeamInput).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicBeamInput;
        beforeEach(function (done) {
            musicBeamInput = new MyScript.MusicBeamInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicBeamInput.getValue()).to.not.be.undefined;
            expect(musicBeamInput.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
        });

        it('value setter', function () {
            expect(musicBeamInput.getValue()).to.not.be.undefined;
            expect(musicBeamInput.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
            musicBeamInput.setValue(new MyScript.MusicBeamInput());
            expect(musicBeamInput.getValue()).not.to.be.undefined;
            expect(musicBeamInput.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
        });

    });

});