'use strict';

describe('MyScriptJS: output/music/MusicTupletBracket.js', function () {

    it('MusicTupletBracket object exist', function () {
        expect(MyScript.MusicTupletBracket).to.exist;
        expect(MyScript.MusicTupletBracket).not.to.be.null;
        expect(MyScript.MusicTupletBracket).to.not.be.undefined;
    });

    it('MusicTupletBracket constructor', function () {
        var MusicTupletBracket = new MyScript.MusicTupletBracket();
        expect(MusicTupletBracket).to.be.an('object');
        expect(MusicTupletBracket).to.be.an.instanceof(MyScript.MusicElement);
        expect(MusicTupletBracket).to.be.an.instanceof(MyScript.MusicTupletBracket);
    });

    it('MusicTupletBracket Type getter', function () {
        var MusicTupletBracket = new MyScript.MusicTupletBracket();
        expect(MusicTupletBracket.getType()).to.be.undefined;
    });

});