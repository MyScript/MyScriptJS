'use strict';

describe('MusicStaff: input/music/musicStaff.js', function () {

    describe('Default construction', function () {

        var musicStaff;
        before(function (done) {
            musicStaff = new MyScript.MusicStaff();
            done();
        });

        it('check initial state', function () {
            expect(musicStaff).to.be.an('object');
            expect(musicStaff).to.be.an.instanceof(MyScript.MusicStaff);
        });

    });

    describe('Accessors', function () {

        var musicStaff;
        beforeEach(function (done) {
            musicStaff = new MyScript.MusicStaff();
            done();
        });

        it('count getter', function () {
            expect(musicStaff.getCount()).not.to.be.undefined;
            expect(musicStaff.getCount()).to.equal(5);
        });

        it('count setter', function () {
            musicStaff.setCount(5);
            expect(musicStaff.getCount()).not.to.be.undefined;
            expect(musicStaff.getCount()).to.equal(5);
        });

        it('top getter', function () {
            expect(musicStaff.getTop()).to.be.undefined;
        });

        it('count setter', function () {
            expect(musicStaff.getTop()).to.be.undefined;
            musicStaff.setTop(150);
            expect(musicStaff.getTop()).not.to.be.undefined;
            expect(musicStaff.getTop()).to.equal(150);
        });

        it('gap getter', function () {
            expect(musicStaff.getGap()).not.to.be.undefined;
            expect(musicStaff.getGap()).to.equal(20);
        });

        it('gap setter', function () {
            musicStaff.setGap(10);
            expect(musicStaff.getGap()).not.to.be.undefined;
            expect(musicStaff.getGap()).to.equal(10);
        });

    });

});