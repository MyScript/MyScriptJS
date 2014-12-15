'use strict';

describe('MyScriptJS: output/music/musicBeam.js', function () {

    it('MusicBeam object exist', function () {
        expect(MyScript.MusicBeam).to.exist;
        expect(MyScript.MusicBeam).not.to.be.null;
        expect(MyScript.MusicBeam).to.not.be.undefined;
    });

});