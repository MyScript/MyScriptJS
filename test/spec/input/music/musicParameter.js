'use strict';

describe('MyScriptJS: input/music/musicParameter.js', function () {

    var expect = require('chai').expect,
        assert = require('chai').assert;

    it('MusicParameter object exist', function () {
        expect(MyScript.MusicParameter).to.exist;
        expect(MyScript.MusicParameter).not.to.be.null;
        expect(MyScript.MusicParameter).to.not.be.undefined;
    });

    it('MusicParameter constructor', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter).to.be.an('object');
        expect(musicParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(musicParameter).to.be.an.instanceof(MyScript.MusicParameter);
        expect(musicParameter).to.have.ownProperty('resultTypes');
        expect(musicParameter).to.have.ownProperty('userResources');
    });

    it('MusicParameter result types getter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getResultTypes()).to.be.empty;
    });

    it('MusicParameter result types setter', function () {
        var musicParameter = new MyScript.MusicParameter();
        assert(Array.isArray(musicParameter.getResultTypes()), 'empty ResultType array is an array');

        musicParameter.setResultTypes(['MUSICXML', 'ScoreTree']);
        expect(musicParameter.getResultTypes().length).to.equal(2);
        expect(musicParameter.getResultTypes()[0]).to.equal('MUSICXML');
        expect(musicParameter.getResultTypes()[1]).to.equal('ScoreTree');

    });

    it('MusicParameter user resources getter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getUserResources()).to.be.empty;
    });

    it('MusicParameter user resources setter', function () {
        var musicParameter = new MyScript.MusicParameter();
        assert(Array.isArray(musicParameter.getUserResources()), 'empty UserResources array is an array');

        musicParameter.setUserResources(['music-ak', 'music-grm-standard']);
        expect(musicParameter.getUserResources().length).to.equal(2);
        expect(musicParameter.getUserResources()[0]).to.equal('music-ak');
        expect(musicParameter.getUserResources()[1]).to.equal('music-grm-standard');
    });

    it('MusicParameter ScratchOut Detection Sensitivity getter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getScratchOutDetectionSensitivity()).to.be.empty;
    });

    it('MusicParameter ScratchOut Detection Sensitivity setter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getScratchOutDetectionSensitivity()).to.be.undefined;
        musicParameter.setScratchOutDetectionSensitivity(15);
        expect(musicParameter.getScratchOutDetectionSensitivity()).not.to.be.undefined;
        expect(musicParameter.getScratchOutDetectionSensitivity()).to.equal(15);
    });

    it('MusicParameter Staff getter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getStaff()).to.be.empty;
    });

    it('MusicParameter Staff setter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getStaff()).to.be.undefined;
        musicParameter.setStaff(new MyScript.MusicStaff());
        expect(musicParameter.getStaff()).not.to.be.undefined;
    });

    it('MusicParameter Divisions getter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getDivisions()).to.be.empty;
    });

    it('MusicParameter Divisions setter', function () {
        var musicParameter = new MyScript.MusicParameter();
        expect(musicParameter.getDivisions()).to.be.undefined;
        musicParameter.setDivisions(480);
        expect(musicParameter.getDivisions()).not.to.be.undefined;
        expect(musicParameter.getDivisions()).to.equal(480);
    });

});