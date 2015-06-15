'use strict';

describe('MusicParameter: input/music/musicParameter.js', function () {

    describe('Default construction', function () {

        var musicParameter;
        before(function (done) {
            musicParameter = new MyScript.MusicParameter();
            done();
        });

        it('Check initial state', function () {
            expect(musicParameter).to.be.an('object');
            expect(musicParameter).to.be.an.instanceOf(MyScript.AbstractParameter);
            expect(musicParameter).to.be.an.instanceOf(MyScript.MusicParameter);
            expect(musicParameter).to.have.ownProperty('resultTypes');
            expect(musicParameter).to.have.ownProperty('userResources');
        });

        it('Get result types', function () {
            expect(musicParameter.getResultTypes()).to.be.empty;
        });

        it('Set result types', function () {
            musicParameter.setResultTypes(['MUSICXML', 'ScoreTree']);
            expect(musicParameter.getResultTypes().length).to.equal(2);
            expect(musicParameter.getResultTypes()[0]).to.equal('MUSICXML');
            expect(musicParameter.getResultTypes()[1]).to.equal('ScoreTree');

        });

        it('Get user resources', function () {
            expect(musicParameter.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            musicParameter.setUserResources(['music-ak', 'music-grm-standard']);
            expect(musicParameter.getUserResources().length).to.equal(2);
            expect(musicParameter.getUserResources()[0]).to.equal('music-ak');
            expect(musicParameter.getUserResources()[1]).to.equal('music-grm-standard');
        });

        it('Get scratchOut detection sensitivity', function () {
            expect(musicParameter.getScratchOutDetectionSensitivity()).to.be.empty;
        });

        it('Set scratchOut detection sensitivity', function () {
            musicParameter.setScratchOutDetectionSensitivity(15);
            expect(musicParameter.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(musicParameter.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Get staff', function () {
            expect(musicParameter.getStaff()).to.be.empty;
        });

        it('Set staff', function () {
            musicParameter.setStaff(new MyScript.MusicStaff());
            expect(musicParameter.getStaff()).not.to.be.undefined;
        });

        it('Get divisions', function () {
            expect(musicParameter.getDivisions()).to.be.empty;
        });

        it('Set divisions', function () {
            musicParameter.setDivisions(480);
            expect(musicParameter.getDivisions()).not.to.be.undefined;
            expect(musicParameter.getDivisions()).to.equal(480);
        });

    });

});