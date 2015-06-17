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

        it('Get component', function () {
            expect(musicInputRange.getComponent()).to.equal(undefined);
        });

        it('Get first item', function () {
            expect(musicInputRange.getFirstItem()).to.equal(undefined);
        });

        it('Get last item', function () {
            expect(musicInputRange.getLastItem()).to.equal(undefined);
        });

    });

});