'use strict';

describe('MusicTimeModificationData: output/music/musicTimeModificationData.js', function () {

    describe('Default construction', function () {

        var musicTimeModificationData;
        before(function (done) {
            musicTimeModificationData = new MyScript.MusicTimeModificationData();
            done();
        });

        it('Check initial state', function () {
            expect(musicTimeModificationData).to.be.an('object');
            expect(musicTimeModificationData).to.be.an.instanceOf(MyScript.MusicTimeModificationData);
        });

        it('Get type', function () {
            expect(musicTimeModificationData.getType()).to.equal(undefined);
        });

        it('Get actual', function () {
            expect(musicTimeModificationData.getActual()).to.equal(undefined);
        });

        it('Get dots', function () {
            expect(musicTimeModificationData.getDots()).to.equal(undefined);
        });

        it('Get normal', function () {
            expect(musicTimeModificationData.getNormal()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var musicTimeModificationData;
        before(function (done) {
            musicTimeModificationData = new MyScript.MusicTimeModificationData({
                actual: 0,
                dots: 1,
                normal: 2,
                type: 'type'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicTimeModificationData).to.be.an('object');
            expect(musicTimeModificationData).to.be.an.instanceOf(MyScript.MusicTimeModificationData);
        });

        it('Get type', function () {
            expect(musicTimeModificationData.getType()).to.equal('type');
        });

        it('Get actual', function () {
            expect(musicTimeModificationData.getActual()).to.equal(0);
        });

        it('Get dots', function () {
            expect(musicTimeModificationData.getDots()).to.equal(1);
        });

        it('Get normal', function () {
            expect(musicTimeModificationData.getNormal()).to.equal(2);
        });

    });

});