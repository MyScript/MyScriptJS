'use strict';

describe('MyScriptJS: input/music/components/musicDotsInputComponent.js', function () {

    it('MusicDotsInputComponent object exist', function () {
        expect(MyScript.MusicDotsInputComponent).to.exist;
        expect(MyScript.MusicDotsInputComponent).not.to.be.null;
        expect(MyScript.MusicDotsInputComponent).to.not.be.undefined;
    });

    it('MusicDotsInputComponent constructor', function () {
        var musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
        expect(musicDotsInputComponent).to.be.an('object');
        expect(musicDotsInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicDotsInputComponent).to.be.an.instanceof(MyScript.MusicDotsInputComponent);
        expect(musicDotsInputComponent).to.have.ownProperty('type');
    });

    it('MusicDotsInputComponent value getter', function () {
        var musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
        expect(musicDotsInputComponent.getValue()).to.be.undefined;
    });

    it('MusicDotsInputComponent value setter', function () {
        var musicDotsInputComponent = new MyScript.MusicDotsInputComponent();
        expect(musicDotsInputComponent.getValue()).to.be.undefined;
        musicDotsInputComponent.setValue(594);
        expect(musicDotsInputComponent.getValue()).not.to.be.undefined;
        expect(musicDotsInputComponent.getValue()).to.be.equal(594);
    });

});