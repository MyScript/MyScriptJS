'use strict';

describe('MyScriptJS: output/music/musicTimeSignature.js', function () {

    var expect = require('chai').expect;

    it('MusicTimeSignature object exist', function () {
        expect(MyScript.MusicTimeSignature).to.exist;
        expect(MyScript.MusicTimeSignature).not.to.be.null;
        expect(MyScript.MusicTimeSignature).to.not.be.undefined;
    });

    it('MusicTimeSignature constructor', function () {
        var musicTimeSignature = new MyScript.MusicTimeSignature();
        expect(musicTimeSignature).to.be.an('object');
        expect(musicTimeSignature).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicTimeSignature).to.be.an.instanceof(MyScript.MusicTimeSignature);
    });

    it('MusicTimeSignature Top getter', function () {
        var musicTimeSignature = new MyScript.MusicTimeSignature();
        expect(musicTimeSignature.getTop()).to.be.undefined;
    });

    it('MusicTimeSignature Bottom getter', function () {
        var musicTimeSignature = new MyScript.MusicTimeSignature();
        expect(musicTimeSignature.getBottom()).to.be.undefined;
    });

    it('MusicTimeSignature Type getter', function () {
        var musicTimeSignature = new MyScript.MusicTimeSignature();
        expect(musicTimeSignature.getType()).to.be.undefined;
    });
});