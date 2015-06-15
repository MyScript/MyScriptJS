'use strict';

describe('MusicRecognitionInput: input/music/musicRecognitionInput.js', function () {

    describe('Default construction', function () {

        var musicRecognitionInput;
        before(function (done) {
            musicRecognitionInput = new MyScript.MusicRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(musicRecognitionInput).to.be.an('object');
            expect(musicRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
            expect(musicRecognitionInput).to.be.an.instanceOf(MyScript.MusicRecognitionInput);
        });

        it('Get components', function () {
            expect(musicRecognitionInput.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            musicRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(musicRecognitionInput.getComponents()).not.to.be.undefined;
        });

        it('Get result types', function () {
            expect(musicRecognitionInput.getResultTypes()).to.be.empty;
        });

        it('Set result types', function () {
            musicRecognitionInput.setResultTypes(['MUSICXML', 'ScoreTree']);
            expect(musicRecognitionInput.getResultTypes().length).to.equal(2);
            expect(musicRecognitionInput.getResultTypes()[0]).to.equal('MUSICXML');
            expect(musicRecognitionInput.getResultTypes()[1]).to.equal('ScoreTree');

        });

        it('Get user resources', function () {
            expect(musicRecognitionInput.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            musicRecognitionInput.setUserResources(['music-ak', 'music-grm-standard']);
            expect(musicRecognitionInput.getUserResources().length).to.equal(2);
            expect(musicRecognitionInput.getUserResources()[0]).to.equal('music-ak');
            expect(musicRecognitionInput.getUserResources()[1]).to.equal('music-grm-standard');
        });

        it('Get scratchOut detection sensitivity', function () {
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.be.empty;
        });

        it('Set scratchOut detection sensitivity', function () {
            musicRecognitionInput.setScratchOutDetectionSensitivity(15);
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(musicRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Get staff', function () {
            expect(musicRecognitionInput.getStaff()).to.be.empty;
        });

        it('Set staff', function () {
            musicRecognitionInput.setStaff(new MyScript.MusicStaff());
            expect(musicRecognitionInput.getStaff()).not.to.be.undefined;
        });

        it('Get divisions', function () {
            expect(musicRecognitionInput.getDivisions()).to.be.empty;
        });

        it('Set divisions', function () {
            musicRecognitionInput.setDivisions(480);
            expect(musicRecognitionInput.getDivisions()).not.to.be.undefined;
            expect(musicRecognitionInput.getDivisions()).to.equal(480);
        });

    });

});