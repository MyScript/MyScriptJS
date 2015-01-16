'use strict';

describe('MyScriptJS: output/music/musicInputRange.js', function () {

    var expect = require('chai').expect;

    it('MusicInputRange object exist', function () {
        expect(MyScript.MusicInputRange).to.exist;
        expect(MyScript.MusicInputRange).not.to.be.null;
        expect(MyScript.MusicInputRange).to.not.be.undefined;
    });

    it('MusicInputRange constructor', function () {
        var musicInputRange = new MyScript.MusicInputRange();
        expect(musicInputRange).to.be.an('object');
        expect(musicInputRange).to.be.an.instanceof(MyScript.MusicInputRange);
    });

    it('MusicInputRange Component getter', function () {
        var musicInputRange = new MyScript.MusicInputRange();
        expect(musicInputRange.getComponent()).to.be.undefined;
    });

    it('MusicInputRange First Item getter', function () {
        var musicInputRange = new MyScript.MusicInputRange();
        expect(musicInputRange.getFirstItem()).to.be.undefined;
    });

    it('MusicInputRange Last Item getter', function () {
        var musicInputRange = new MyScript.MusicInputRange();
        expect(musicInputRange.getLastItem()).to.be.undefined;
    });

});