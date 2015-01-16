'use strict';

describe('MyScriptJS: output/music/musicBar.js', function () {

    it('MusicBar object exist', function () {
        expect(MyScript.MusicBar).to.exist;
        expect(MyScript.MusicBar).not.to.be.null;
        expect(MyScript.MusicBar).to.not.be.undefined;
    });

    it('MusicBar constructor', function () {
        var musicBar = new MyScript.MusicBar();
        expect(musicBar).to.be.an('object');
        expect(musicBar).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicBar).to.be.an.instanceof(MyScript.MusicBar);
        expect(musicBar).to.have.ownProperty('decorations');
    });

    it('MusicBar Repeat Direction getter', function () {
        var musicBar = new MyScript.MusicBar();
        expect(musicBar.getRepeatDirection()).to.be.undefined;
    });

    it('MusicBar Style getter', function () {
        var musicBar = new MyScript.MusicBar();
        expect(musicBar.getStyle()).to.be.undefined;
    });

    it('MusicBar Decorations getter', function () {
        var musicBar = new MyScript.MusicBar();
        expect(musicBar.getDecorations()).to.be.empty;
    });

});