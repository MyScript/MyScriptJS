'use strict';

describe('MyScriptJS: output/music/musicDots.js', function () {

    it('MusicDots object exist', function () {
        expect(MyScript.MusicDots).to.exist;
        expect(MyScript.MusicDots).not.to.be.null;
        expect(MyScript.MusicDots).to.not.be.undefined;
    });

});