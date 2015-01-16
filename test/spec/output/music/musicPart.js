'use strict';

describe('MyScriptJS: output/music/musicPart.js', function () {

    var expect = require('chai').expect;

    it('MusicPart object exist', function () {
        expect(MyScript.MusicPart).to.exist;
        expect(MyScript.MusicPart).not.to.be.null;
        expect(MyScript.MusicPart).to.not.be.undefined;
    });

    it('MusicPart constructor', function () {
        var musicPart = new MyScript.MusicPart();
        expect(musicPart).to.be.an('object');
        expect(musicPart).to.be.an.instanceof(MyScript.MusicPart);
        expect(musicPart).to.have.ownProperty('elements');
    });

    it('MusicPart Elements getter', function () {
        var musicPart = new MyScript.MusicPart();
        expect(musicPart.getElements()).to.be.empty;
    });
});