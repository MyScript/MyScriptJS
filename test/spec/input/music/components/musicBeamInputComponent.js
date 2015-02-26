'use strict';

describe('MyScriptJS: input/music/components/musicBeamInputComponent.js', function () {

    it('MusicBeamInputComponent object exist', function () {
        expect(MyScript.MusicBeamInputComponent).to.exist;
        expect(MyScript.MusicBeamInputComponent).not.to.be.null;
        expect(MyScript.MusicBeamInputComponent).to.not.be.undefined;
    });

    it('MusicBeamInputComponent constructor', function () {
        var obj = new MyScript.MusicBeamInputComponent();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(obj).to.be.an.instanceof(MyScript.MusicBeamInputComponent);
        expect(obj).to.have.ownProperty('type');
    });

    it('MusicBeamInputComponent value getter', function () {
        var obj = new MyScript.MusicBeamInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
    });

    it('MusicBeamInputComponent value setter', function () {
        var obj = new MyScript.MusicBeamInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
        obj.setValue(new MyScript.MusicBeamInput());
        expect(obj.getValue()).not.to.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBeamInput);
    });
});