'use strict';

describe('MyScriptJS: output/music/musicStem.js', function () {

    var expect = require('chai').expect;

    it('MusicStem object exist', function () {
        expect(MyScript.MusicStem).to.exist;
        expect(MyScript.MusicStem).not.to.be.null;
        expect(MyScript.MusicStem).to.not.be.undefined;
    });

    it('MusicStem constructor', function () {
        var musicStem = new MyScript.MusicStem();
        expect(musicStem).to.be.an('object');
        expect(musicStem).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicStem).to.be.an.instanceof(MyScript.MusicStem);
    });

    it('MusicStem Type getter', function () {
        var musicStem = new MyScript.MusicStem();
        expect(musicStem.getType()).to.be.undefined;
    });

});