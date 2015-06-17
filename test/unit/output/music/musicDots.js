'use strict';

describe('MusicDots: output/music/musicDots.js', function () {

    describe('Default construction', function () {

        var musicDots;
        before(function (done) {
            musicDots = new MyScript.MusicDots();
            done();
        });

        it('Check initial state', function () {
            expect(musicDots).to.be.an('object');
            expect(musicDots).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicDots).to.be.an.instanceOf(MyScript.MusicDots);
        });

        it('Get count', function () {
            expect(musicDots.getCount()).to.equal(undefined);
        });

    });

});