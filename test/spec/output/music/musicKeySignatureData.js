'use strict';

describe('MyScriptJS: output/music/musicKeySignatureData.js', function () {

    it('MusicKeySignatureData object exist', function () {
        expect(MyScript.MusicKeySignatureData).to.exist;
        expect(MyScript.MusicKeySignatureData).not.to.be.null;
        expect(MyScript.MusicKeySignatureData).to.not.be.undefined;
    });

});