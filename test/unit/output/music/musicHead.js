'use strict';

describe('MusicHead: output/music/musicHead.js', function () {

    describe('Default construction', function () {

        var musicHead;
        before(function (done) {
            musicHead = new MyScript.MusicHead();
            done();
        });

        it('Check initial state', function () {
            expect(musicHead).to.be.an('object');
            expect(musicHead).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicHead).to.be.an.instanceOf(MyScript.MusicHead);
        });

        it('Type getter', function () {
            expect(musicHead.getType()).to.be.undefined;
        });

    });

});