'use strict';

describe('MyScriptJS: output/music/musicResult.js', function () {

    it('MusicResult object exist', function () {
        expect(MyScript.MusicResult).to.exist;
        expect(MyScript.MusicResult).not.to.be.null;
        expect(MyScript.MusicResult).to.not.be.undefined;
    });

});