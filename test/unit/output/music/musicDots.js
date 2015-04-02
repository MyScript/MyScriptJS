'use strict';

describe('MyScriptJS: output/music/musicDots.js', function () {

    it('MusicDots object exist', function () {
        expect(MyScript.MusicDots).to.exist;
        expect(MyScript.MusicDots).not.to.be.null;
        expect(MyScript.MusicDots).to.not.be.undefined;
    });

    it('MusicDots constructor', function () {
        var musicDots = new MyScript.MusicDots();
        expect(musicDots).to.be.an('object');
        expect(musicDots).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicDots).to.be.an.instanceof(MyScript.MusicDots);
    });

    it('MusicDocument Count getter', function () {
        var musicDots = new MyScript.MusicDots();
        expect(musicDots.getCount()).to.be.undefined;
    });
});