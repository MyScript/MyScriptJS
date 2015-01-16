'use strict';

describe('MyScriptJS: input/music/components/musicTieOrSlurInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicTieOrSlurInputComponent object exist', function () {
        expect(MyScript.MusicTieOrSlurInputComponent).to.exist;
        expect(MyScript.MusicTieOrSlurInputComponent).not.to.be.null;
        expect(MyScript.MusicTieOrSlurInputComponent).to.not.be.undefined;
    });

    it('MusicTieOrSlurInputComponent constructor', function () {
        var musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
        expect(musicTieOrSlurInputComponent).to.be.an('object');
        expect(musicTieOrSlurInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicTieOrSlurInputComponent).to.be.an.instanceof(MyScript.MusicTieOrSlurInputComponent);
        expect(musicTieOrSlurInputComponent).to.have.ownProperty('type');
    });

    it('MusicTieOrSlurInputComponent value getter', function () {
        var musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
        expect(musicTieOrSlurInputComponent.getValue()).to.be.undefined;
    });

    it('MusicTieOrSlurInputComponent value setter', function () {
        var musicTieOrSlurInputComponent = new MyScript.MusicTieOrSlurInputComponent();
        expect(musicTieOrSlurInputComponent.getValue()).to.be.undefined;
        musicTieOrSlurInputComponent.setValue('ABOVE');
        expect(musicTieOrSlurInputComponent.getValue()).not.to.be.undefined;
        expect(musicTieOrSlurInputComponent.getValue()).to.be.equal('ABOVE');
    });

});