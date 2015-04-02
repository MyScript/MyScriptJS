'use strict';

describe('MyScriptJS: output/music/musicClef.js', function () {

    it('MusicClef object exist', function () {
        expect(MyScript.MusicClef).to.exist;
        expect(MyScript.MusicClef).not.to.be.null;
        expect(MyScript.MusicClef).to.not.be.undefined;
    });

    it('MusicClef constructor', function () {
        var musicClef = new MyScript.MusicClef();
        expect(musicClef).to.be.an('object');
        expect(musicClef).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicClef).to.be.an.instanceof(MyScript.MusicClef);
    });

    it('MusicClef Line getter', function () {
        var musicClef = new MyScript.MusicClef();
        expect(musicClef.getLine()).to.be.undefined;
    });

    it('MusicClef Octave getter', function () {
        var musicClef = new MyScript.MusicClef();
        expect(musicClef.getOctave()).to.be.undefined;
    });

    it('MusicClef Symbol getter', function () {
        var musicClef = new MyScript.MusicClef();
        expect(musicClef.getSymbol()).to.be.undefined;
    });
});