'use strict';

describe('MyScriptJS: input/music/components/musicDecorationInputComponent.js', function () {

    it('MusicDecorationInputComponent object exist', function () {
        expect(MyScript.MusicDecorationInputComponent).to.exist;
        expect(MyScript.MusicDecorationInputComponent).not.to.be.null;
        expect(MyScript.MusicDecorationInputComponent).to.not.be.undefined;
    });

    it('MusicDecorationInputComponent constructor', function () {
        var musicDecorationInputComponent = new MyScript.MusicDecorationInputComponent();
        expect(musicDecorationInputComponent).to.be.an('object');
        expect(musicDecorationInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicDecorationInputComponent).to.be.an.instanceof(MyScript.MusicDecorationInputComponent);
        expect(musicDecorationInputComponent).to.have.ownProperty('type');
    });

    it('MusicDecorationInputComponent value getter', function () {
        var musicDecorationInputComponent = new MyScript.MusicDecorationInputComponent();
        expect(musicDecorationInputComponent.getValue()).to.be.undefined;
    });

    it('MusicDecorationInputComponent value setter', function () {
        var musicDecorationInputComponent = new MyScript.MusicDecorationInputComponent();
        expect(musicDecorationInputComponent.getValue()).to.be.undefined;
        musicDecorationInputComponent.setValue(new MyScript.MusicDecorationInput());
        expect(musicDecorationInputComponent.getValue()).not.to.be.undefined;
        expect(musicDecorationInputComponent.getValue()).to.be.an.instanceof(MyScript.MusicDecorationInput);
    });

});