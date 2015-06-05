'use strict';

describe('MusicHead: output/music/musicHead.js', function () {

    describe('Default construction', function () {

        var musicHead;
        before(function (done) {
            musicHead = new MyScript.MusicHead();
            done();
        });

        it('check initial state', function () {
            expect(musicHead).to.be.an('object');
            expect(musicHead).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicHead).to.be.an.instanceof(MyScript.MusicHead);
        });

        it('Type getter', function () {
            expect(musicHead.getType()).to.be.undefined;
        });

    });

});