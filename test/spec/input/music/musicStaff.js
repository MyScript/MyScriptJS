'use strict';

describe('MyScriptJS: input/music/musicStaff.js', function () {

    var expect = require('chai').expect;

    it('MusicStaff object exist', function () {
        expect(MyScript.MusicStaff).to.exist;
        expect(MyScript.MusicStaff).not.to.be.null;
        expect(MyScript.MusicStaff).to.not.be.undefined;
    });

    it('MusicStaff constructor', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff).to.be.an('object');
        expect(musicStaff).to.be.an.instanceof(MyScript.MusicStaff);
    });

    it('MusicStaff count getter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getCount()).to.be.undefined;
    });

    it('MusicStaff count setter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getCount()).to.be.undefined;
        musicStaff.setCount(5);
        expect(musicStaff.getCount()).not.to.be.undefined;
        expect(musicStaff.getCount()).to.equal(5);
    });

    it('MusicStaff top getter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getTop()).to.be.undefined;
    });

    it('MusicStaff count setter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getTop()).to.be.undefined;
        musicStaff.setTop(150);
        expect(musicStaff.getTop()).not.to.be.undefined;
        expect(musicStaff.getTop()).to.equal(150);
    });

    it('MusicStaff gap getter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getGap()).to.be.undefined;
    });

    it('MusicStaff gap setter', function () {
        var musicStaff = new MyScript.MusicStaff();
        expect(musicStaff.getGap()).to.be.undefined;
        musicStaff.setGap(10);
        expect(musicStaff.getGap()).not.to.be.undefined;
        expect(musicStaff.getGap()).to.equal(10);
    });

});