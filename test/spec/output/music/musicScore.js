'use strict';

describe('MyScriptJS: output/music/musicScore.js', function () {

    it('MusicScore object exist', function () {
        expect(MyScript.MusicScore).to.exist;
        expect(MyScript.MusicScore).not.to.be.null;
        expect(MyScript.MusicScore).to.not.be.undefined;
    });

});