'use strict';

describe('MyScriptJS: output/music/musicAnnotation.js', function () {

    it('MusicAnnotation object exist', function () {
        expect(MyScript.MusicAnnotation).to.exist;
        expect(MyScript.MusicAnnotation).not.to.be.null;
        expect(MyScript.MusicAnnotation).to.not.be.undefined;
    });

});