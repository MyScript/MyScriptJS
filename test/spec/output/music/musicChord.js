'use strict';

describe('MyScriptJS: output/music/musicChord.js', function () {

    it('MusicChord object exist', function () {
        expect(MyScript.MusicChord).to.exist;
        expect(MyScript.MusicChord).not.to.be.null;
        expect(MyScript.MusicChord).to.not.be.undefined;
    });

});