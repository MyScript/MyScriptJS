'use strict';

describe('MyScriptJS: input/music/musicRecognitionData.js', function () {

    var expect = require('chai').expect;

    it('MusicRecognitionData object exist', function () {
        expect(MyScript.MusicRecognitionData).to.exist;
        expect(MyScript.MusicRecognitionData).not.to.be.null;
        expect(MyScript.MusicRecognitionData).to.not.be.undefined;
    });

    it('MusicRecognitionData constructor', function () {
        var musicRecognitionData = new MyScript.MusicRecognitionData();
        expect(musicRecognitionData).to.be.an('object');
        expect(musicRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(musicRecognitionData).to.be.an.instanceof(MyScript.MusicRecognitionData);
    });


    it('MusicRecognitionData music recognition input getter', function () {
        var musicRecognitionData = new MyScript.MusicRecognitionData();
        expect(musicRecognitionData.getMusicRecognitionInput()).to.be.undefined;
    });

    it('MusicRecognitionData music recognition input setter', function () {
        var musicRecognitionData = new MyScript.MusicRecognitionData();
        expect(musicRecognitionData.getMusicRecognitionInput()).to.be.undefined;
        musicRecognitionData.setMusicRecognitionInput(new MyScript.MusicRecognitionInput());
        expect(musicRecognitionData.getMusicRecognitionInput()).not.to.be.undefined;
    });

});