'use strict';

describe('MyScriptJS: input/music/components/musicBarInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicBarInputComponent object exist', function () {
        expect(MyScript.MusicBarInputComponent).to.exist;
        expect(MyScript.MusicBarInputComponent).not.to.be.null;
        expect(MyScript.MusicBarInputComponent).to.not.be.undefined;
    });

    it('MusicBarInputComponent constructor', function () {
        var musicBarInputComponent = new MyScript.MusicBarInputComponent();
        expect(musicBarInputComponent).to.be.an('object');
        expect(musicBarInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicBarInputComponent).to.be.an.instanceof(MyScript.MusicBarInputComponent);
        expect(musicBarInputComponent).to.have.ownProperty('type');
    });

    it('MusicBarInputComponent value getter', function () {
        var musicBarInputComponent = new MyScript.MusicBarInputComponent();
        expect(musicBarInputComponent.getValue()).to.be.undefined;
    });

    it('MusicBarInputComponent value setter', function () {
        var musicBarInputComponent = new MyScript.MusicBarInputComponent();
        expect(musicBarInputComponent.getValue()).to.be.undefined;
        musicBarInputComponent.setValue(new MyScript.MusicBarInput());
        expect(musicBarInputComponent.getValue()).not.to.be.undefined;
        expect(musicBarInputComponent.getValue()).to.be.an.instanceof(MyScript.MusicBarInput);
    });

});