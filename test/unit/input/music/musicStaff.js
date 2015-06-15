'use strict';

describe('MusicStaff: input/music/musicStaff.js', function () {

    describe('Default construction', function () {

        var musicStaff;
        before(function (done) {
            musicStaff = new MyScript.MusicStaff();
            done();
        });

        it('Check initial state', function () {
            expect(musicStaff).to.be.an('object');
            expect(musicStaff).to.be.an.instanceOf(MyScript.MusicStaff);
        });

        it('Get count getter', function () {
            expect(musicStaff.getCount()).not.to.be.undefined;
            expect(musicStaff.getCount()).to.equal(5);
        });

        it('Set count', function () {
            musicStaff.setCount(5);
            expect(musicStaff.getCount()).not.to.be.undefined;
            expect(musicStaff.getCount()).to.equal(5);
        });

        it('Get top', function () {
            expect(musicStaff.getTop()).to.be.undefined;
        });

        it('Set count', function () {
            musicStaff.setTop(150);
            expect(musicStaff.getTop()).not.to.be.undefined;
            expect(musicStaff.getTop()).to.equal(150);
        });

        it('Get gap', function () {
            expect(musicStaff.getGap()).not.to.be.undefined;
            expect(musicStaff.getGap()).to.equal(20);
        });

        it('Set gap', function () {
            musicStaff.setGap(10);
            expect(musicStaff.getGap()).not.to.be.undefined;
            expect(musicStaff.getGap()).to.equal(10);
        });

    });

});