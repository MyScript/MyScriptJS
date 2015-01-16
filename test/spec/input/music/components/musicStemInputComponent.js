'use strict';

describe('MyScriptJS: input/music/components/musicStemInputComponent.js', function () {

    it('MusicStemInputComponent object exist', function () {
        expect(MyScript.MusicStemInputComponent).to.exist;
        expect(MyScript.MusicStemInputComponent).not.to.be.null;
        expect(MyScript.MusicStemInputComponent).to.not.be.undefined;
    });

    it('MusicStemInputComponent constructor', function () {
        var musicStemInputComponent = new MyScript.MusicStemInputComponent();
        expect(musicStemInputComponent).to.be.an('object');
        expect(musicStemInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicStemInputComponent).to.be.an.instanceof(MyScript.MusicStemInputComponent);
        expect(musicStemInputComponent).to.have.ownProperty('type');
    });

    it('MusicStemInputComponent value getter', function () {
        var musicStemInputComponent = new MyScript.MusicStemInputComponent();
        expect(musicStemInputComponent.getValue()).to.be.undefined;
    });

    it('MusicStemInputComponent value setter', function () {
        var musicStemInputComponent = new MyScript.MusicStemInputComponent();
        expect(musicStemInputComponent.getValue()).to.be.undefined;
        musicStemInputComponent.setValue('DOWN_FLAG1');
        expect(musicStemInputComponent.getValue()).not.to.be.undefined;
        expect(musicStemInputComponent.getValue()).to.be.equal('DOWN_FLAG1');
    });

});