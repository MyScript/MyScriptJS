'use strict';

describe('MyScriptJS: input/music/components/musicHeadInputComponent.js', function () {

    var expect = require('chai').expect;

    it('MusicHeadInputComponent object exist', function () {
        expect(MyScript.MusicHeadInputComponent).to.exist;
        expect(MyScript.MusicHeadInputComponent).not.to.be.null;
        expect(MyScript.MusicHeadInputComponent).to.not.be.undefined;
    });

    it('MusicHeadInputComponent constructor', function () {
        var musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
        expect(musicHeadInputComponent).to.be.an('object');
        expect(musicHeadInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicHeadInputComponent).to.be.an.instanceof(MyScript.MusicHeadInputComponent);
        expect(musicHeadInputComponent).to.have.ownProperty('type');
    });

    it('MusicDecorationInputComponent value getter', function () {
        var musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
        expect(musicHeadInputComponent.getValue()).to.be.undefined;
    });

    it('MusicDecorationInputComponent value setter', function () {
        var musicHeadInputComponent = new MyScript.MusicHeadInputComponent();
        expect(musicHeadInputComponent.getValue()).to.be.undefined;
        musicHeadInputComponent.setValue('BLACK');
        expect(musicHeadInputComponent.getValue()).not.to.be.undefined;
        expect(musicHeadInputComponent.getValue()).to.be.equal('BLACK');
    });

});