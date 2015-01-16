'use strict';

describe('MyScriptJS: output/music/musicRest.js', function () {

    var expect = require('chai').expect;

    it('MusicRest object exist', function () {
        expect(MyScript.MusicRest).to.exist;
        expect(MyScript.MusicRest).not.to.be.null;
        expect(MyScript.MusicRest).to.not.be.undefined;
    });

    it('MusicRest constructor', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest).to.be.an('object');
        expect(musicRest).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicRest).to.be.an.instanceof(MyScript.MusicRest);
        expect(musicRest).to.have.ownProperty('decorations');
        expect(musicRest).to.have.ownProperty('startSlurs');
        expect(musicRest).to.have.ownProperty('stopSlurs');
    });

    it('MusicRest Type getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getType()).to.be.undefined;
    });

    it('MusicRest Dots getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getDots()).to.be.undefined;
    });

    it('MusicRest Duration getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getDuration()).to.be.undefined;
    });

    it('MusicRest Decorations getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getDecorations()).to.be.empty;
    });

    it('MusicRest Start Slurs getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getStartSlurs()).to.be.empty;
    });

    it('MusicRest Stop Slurs getter', function () {
        var musicRest = new MyScript.MusicRest();
        expect(musicRest.getStopSlurs()).to.be.empty;
    });


});