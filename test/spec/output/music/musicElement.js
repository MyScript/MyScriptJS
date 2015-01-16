'use strict';

describe('MyScriptJS: output/music/musicElement.js', function () {

    it('MusicElement object exist', function () {
        expect(MyScript.MusicElement).to.exist;
        expect(MyScript.MusicElement).not.to.be.null;
        expect(MyScript.MusicElement).to.not.be.undefined;
    });

    it('MusicElement constructor', function () {
        var musicElement = new MyScript.MusicElement();
        expect(musicElement).to.be.an('object');
        expect(musicElement).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicElement).to.have.ownProperty('inputRanges');
    });

    it('MusicElement Element Type getter', function () {
        var musicElement = new MyScript.MusicElement();
        expect(musicElement.getElementType()).to.be.undefined;
    });

    it('MusicElement Input Ranges getter', function () {
        var musicElement = new MyScript.MusicElement();
        expect(musicElement.getInputRanges()).to.be.empty;
    });
});