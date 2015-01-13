'use strict';

describe('MyScriptJS: output/music/musicHead.js', function () {

    it('MusicHead object exist', function () {
        expect(MyScript.MusicHead).to.exist;
        expect(MyScript.MusicHead).not.to.be.null;
        expect(MyScript.MusicHead).to.not.be.undefined;
    });

    it('MusicHead constructor', function () {
        var musicHead = new MyScript.MusicHead();
        expect(musicHead).to.be.an('object');
        expect(musicHead).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicHead).to.be.an.instanceof(MyScript.MusicHead);
    });

    it('MusicHead Type getter', function () {
        var musicHead = new MyScript.MusicHead();
        expect(musicHead.getType()).to.be.undefined;
    });

});