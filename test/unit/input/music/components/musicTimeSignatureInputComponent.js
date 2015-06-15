'use strict';

describe('MusicTimeSignatureInputComponent: input/music/components/musicTimeSignatureInputComponent.js', function () {

    describe('Default construction', function () {

        var musicTimeSignatureInputComponent;
        before(function (done) {
            musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicTimeSignatureInputComponent).to.be.an('object');
            expect(musicTimeSignatureInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicTimeSignatureInputComponent).to.be.an.instanceOf(MyScript.MusicTimeSignatureInputComponent);
            expect(musicTimeSignatureInputComponent).to.have.ownProperty('type');
        });

        it('Get value', function () {
            expect(musicTimeSignatureInputComponent.getValue()).to.be.undefined;
        });

        it('Set value', function () {
            musicTimeSignatureInputComponent.setValue('ALLA_BREVE');
            expect(musicTimeSignatureInputComponent.getValue()).not.to.be.undefined;
            expect(musicTimeSignatureInputComponent.getValue()).to.equal('ALLA_BREVE');
        });

    });

});