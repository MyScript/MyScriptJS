'use strict';

describe('MyScriptJS: output/music/musicKeySignature.js', function () {

    it('MusicKeySignature object exist', function () {
        expect(MyScript.MusicKeySignature).to.exist;
        expect(MyScript.MusicKeySignature).not.to.be.null;
        expect(MyScript.MusicKeySignature).to.not.be.undefined;
    });

});