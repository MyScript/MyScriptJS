'use strict';

describe('MyScriptJS: output/music/musicPart.js', function () {

    it('MusicPart object exist', function () {
        expect(MyScript.MusicPart).to.exist;
        expect(MyScript.MusicPart).not.to.be.null;
        expect(MyScript.MusicPart).to.not.be.undefined;
    });

});