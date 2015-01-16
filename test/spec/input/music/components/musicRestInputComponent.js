'use strict';

describe('MyScriptJS: input/music/components/musicRestInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicRestInputComponent object exist', function () {
        expect(MyScript.MusicRestInputComponent).to.exist;
        expect(MyScript.MusicRestInputComponent).not.to.be.null;
        expect(MyScript.MusicRestInputComponent).to.not.be.undefined;
    });

    it('MusicRestInputComponent constructor', function () {
        var musicRestInputComponent = new MyScript.MusicRestInputComponent();
        expect(musicRestInputComponent).to.be.an('object');
        expect(musicRestInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicRestInputComponent).to.be.an.instanceof(MyScript.MusicRestInputComponent);
        expect(musicRestInputComponent).to.have.ownProperty('type');
    });

    it('MusicRestInputComponent value getter', function () {
        var musicRestInputComponent = new MyScript.MusicRestInputComponent();
        expect(musicRestInputComponent.getValue()).to.be.undefined;
    });

    it('MusicRestInputComponent value setter', function () {
        var musicRestInputComponent = new MyScript.MusicRestInputComponent();
        expect(musicRestInputComponent.getValue()).to.be.undefined;
        musicRestInputComponent.setValue('WHOLE');
        expect(musicRestInputComponent.getValue()).not.to.be.undefined;
        expect(musicRestInputComponent.getValue()).to.be.equal('WHOLE');
    });

});