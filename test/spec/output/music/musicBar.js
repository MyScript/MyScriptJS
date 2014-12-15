'use strict';

describe('MyScriptJS: output/music/musicBar.js', function () {

    it('MusicBar object exist', function () {
        expect(MyScript.MusicBar).to.exist;
        expect(MyScript.MusicBar).not.to.be.null;
        expect(MyScript.MusicBar).to.not.be.undefined;
    });

});