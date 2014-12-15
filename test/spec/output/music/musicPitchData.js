'use strict';

describe('MyScriptJS: output/music/musicPitchData.js', function () {

    it('MusicPitchData object exist', function () {
        expect(MyScript.MusicPitchData).to.exist;
        expect(MyScript.MusicPitchData).not.to.be.null;
        expect(MyScript.MusicPitchData).to.not.be.undefined;
    });

});