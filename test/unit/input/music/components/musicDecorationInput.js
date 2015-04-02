'use strict';

describe('MyScriptJS: input/music/components/musicDecorationInput.js', function () {

    it('MusicDecorationInput object exist', function () {
        expect(MyScript.MusicDecorationInput).to.exist;
        expect(MyScript.MusicDecorationInput).not.to.be.null;
        expect(MyScript.MusicDecorationInput).to.not.be.undefined;
    });

    it('MusicDecorationInput constructor', function () {
        var musicDecorationInput = new MyScript.MusicDecorationInput();
        expect(musicDecorationInput).to.be.an('object');
        expect(musicDecorationInput).to.be.an.instanceof(MyScript.MusicDecorationInput);
    });

    it('MusicDecorationInput Symbol getter', function () {
        var musicDecorationInput = new MyScript.MusicDecorationInput();
        expect(musicDecorationInput.getSymbol()).to.be.undefined;
    });

    it('MusicDecorationInput Symbol setter', function () {
        var musicDecorationInput = new MyScript.MusicDecorationInput();
        expect(musicDecorationInput.getSymbol()).to.be.undefined;
        musicDecorationInput.setSymbol('STACCATISSIMO');
        expect(musicDecorationInput.getSymbol()).not.to.be.undefined;
        expect(musicDecorationInput.getSymbol()).to.be.equal('STACCATISSIMO');
    });

    it('MusicDecorationInput Placement getter', function () {
        var musicDecorationInput = new MyScript.MusicDecorationInput();
        expect(musicDecorationInput.getPlacement()).to.be.undefined;
    });

    it('MusicDecorationInput Placement setter', function () {
        var musicDecorationInput = new MyScript.MusicDecorationInput();
        expect(musicDecorationInput.getPlacement()).to.be.undefined;
        musicDecorationInput.setPlacement('BELOW');
        expect(musicDecorationInput.getPlacement()).not.to.be.undefined;
        expect(musicDecorationInput.getPlacement()).to.be.equal('BELOW');
    });
});