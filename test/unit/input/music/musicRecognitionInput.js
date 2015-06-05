'use strict';

describe('MusicRecognitionInput: input/music/musicRecognitionInput.js', function () {

    describe('Default construction', function () {

        var musicRecognitionInput;
        before(function (done) {
            musicRecognitionInput = new MyScript.MusicRecognitionInput();
            done();
        });

        it('check initial state', function () {
            expect(musicRecognitionInput).to.be.an('object');
            expect(musicRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
            expect(musicRecognitionInput).to.be.an.instanceof(MyScript.MusicRecognitionInput);
        });

    });

    describe('Accessors', function () {

        var musicRecognitionInput;
        beforeEach(function (done) {
            musicRecognitionInput = new MyScript.MusicRecognitionInput();
            done();
        });

        it('components getter', function () {
            expect(musicRecognitionInput.getComponents()).to.be.undefined;
        });

        it('components setter', function () {
            expect(musicRecognitionInput.getComponents()).to.be.undefined;
            musicRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(musicRecognitionInput.getComponents()).not.to.be.undefined;
        });

        it('result types getter', function () {
            expect(musicRecognitionInput.getResultTypes()).to.be.empty;
        });

        it('result types setter', function () {
            expect(musicRecognitionInput.getResultTypes()).to.be.undefined;

            musicRecognitionInput.setResultTypes(['MUSICXML', 'ScoreTree']);
            expect(musicRecognitionInput.getResultTypes().length).to.equal(2);
            expect(musicRecognitionInput.getResultTypes()[0]).to.equal('MUSICXML');
            expect(musicRecognitionInput.getResultTypes()[1]).to.equal('ScoreTree');

        });

        it('user resources getter', function () {
            expect(musicRecognitionInput.getUserResources()).to.be.empty;
        });

        it('user resources setter', function () {
            expect(musicRecognitionInput.getUserResources()).to.be.undefined;

            musicRecognitionInput.setUserResources(['music-ak', 'music-grm-standard']);
            expect(musicRecognitionInput.getUserResources().length).to.equal(2);
            expect(musicRecognitionInput.getUserResources()[0]).to.equal('music-ak');
            expect(musicRecognitionInput.getUserResources()[1]).to.equal('music-grm-standard');
        });

        it('ScratchOut Detection Sensitivity getter', function () {
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.be.empty;
        });

        it('ScratchOut Detection Sensitivity setter', function () {
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.be.undefined;
            musicRecognitionInput.setScratchOutDetectionSensitivity(15);
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Staff getter', function () {
            expect(musicRecognitionInput.getStaff()).to.be.empty;
        });

        it('Staff setter', function () {
            expect(musicRecognitionInput.getStaff()).to.be.undefined;
            musicRecognitionInput.setStaff(new MyScript.MusicStaff());
            expect(musicRecognitionInput.getStaff()).not.to.be.undefined;
        });

        it('Divisions getter', function () {
            expect(musicRecognitionInput.getDivisions()).to.be.empty;
        });

        it('Divisions setter', function () {
            expect(musicRecognitionInput.getDivisions()).to.be.undefined;
            musicRecognitionInput.setDivisions(480);
            expect(musicRecognitionInput.getDivisions()).not.to.be.undefined;
            expect(musicRecognitionInput.getDivisions()).to.equal(480);
        });

    });

});