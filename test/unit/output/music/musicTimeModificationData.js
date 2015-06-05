'use strict';

describe('MusicTimeModificationData: output/music/musicTimeModificationData.js', function () {

    describe('Default construction', function () {

        var musicTimeModificationData;
        before(function (done) {
            musicTimeModificationData = new MyScript.MusicTimeModificationData();
            done();
        });

        it('check initial state', function () {
            expect(musicTimeModificationData).to.be.an('object');
            expect(musicTimeModificationData).to.be.an.instanceof(MyScript.MusicTimeModificationData);
        });

        it('Type getter', function () {
            expect(musicTimeModificationData.getType()).to.be.undefined;
        });

        it('Actual getter', function () {
            expect(musicTimeModificationData.getActual()).to.be.undefined;
        });

        it('Dots getter', function () {
            expect(musicTimeModificationData.getDots()).to.be.undefined;
        });

        it('Normal getter', function () {
            expect(musicTimeModificationData.getNormal()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicTimeModificationData;
        before(function (done) {
            musicTimeModificationData = new MyScript.MusicTimeModificationData({
                actual: 'actual',
                dots: 'dots',
                normal: 'normal',
                type: 'type'
            });
            done();
        });

        it('check initial state', function () {
            expect(musicTimeModificationData).to.be.an('object');
            expect(musicTimeModificationData).to.be.an.instanceof(MyScript.MusicTimeModificationData);
        });

        it('Test MusicTimeModificationData object construction', function () {
            expect(musicTimeModificationData.getActual()).to.not.be.undefined;
            expect(musicTimeModificationData.getDots()).to.not.be.undefined;
            expect(musicTimeModificationData.getNormal()).to.not.be.undefined;
            expect(musicTimeModificationData.getType()).to.not.be.undefined;
        });

    });

});