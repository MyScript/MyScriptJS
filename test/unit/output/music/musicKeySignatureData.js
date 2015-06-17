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

        it('Get fifths', function () {
            expect(musicKeySignatureData.getFifths()).to.equal(undefined);
        });

        it('Get cancel', function () {
            expect(musicKeySignatureData.getCancel()).to.equal(undefined);
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

        it('Get fifths', function () {
            expect(musicKeySignatureData.getFifths().length).to.equal(1);
        });

        it('Get cancel', function () {
            expect(musicKeySignatureData.getCancel().length).to.equal(1);
        });

    });

});