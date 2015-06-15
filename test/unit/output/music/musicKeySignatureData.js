'use strict';

describe('MusicKeySignatureData: output/music/musicKeySignatureData.js', function () {

    describe('Default construction', function () {

        var musicKeySignatureData;
        before(function (done) {
            musicKeySignatureData = new MyScript.MusicKeySignatureData();
            done();
        });

        it('Check initial state', function () {
            expect(musicKeySignatureData).to.be.an('object');
            expect(musicKeySignatureData).to.be.an.instanceOf(MyScript.MusicKeySignatureData);
        });

        it('Fifths getter', function () {
            expect(musicKeySignatureData.getFifths()).to.be.undefined;
        });

        it('Cancel getter', function () {
            expect(musicKeySignatureData.getCancel()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicKeySignatureData;
        before(function (done) {
            musicKeySignatureData = new MyScript.MusicKeySignatureData({
                fifths: [{
                    type: 'fifths'
                }],
                cancel: [{
                    type: 'cancel'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicKeySignatureData).to.be.an('object');
            expect(musicKeySignatureData).to.be.an.instanceOf(MyScript.MusicKeySignatureData);
        });

        it('Test MusicKeySignatureData object construction', function () {
            expect(musicKeySignatureData.getFifths()).to.not.be.empty;
            expect(musicKeySignatureData.getCancel()).to.not.be.empty;
        });

    });

});