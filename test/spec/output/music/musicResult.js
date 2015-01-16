'use strict';

describe('MyScriptJS: output/music/musicResult.js', function () {

    var expect = require('chai').expect;

    it('MusicResult object exist', function () {
        expect(MyScript.MusicResult).to.exist;
        expect(MyScript.MusicResult).not.to.be.null;
        expect(MyScript.MusicResult).to.not.be.undefined;
    });

    it('MusicResult constructor', function () {
        var musicResult = new MyScript.MusicResult();
        expect(musicResult).to.be.an('object');
        expect(musicResult).to.be.an.instanceof(MyScript.AbstractResult);
        expect(musicResult).to.be.an.instanceof(MyScript.MusicResult);
    });

    it('MusicResult Music Document getter', function () {
        var musicResult = new MyScript.MusicResult();
        expect(musicResult.getMusicDocument()).to.be.undefined;
    });
});