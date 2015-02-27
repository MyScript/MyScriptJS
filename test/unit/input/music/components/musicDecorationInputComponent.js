'use strict';

describe('MyScriptJS: input/music/components/musicDecorationInputComponent.js', function () {

    it('MusicDecorationInputComponent object exist', function () {
        expect(MyScript.MusicDecorationInputComponent).to.exist;
        expect(MyScript.MusicDecorationInputComponent).not.to.be.null;
        expect(MyScript.MusicDecorationInputComponent).to.not.be.undefined;
    });

    it('MusicDecorationInputComponent constructor', function () {
        var obj = new MyScript.MusicDecorationInputComponent();
        expect(obj).to.be.an('object');
        expect(obj).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(obj).to.be.an.instanceof(MyScript.MusicDecorationInputComponent);
        expect(obj).to.have.ownProperty('type');
    });

    it('MusicDecorationInputComponent value getter', function () {
        var obj = new MyScript.MusicDecorationInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
    });

    it('MusicDecorationInputComponent value setter', function () {
        var obj = new MyScript.MusicDecorationInputComponent();
        expect(obj.getValue()).to.not.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
        obj.setValue(new MyScript.MusicDecorationInput());
        expect(obj.getValue()).not.to.be.undefined;
        expect(obj.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
    });

});