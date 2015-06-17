'use strict';

describe('MusicBeam: output/music/musicBeam.js', function () {

    describe('Default construction', function () {

        var musicBeam;
        before(function (done) {
            musicBeam = new MyScript.MusicBeam();
            done();
        });

        it('Check initial state', function () {
            expect(musicBeam).to.be.an('object');
            expect(musicBeam).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicBeam).to.be.an.instanceOf(MyScript.MusicBeam);
        });

        it('Get gap', function () {
            expect(musicBeam.getGap()).to.equal(undefined);
        });

        it('Set gap', function () {
            musicBeam.setGap(0);
            expect(musicBeam.getGap()).to.equal(0);
        });

        it('Get slope', function () {
            expect(musicBeam.getSlope()).to.equal(undefined);
        });

        it('Set slope', function () {
            musicBeam.setSlope('test');
            expect(musicBeam.getSlope()).to.equal('test');
        });

        it('Get placement', function () {
            expect(musicBeam.getPlacement()).to.equal(undefined);
        });

        it('Set placement', function () {
            musicBeam.setPlacement('test');
            expect(musicBeam.getPlacement()).to.equal('test');
        });

        it('Get left count', function () {
            expect(musicBeam.getLeftCount()).to.equal(undefined);
        });

        it('Set left count', function () {
            musicBeam.setLeftCount(1);
            expect(musicBeam.getLeftCount()).to.equal(1);
        });

        it('Get right count', function () {
            expect(musicBeam.getRightCount()).to.equal(undefined);
        });

        it('Set right count', function () {
            musicBeam.setRightCount(2);
            expect(musicBeam.getRightCount()).to.equal(2);
        });

    });

});