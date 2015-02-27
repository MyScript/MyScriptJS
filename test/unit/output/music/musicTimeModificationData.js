'use strict';

describe('MyScriptJS: output/music/musicTimeModificationData.js', function () {

    it('MusicTimeModificationData object exist', function () {
        expect(MyScript.MusicTimeModificationData).to.exist;
        expect(MyScript.MusicTimeModificationData).not.to.be.null;
        expect(MyScript.MusicTimeModificationData).to.not.be.undefined;
    });

    it('MusicTimeModificationData constructor', function () {
        var MusicTimeModificationData = new MyScript.MusicTimeModificationData();
        expect(MusicTimeModificationData).to.be.an('object');
        expect(MusicTimeModificationData).to.be.an.instanceof(MyScript.MusicTimeModificationData);
    });

    it('MusicTimeModificationData Type getter', function () {
        var MusicTimeModificationData = new MyScript.MusicTimeModificationData();
        expect(MusicTimeModificationData.getType()).to.be.undefined;
    });

    it('MusicTimeModificationData Actual getter', function () {
        var MusicTimeModificationData = new MyScript.MusicTimeModificationData();
        expect(MusicTimeModificationData.getActual()).to.be.undefined;
    });

    it('MusicTimeModificationData Dots getter', function () {
        var MusicTimeModificationData = new MyScript.MusicTimeModificationData();
        expect(MusicTimeModificationData.getDots()).to.be.undefined;
    });

    it('MusicTimeModificationData Normal getter', function () {
        var MusicTimeModificationData = new MyScript.MusicTimeModificationData();
        expect(MusicTimeModificationData.getNormal()).to.be.undefined;
    });
});