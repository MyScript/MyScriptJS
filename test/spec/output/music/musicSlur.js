'use strict';

describe('MyScriptJS: output/music/musicSlur.js', function () {

    it('MusicSlur object exist', function () {
        expect(MyScript.MusicSlur).to.exist;
        expect(MyScript.MusicSlur).not.to.be.null;
        expect(MyScript.MusicSlur).to.not.be.undefined;
    });

    it('MusicSlur constructor', function () {
        var musicSlur = new MyScript.MusicSlur();
        expect(musicSlur).to.be.an('object');
        expect(musicSlur).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicSlur).to.be.an.instanceof(MyScript.MusicSlur);
    });

    it('MusicSlur Placement getter', function () {
        var musicSlur = new MyScript.MusicSlur();
        expect(musicSlur.getPlacement()).to.be.undefined;
    });

});