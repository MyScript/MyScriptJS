'use strict';

describe('MyScriptJS: input/music/components/musicClefInputComponent.js', function () {

    it('MusicClefInputComponent object exist', function () {
        expect(MyScript.MusicClefInputComponent).to.exist;
        expect(MyScript.MusicClefInputComponent).not.to.be.null;
        expect(MyScript.MusicClefInputComponent).to.not.be.undefined;
    });

    it('MusicClefInputComponent constructor', function () {
        var musicClefInputComponent = new MyScript.MusicClefInputComponent();
        expect(musicClefInputComponent).to.be.an('object');
        expect(musicClefInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicClefInputComponent).to.be.an.instanceof(MyScript.MusicClefInputComponent);
        expect(musicClefInputComponent).to.have.ownProperty('type');
    });

    it('MusicClefInputComponent value getter', function () {
        var musicClefInputComponent = new MyScript.MusicClefInputComponent();
        expect(musicClefInputComponent.getValue()).to.be.undefined;
    });

    it('MusicClefInputComponent value setter', function () {
        var musicClefInputComponent = new MyScript.MusicClefInputComponent();
        expect(musicClefInputComponent.getValue()).to.be.undefined;
        musicClefInputComponent.setValue(new MyScript.MusicClefInput());
        expect(musicClefInputComponent.getValue()).not.to.be.undefined;
        expect(musicClefInputComponent.getValue()).to.be.an.instanceof(MyScript.MusicClefInput);
    });

});