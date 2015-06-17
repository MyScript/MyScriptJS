'use strict';

describe('MusicAccidental: output/music/musicAccidental.js', function () {

    describe('Default construction', function () {

        var musicAccidental;
        before(function (done) {
            musicAccidental = new MyScript.MusicAccidental();
            done();
        });

        it('Check initial state', function () {
            expect(musicAccidental).to.be.an('object');
            expect(musicAccidental).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicAccidental).to.be.an.instanceOf(MyScript.MusicAccidental);
        });

        it('Get type', function () {
            expect(musicAccidental.getType()).to.equal(undefined);
        });

    });

});