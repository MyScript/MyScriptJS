'use strict';

describe('MyScriptJS: output/music/musicResultElement.js', function () {

    it('MusicResultElement object exist', function () {
        expect(MyScript.MusicResultElement).to.exist;
        expect(MyScript.MusicResultElement).not.to.be.null;
        expect(MyScript.MusicResultElement).to.not.be.undefined;
    });

    it('MusicResultElement constructor', function () {
        var musicResultElement = new MyScript.MusicResultElement();
        expect(musicResultElement).to.be.an('object');
        expect(musicResultElement).to.be.an.instanceof(MyScript.MusicResultElement);
    });

    it('MusicResultElement Type getter', function () {
        var musicResultElement = new MyScript.MusicResultElement();
        expect(musicResultElement.getType()).to.be.undefined;
    });

    it('MusicResultElement Is Music XML', function () {
        var musicResultElement = new MyScript.MusicResultElement();
        expect(musicResultElement.isMusicXML()).to.be.false;
    });

    it('MusicResultElement Is Score Tree', function () {
        var musicResultElement = new MyScript.MusicResultElement();
        expect(musicResultElement.isScoreTree()).to.be.false;
    });
});