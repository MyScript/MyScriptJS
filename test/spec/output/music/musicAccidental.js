'use strict';

describe('MyScriptJS: output/music/musicAccidental.js', function () {

    it('MusicAccidental object exist', function () {
        expect(MyScript.MusicAccidental).to.exist;
        expect(MyScript.MusicAccidental).not.to.be.null;
        expect(MyScript.MusicAccidental).to.not.be.undefined;
    });

    it('MusicAccidental constructor', function () {
        var musicAccidental = new MyScript.MusicAccidental();
        expect(musicAccidental).to.be.an('object');
        expect(musicAccidental).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicAccidental).to.be.an.instanceof(MyScript.MusicAccidental);
    });

    it('MusicAccidental Type getter', function () {
        var musicAccidental = new MyScript.MusicAccidental();
        expect(musicAccidental.getType()).to.be.undefined;
    });

});