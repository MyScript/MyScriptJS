'use strict';

describe('MyScriptJS: input/music/components/musicTimeSignatureInputComponent.js', function () {

    it('MusicTimeSignatureInputComponent object exist', function () {
        expect(MyScript.MusicTimeSignatureInputComponent).to.exist;
        expect(MyScript.MusicTimeSignatureInputComponent).not.to.be.null;
        expect(MyScript.MusicTimeSignatureInputComponent).to.not.be.undefined;
    });

    it('MusicTimeSignatureInputComponent constructor', function () {
        var musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
        expect(musicTimeSignatureInputComponent).to.be.an('object');
        expect(musicTimeSignatureInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicTimeSignatureInputComponent).to.be.an.instanceof(MyScript.MusicTimeSignatureInputComponent);
        expect(musicTimeSignatureInputComponent).to.have.ownProperty('type');
    });

    it('MusicTimeSignatureInputComponent value getter', function () {
        var musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
        expect(musicTimeSignatureInputComponent.getValue()).to.be.undefined;
    });

    it('MusicTimeSignatureInputComponent value setter', function () {
        var musicTimeSignatureInputComponent = new MyScript.MusicTimeSignatureInputComponent();
        expect(musicTimeSignatureInputComponent.getValue()).to.be.undefined;
        musicTimeSignatureInputComponent.setValue('ALLA_BREVE');
        expect(musicTimeSignatureInputComponent.getValue()).not.to.be.undefined;
        expect(musicTimeSignatureInputComponent.getValue()).to.be.equal('ALLA_BREVE');
    });
});