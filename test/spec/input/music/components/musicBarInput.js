'use strict';

describe('MyScriptJS: input/music/components/musicBarInput.js', function () {

    it('MusicBarInput object exist', function () {
        expect(MyScript.MusicBarInput).to.exist;
        expect(MyScript.MusicBarInput).not.to.be.null;
        expect(MyScript.MusicBarInput).to.not.be.undefined;
    });

    it('MusicBarInput constructor', function () {
        var musicBarInput = new MyScript.MusicBarInput();
        expect(musicBarInput).to.be.an('object');
        expect(musicBarInput).to.be.an.instanceof(MyScript.MusicBarInput);
    });

    it('MusicBarInput Repeat Direction getter', function () {
        var musicBarInput = new MyScript.MusicBarInput();
        expect(musicBarInput.getRepeatDirection()).to.be.undefined;
    });

    it('MusicBarInput Repeat Direction setter', function () {
        var musicBarInput = new MyScript.MusicBarInput();
        expect(musicBarInput.getRepeatDirection()).to.be.undefined;
        musicBarInput.setRepeatDirection('FORWARD');
        expect(musicBarInput.getRepeatDirection()).to.equal('FORWARD');
    });

    it('MusicBarInput Style getter', function () {
        var musicBarInput = new MyScript.MusicBarInput();
        expect(musicBarInput.getStyle()).to.be.undefined;
    });

    it('MusicBarInput Style setter', function () {
        var musicBarInput = new MyScript.MusicBarInput();
        expect(musicBarInput.getStyle()).to.be.undefined;
        musicBarInput.setStyle('LIGHT_LIGHT');
        expect(musicBarInput.getStyle()).to.equal('LIGHT_LIGHT');
    });
});