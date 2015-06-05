'use strict';

describe('MusicRecognitionData: input/music/musicRecognitionData.js', function () {

    describe('Default construction', function () {

        var musicRecognitionData;
        before(function (done) {
            musicRecognitionData = new MyScript.MusicRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(musicRecognitionData).to.be.an('object');
            expect(musicRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(musicRecognitionData).to.be.an.instanceof(MyScript.MusicRecognitionData);
        });

    });

    describe('Accessors', function () {

        var musicRecognitionData;
        beforeEach(function (done) {
            musicRecognitionData = new MyScript.MusicRecognitionData();
            done();
        });

        it('music recognition input getter', function () {
            expect(musicRecognitionData.getMusicRecognitionInput()).to.be.undefined;
        });

        it('music recognition input setter', function () {
            expect(musicRecognitionData.getMusicRecognitionInput()).to.be.undefined;
            musicRecognitionData.setMusicRecognitionInput(new MyScript.MusicRecognitionInput());
            expect(musicRecognitionData.getMusicRecognitionInput()).not.to.be.undefined;
        });

    });

});