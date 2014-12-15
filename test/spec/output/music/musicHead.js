'use strict';

describe('MyScriptJS: output/music/musicHead.js', function () {

    it('MusicHead object exist', function () {
        expect(MyScript.MusicHead).to.exist;
        expect(MyScript.MusicHead).not.to.be.null;
        expect(MyScript.MusicHead).to.not.be.undefined;
    });

});