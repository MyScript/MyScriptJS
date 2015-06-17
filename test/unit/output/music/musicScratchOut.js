'use strict';

describe('MusicScratchOut: output/music/musicScratchOut.js', function () {

    describe('Default construction', function () {

        var musicScratchOut;
        before(function (done) {
            musicScratchOut = new MyScript.MusicScratchOut();
            done();
        });

        it('Check initial state', function () {
            expect(musicScratchOut).to.be.an('object');
            expect(musicScratchOut).to.be.an.instanceOf(MyScript.MusicScratchOut);
            expect(musicScratchOut).to.have.ownProperty('inputRanges');
            expect(musicScratchOut).to.have.ownProperty('erasedInputRanges');
        });

        it('Get input ranges', function () {
            expect(musicScratchOut.getInputRanges().length).to.equal(0);
        });

        it('Get erased input ranges', function () {
            expect(musicScratchOut.getErasedInputRanges().length).to.equal(0);
        });

    });

    describe('JSON construction', function () {

        var musicScratchOut;
        before(function (done) {
            musicScratchOut = new MyScript.MusicScratchOut({
                erasedInputRanges: [{
                    component: 1,
                    firstItem: 0.0,
                    lastItem: 11.0
                }, {component: 2, firstItem: 0.0, lastItem: 57.0}],
                inputRanges: [{component: 3, firstItem: 0.0, lastItem: 205.0}]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicScratchOut).to.be.an('object');
            expect(musicScratchOut).to.be.an.instanceOf(MyScript.MusicScratchOut);
            expect(musicScratchOut).to.have.ownProperty('inputRanges');
            expect(musicScratchOut).to.have.ownProperty('erasedInputRanges');
        });

        it('Check input ranges', function () {
            expect(musicScratchOut.getInputRanges().length).to.equal(1);
            expect(musicScratchOut.getInputRanges()[0].getComponent()).to.equal(3);
            expect(musicScratchOut.getInputRanges()[0].getFirstItem()).to.equal(0.0);
            expect(musicScratchOut.getInputRanges()[0].getLastItem()).to.equal(205.0);
        });

        it('Check erased input ranges', function () {
            expect(musicScratchOut.getErasedInputRanges().length).to.equal(2);
            expect(musicScratchOut.getErasedInputRanges()[0].getComponent()).to.equal(1);
            expect(musicScratchOut.getErasedInputRanges()[0].getFirstItem()).to.equal(0.0);
            expect(musicScratchOut.getErasedInputRanges()[0].getLastItem()).to.equal(11.0);
            expect(musicScratchOut.getErasedInputRanges()[1].getComponent()).to.equal(2);
            expect(musicScratchOut.getErasedInputRanges()[1].getFirstItem()).to.equal(0.0);
            expect(musicScratchOut.getErasedInputRanges()[1].getLastItem()).to.equal(57.0);
        });

    });

});