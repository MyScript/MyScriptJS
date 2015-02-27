'use strict';

describe('MyScriptJS: input/music/components/musicClefInput.js', function () {

    it('MusicClefInput object exist', function () {
        expect(MyScript.MusicClefInput).to.exist;
        expect(MyScript.MusicClefInput).not.to.be.null;
        expect(MyScript.MusicClefInput).to.not.be.undefined;
    });

    it('MusicClefInput constructor', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        expect(musicClefInput).to.be.an('object');
        expect(musicClefInput).to.be.an.instanceof(MyScript.MusicClefInput);
    });

    it('MusicClefInput Y Anchor getter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        expect(musicClefInput.getYAnchor()).to.be.undefined;
    });

    it('MusicClefInput Y Anchor setter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        expect(musicClefInput.getYAnchor()).to.be.undefined;
        musicClefInput.setYAnchor(3.6);
        expect(musicClefInput.getYAnchor()).to.be.equal(3.6);
    });

    it('MusicClefInput Octave getter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        expect(musicClefInput.getOctave()).not.to.be.undefined;
        expect(musicClefInput.getOctave()).to.be.equal(0);
    });

    it('MusicClefInput Octave setter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        musicClefInput.setOctave(7);
        expect(musicClefInput.getOctave()).to.be.equal(7);
    });

    it('MusicClefInput Symbol getter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        expect(musicClefInput.getSymbol()).not.to.be.undefined;
        expect(musicClefInput.getSymbol()).to.be.equal('G');
    });

    it('MusicClefInput Symbol setter', function () {
        var musicClefInput = new MyScript.MusicClefInput();
        musicClefInput.setSymbol('G');
        expect(musicClefInput.getSymbol()).not.to.be.undefined;
        expect(musicClefInput.getSymbol()).to.be.equal('G');
    });
});