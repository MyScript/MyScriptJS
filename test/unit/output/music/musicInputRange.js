'use strict';

describe('MusicInputRange: output/music/musicInputRange.js', function () {

    describe('Default construction', function () {

        var musicInputRange;
        before(function (done) {
            musicInputRange = new MyScript.MusicInputRange();
            done();
        });

        it('Check initial state', function () {
            expect(musicInputRange).to.be.an('object');
            expect(musicInputRange).to.be.an.instanceOf(MyScript.MusicInputRange);
        });

        it('Component getter', function () {
            expect(musicInputRange.getComponent()).to.be.undefined;
        });

        it('First Item getter', function () {
            expect(musicInputRange.getFirstItem()).to.be.undefined;
        });

        it('Last Item getter', function () {
            expect(musicInputRange.getLastItem()).to.be.undefined;
        });

    });

});