'use strict';

describe('MusicTimeSignature: output/music/musicTimeSignature.js', function () {

    describe('Default construction', function () {

        var musicTimeSignature;
        before(function (done) {
            musicTimeSignature = new MyScript.MusicTimeSignature();
            done();
        });

        it('Check initial state', function () {
            expect(musicTimeSignature).to.be.an('object');
            expect(musicTimeSignature).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicTimeSignature).to.be.an.instanceOf(MyScript.MusicTimeSignature);
        });

        it('Get top', function () {
            expect(musicTimeSignature.getTop()).to.equal(undefined);
        });

        it('Get bottom', function () {
            expect(musicTimeSignature.getBottom()).to.equal(undefined);
        });

        it('Get type', function () {
            expect(musicTimeSignature.getType()).to.equal(undefined);
        });

    });

});