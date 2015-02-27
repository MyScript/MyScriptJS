'use strict';

describe('MyScriptJS: output/music/musicTie.js', function () {

    it('MusicTie object exist', function () {
        expect(MyScript.MusicTie).to.exist;
        expect(MyScript.MusicTie).not.to.be.null;
        expect(MyScript.MusicTie).to.not.be.undefined;
    });

    it('MusicTie constructor', function () {
        var musicTie = new MyScript.MusicTie();
        expect(musicTie).to.be.an('object');
        expect(musicTie).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicTie).to.be.an.instanceof(MyScript.MusicTie);
    });

    it('MusicTie Placement getter', function () {
        var musicTie = new MyScript.MusicTie();
        expect(musicTie.getPlacement()).to.be.undefined;
    });
});