'use strict';

describe('MyScriptJS: output/music/musicDecoration.js', function () {

    it('MusicDecoration object exist', function () {
        expect(MyScript.MusicDecoration).to.exist;
        expect(MyScript.MusicDecoration).not.to.be.null;
        expect(MyScript.MusicDecoration).to.not.be.undefined;
    });

    it('MusicDecoration constructor', function () {
        var musicDecoration = new MyScript.MusicDecoration();
        expect(musicDecoration).to.be.an('object');
        expect(musicDecoration).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicDecoration).to.be.an.instanceof(MyScript.MusicDecoration);
    });

    it('MusicDecoration Symbol getter', function () {
        var musicDecoration = new MyScript.MusicDecoration();
        expect(musicDecoration.getSymbol()).to.be.undefined;
    });

    it('MusicDecoration Placement getter', function () {
        var musicDecoration = new MyScript.MusicDecoration();
        expect(musicDecoration.getPlacement()).to.be.undefined;
    });
});