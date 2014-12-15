'use strict';

describe('MyScriptJS: output/music/musicStem.js', function () {

    it('MusicStem object exist', function () {
        expect(MyScript.MusicStem).to.exist;
        expect(MyScript.MusicStem).not.to.be.null;
        expect(MyScript.MusicStem).to.not.be.undefined;
    });

});