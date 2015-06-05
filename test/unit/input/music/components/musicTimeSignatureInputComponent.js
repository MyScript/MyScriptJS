'use strict';

describe('MusicTimeSignatureInputComponent: input/music/components/musicTimeSignatureInputComponent.js', function () {

    describe('Default construction', function () {

        var musicTimeSignatureInputComponent;
        before(function (done) {
            musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicTimeSignatureInputComponent).to.be.an('object');
            expect(musicTimeSignatureInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicTimeSignatureInputComponent).to.be.an.instanceof(MyScript.MusicTimeSignatureInputComponent);
            expect(musicTimeSignatureInputComponent).to.have.ownProperty('type');
        });

    });

    describe('Accessors', function () {

        var musicTimeSignatureInputComponent;
        beforeEach(function (done) {
            musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
            done();
        });

        it('value getter', function () {
            expect(musicTimeSignatureInputComponent.getValue()).to.be.undefined;
        });

        it('value setter', function () {
            expect(musicTimeSignatureInputComponent.getValue()).to.be.undefined;
            musicTimeSignatureInputComponent.setValue('ALLA_BREVE');
            expect(musicTimeSignatureInputComponent.getValue()).not.to.be.undefined;
            expect(musicTimeSignatureInputComponent.getValue()).to.be.equal('ALLA_BREVE');
        });

    });

});