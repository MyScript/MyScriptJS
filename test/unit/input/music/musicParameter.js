'use strict';

describe('MusicParameter: input/music/musicParameter.js', function () {

    describe('Default construction', function () {

        var musicParameter;
        before(function (done) {
            musicParameter = new MyScript.MusicParameter();
            done();
        });

        it('check initial state', function () {
            expect(musicParameter).to.be.an('object');
            expect(musicParameter).to.be.an.instanceof(MyScript.AbstractParameter);
            expect(musicParameter).to.be.an.instanceof(MyScript.MusicParameter);
            expect(musicParameter).to.have.ownProperty('resultTypes');
            expect(musicParameter).to.have.ownProperty('userResources');
        });

    });

    describe('Accessors', function () {

        var musicParameter;
        beforeEach(function (done) {
            musicParameter = new MyScript.MusicParameter();
            done();
        });

        it('result types getter', function () {
            expect(musicParameter.getResultTypes()).to.be.empty;
        });

        it('result types setter', function () {
            assert(Array.isArray(musicParameter.getResultTypes()), 'empty ResultType array is an array');

            musicParameter.setResultTypes(['MUSICXML', 'ScoreTree']);
            expect(musicParameter.getResultTypes().length).to.equal(2);
            expect(musicParameter.getResultTypes()[0]).to.equal('MUSICXML');
            expect(musicParameter.getResultTypes()[1]).to.equal('ScoreTree');

        });

        it('user resources getter', function () {
            expect(musicParameter.getUserResources()).to.be.empty;
        });

        it('user resources setter', function () {
            assert(Array.isArray(musicParameter.getUserResources()), 'empty UserResources array is an array');

            musicParameter.setUserResources(['music-ak', 'music-grm-standard']);
            expect(musicParameter.getUserResources().length).to.equal(2);
            expect(musicParameter.getUserResources()[0]).to.equal('music-ak');
            expect(musicParameter.getUserResources()[1]).to.equal('music-grm-standard');
        });

        it('ScratchOut Detection Sensitivity getter', function () {
            expect(musicParameter.getScratchOutDetectionSensitivity()).to.be.empty;
        });

        it('ScratchOut Detection Sensitivity setter', function () {
            expect(musicParameter.getScratchOutDetectionSensitivity()).to.be.undefined;
            musicParameter.setScratchOutDetectionSensitivity(15);
            expect(musicParameter.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(musicParameter.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Staff getter', function () {
            expect(musicParameter.getStaff()).to.be.empty;
        });

        it('Staff setter', function () {
            expect(musicParameter.getStaff()).to.be.undefined;
            musicParameter.setStaff(new MyScript.MusicStaff());
            expect(musicParameter.getStaff()).not.to.be.undefined;
        });

        it('Divisions getter', function () {
            expect(musicParameter.getDivisions()).to.be.empty;
        });

        it('Divisions setter', function () {
            expect(musicParameter.getDivisions()).to.be.undefined;
            musicParameter.setDivisions(480);
            expect(musicParameter.getDivisions()).not.to.be.undefined;
            expect(musicParameter.getDivisions()).to.equal(480);
        });

    });

});