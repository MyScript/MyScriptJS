'use strict';

describe('MyScriptJS: output/music/musicTimeModificationData.js', function () {

    it('MusicTimeModificationData object exist', function () {
        expect(MyScript.MusicTimeModificationData).to.exist;
        expect(MyScript.MusicTimeModificationData).not.to.be.null;
        expect(MyScript.MusicTimeModificationData).to.not.be.undefined;
    });

    var musicTimeModificationData = new MyScript.MusicTimeModificationData();
    it('MusicTimeModificationData constructor', function () {
        expect(musicTimeModificationData).to.be.an('object');
        expect(musicTimeModificationData).to.be.an.instanceof(MyScript.MusicTimeModificationData);
    });

    it('MusicTimeModificationData Type getter', function () {
        expect(musicTimeModificationData.getType()).to.be.undefined;
    });

    it('MusicTimeModificationData Actual getter', function () {
        expect(musicTimeModificationData.getActual()).to.be.undefined;
    });

    it('MusicTimeModificationData Dots getter', function () {
        expect(musicTimeModificationData.getDots()).to.be.undefined;
    });

    it('MusicTimeModificationData Normal getter', function () {
        expect(musicTimeModificationData.getNormal()).to.be.undefined;
    });

    var obj = {
        actual: 'actual',
        dots: 'dots',
        normal: 'normal',
        type: 'type'
    };
    var musicTimeModificationData2 = new MyScript.MusicTimeModificationData(obj);
    it('Test MusicTimeModificationData object construction', function () {
        expect(musicTimeModificationData2.getActual()).to.not.be.undefined;
        expect(musicTimeModificationData2.getDots()).to.not.be.undefined;
        expect(musicTimeModificationData2.getNormal()).to.not.be.undefined;
        expect(musicTimeModificationData2.getType()).to.not.be.undefined;
    });
});