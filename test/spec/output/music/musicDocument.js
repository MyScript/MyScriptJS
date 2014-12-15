'use strict';

describe('MyScriptJS: output/music/musicDocument.js', function () {

    it('MusicDocument object exist', function () {
        expect(MyScript.MusicDocument).to.exist;
        expect(MyScript.MusicDocument).not.to.be.null;
        expect(MyScript.MusicDocument).to.not.be.undefined;
    });

});