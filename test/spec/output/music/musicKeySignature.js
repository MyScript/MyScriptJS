'use strict';

describe('MyScriptJS: output/music/musicKeySignature.js', function () {

    var expect = require('chai').expect;

    it('MusicKeySignature object exist', function () {
        expect(MyScript.MusicKeySignature).to.exist;
        expect(MyScript.MusicKeySignature).not.to.be.null;
        expect(MyScript.MusicKeySignature).to.not.be.undefined;
    });

    it('MusicKeySignature constructor', function () {
        var musicKeySignature = new MyScript.MusicKeySignature();
        expect(musicKeySignature).to.be.an('object');
        expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicKeySignature);
        expect(musicKeySignature).to.have.ownProperty('accidentals');
    });

    it('MusicKeySignature Signature getter', function () {
        var musicKeySignature = new MyScript.MusicKeySignature();
        expect(musicKeySignature.getSignature()).to.be.undefined;
    });

    it('MusicKeySignature Accidentals getter', function () {
        var musicKeySignature = new MyScript.MusicKeySignature();
        expect(musicKeySignature.getAccidentals()).to.be.empty;
    });
});