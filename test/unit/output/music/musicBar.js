'use strict';

describe('MyScriptJS: output/music/musicBar.js', function () {

    it('MusicBar object exist', function () {
        expect(MyScript.MusicBar).to.exist;
        expect(MyScript.MusicBar).not.to.be.null;
        expect(MyScript.MusicBar).to.not.be.undefined;
    });

    var musicBar = new MyScript.MusicBar();
    it('MusicBar constructor', function () {
        expect(musicBar).to.be.an('object');
        expect(musicBar).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicBar).to.be.an.instanceof(MyScript.MusicBar);
        expect(musicBar).to.have.ownProperty('decorations');
    });

    it('MusicBar Repeat Direction getter', function () {
        expect(musicBar.getRepeatDirection()).to.be.undefined;
    });

    it('MusicBar Style getter', function () {
        expect(musicBar.getStyle()).to.be.undefined;
    });

    it('MusicBar Decorations getter', function () {
        expect(musicBar.getDecorations()).to.be.empty;
    });

    var obj = {
        decorations: [{
            type: 'decoration'
        }]
    };
    var musicBar2 = new MyScript.MusicBar(obj);
    it('Test MusicBar object construction: MusicDecoration construction', function () {
        expect(musicBar2.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
    });

});