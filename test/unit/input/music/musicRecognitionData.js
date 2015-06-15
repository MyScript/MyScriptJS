'use strict';

describe('MusicRecognitionData: input/music/musicRecognitionData.js', function () {

    describe('Default construction', function () {

        var musicRecognitionData;
        before(function (done) {
            musicRecognitionData = new MyScript.MusicRecognitionData();
            done();
        });

        it('Check initial state', function () {
            expect(musicRecognitionData).to.be.an('object');
            expect(musicRecognitionData).to.be.an.instanceOf(MyScript.AbstractRecognitionData);
            expect(musicRecognitionData).to.be.an.instanceOf(MyScript.MusicRecognitionData);
        });

        it('Get recognition input', function () {
            expect(musicRecognitionData.getMusicRecognitionInput()).to.be.undefined;
        });

        it('Set recognition input', function () {
            musicRecognitionData.setMusicRecognitionInput(new MyScript.MusicRecognitionInput());
            expect(musicRecognitionData.getMusicRecognitionInput()).not.to.be.undefined;
        });

    });

});