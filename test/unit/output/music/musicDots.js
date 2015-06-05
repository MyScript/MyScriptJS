'use strict';

describe('MusicDots: output/music/musicDots.js', function () {

    describe('Default construction', function () {

        var musicDots;
        before(function (done) {
            musicDots = new MyScript.MusicDots();
            done();
        });

        it('check initial state', function () {
            expect(musicDots).to.be.an('object');
            expect(musicDots).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicDots).to.be.an.instanceof(MyScript.MusicDots);
        });

        it('Count getter', function () {
            expect(musicDots.getCount()).to.be.undefined;
        });

    });

});