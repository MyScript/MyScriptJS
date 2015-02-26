'use strict';

describe('MyScriptJS: input/music/components/musicBarInputComponent.js', function () {

    it('MusicBarInputComponent object exist', function () {
        expect(MyScript.MusicBarInputComponent).to.exist;
        expect(MyScript.MusicBarInputComponent).not.to.be.null;
        expect(MyScript.MusicBarInputComponent).to.not.be.undefined;
    });

    it('MusicBarInputComponent constructor', function () {
        var obj = new MyScript.MusicBarInputComponent();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(obj).to.be.an.instanceof(MyScript.MusicBarInputComponent);
        expect(obj).to.have.ownProperty('type');
    });

    it('MusicBarInputComponent value getter', function () {
        var obj = new MyScript.MusicBarInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
    });

    it('MusicBarInputComponent value setter', function () {
        var obj = new MyScript.MusicBarInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
        obj.setValue(new MyScript.MusicBarInput());
        expect(obj.getValue()).not.to.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
    });

});