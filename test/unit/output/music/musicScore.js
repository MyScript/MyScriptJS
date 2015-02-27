'use strict';

describe('MyScriptJS: output/music/musicScore.js', function () {

    it('MusicScore object exist', function () {
        expect(MyScript.MusicScore).to.exist;
        expect(MyScript.MusicScore).not.to.be.null;
        expect(MyScript.MusicScore).to.not.be.undefined;
    });

    it('MusicScore constructor', function () {
        var musicScore = new MyScript.MusicScore();
        expect(musicScore).to.be.an('object');
        expect(musicScore).to.be.an.instanceof(MyScript.MusicScore);
        expect(musicScore).to.have.ownProperty('parts');
    });

    it('MusicScore Parts getter', function () {
        var musicScore = new MyScript.MusicScore();
        expect(musicScore.getParts()).to.be.empty;
    });

});