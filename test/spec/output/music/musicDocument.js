'use strict';

describe('MyScriptJS: output/music/musicDocument.js', function () {

    it('MusicDocument object exist', function () {
        expect(MyScript.MusicDocument).to.exist;
        expect(MyScript.MusicDocument).not.to.be.null;
        expect(MyScript.MusicDocument).to.not.be.undefined;
    });

    it('MusicDocument constructor', function () {
        var musicDocument = new MyScript.MusicDocument();
        expect(musicDocument).to.be.an('object');
        expect(musicDocument).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicDocument).to.be.an.instanceof(MyScript.MusicDocument);
        expect(musicDocument).to.have.ownProperty('results');
        expect(musicDocument).to.have.ownProperty('scratchOutResults');
    });

    it('MusicDocument Result Elements getter', function () {
        var musicDocument = new MyScript.MusicDocument()
        expect(musicDocument.getResultElements()).to.be.undefined;
    });

    it('MusicDocument Scratch Out Results getter', function () {
        var musicDocument = new MyScript.MusicDocument()
        expect(musicDocument.getScratchOutResults()).to.be.undefined;
    });
});