'use strict';

describe('MyScriptJS: output/music/musicNote.js', function () {

    it('MusicNote object exist', function () {
        expect(MyScript.MusicNote).to.exist;
        expect(MyScript.MusicNote).not.to.be.null;
        expect(MyScript.MusicNote).to.not.be.undefined;
    });

});