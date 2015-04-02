'use strict';

describe('MyScriptJS: output/music/musicKeySignatureData.js', function () {

    it('MusicKeySignatureData object exist', function () {
        expect(MyScript.MusicKeySignatureData).to.exist;
        expect(MyScript.MusicKeySignatureData).not.to.be.null;
        expect(MyScript.MusicKeySignatureData).to.not.be.undefined;
    });

    var musicKeySignatureData = new MyScript.MusicKeySignatureData();
    it('MusicKeySignatureData constructor', function () {
        expect(musicKeySignatureData).to.be.an('object');
        expect(musicKeySignatureData).to.be.an.instanceof(MyScript.MusicKeySignatureData);
    });

    it('MusicKeySignatureData Fifths getter', function () {
        expect(musicKeySignatureData.getFifths()).to.be.undefined;
    });

    it('MusicKeySignatureData Cancel getter', function () {
        expect(musicKeySignatureData.getCancel()).to.be.undefined;
    });

    var obj = {
        fifths: [{
            type: 'fifths'
        }],
        cancel: [{
            type: 'cancel'
        }]
    };
    var musicKeySignatureData2 = new MyScript.MusicKeySignatureData(obj);
    it('Test MusicKeySignatureData object construction', function () {
        expect(musicKeySignatureData2.getFifths()).to.not.be.empty;
        expect(musicKeySignatureData2.getCancel()).to.not.be.empty;
    });
});