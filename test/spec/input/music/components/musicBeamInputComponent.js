'use strict';

describe('MyScriptJS: input/music/components/musicBeamInputComponent.js', function () {

    it('MusicBeamInputComponent object exist', function () {
        expect(MyScript.MusicBeamInputComponent).to.exist;
        expect(MyScript.MusicBeamInputComponent).not.to.be.null;
        expect(MyScript.MusicBeamInputComponent).to.not.be.undefined;
    });

    it('MusicBeamInputComponent constructor', function () {
        var musicBeamInputComponent = new MyScript.MusicBeamInputComponent();
        expect(musicBeamInputComponent).to.be.an('object');
        expect(musicBeamInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicBeamInputComponent).to.be.an.instanceof(MyScript.MusicBeamInputComponent);
        expect(musicBeamInputComponent).to.have.ownProperty('type');
    });

    it('MusicBeamInputComponent value getter', function () {
        var musicBeamInputComponent = new MyScript.MusicBeamInputComponent();
        expect(musicBeamInputComponent.getValue()).to.be.undefined;
    });

    it('MusicBeamInputComponent value setter', function () {
        var musicBeamInputComponent = new MyScript.MusicBeamInputComponent();
        expect(musicBeamInputComponent.getValue()).to.be.undefined;
        musicBeamInputComponent.setValue(new MyScript.MusicBeamInput());
        expect(musicBeamInputComponent.getValue()).not.to.be.undefined;
        expect(musicBeamInputComponent.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
    });
});