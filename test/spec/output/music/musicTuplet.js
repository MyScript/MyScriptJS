'use strict';

describe('MyScriptJS: output/music/musicTuplet.js', function () {

    it('MusicTuplet object exist', function () {
        expect(MyScript.MusicTuplet).to.exist;
        expect(MyScript.MusicTuplet).not.to.be.null;
        expect(MyScript.MusicTuplet).to.not.be.undefined;
    });

    it('MusicTuplet constructor', function () {
        var MusicTuplet = new MyScript.MusicTuplet();
        expect(MusicTuplet).to.be.an('object');
        expect(MusicTuplet).to.be.an.instanceof(MyScript.MusicElement);
        expect(MusicTuplet).to.be.an.instanceof(MyScript.MusicTuplet);
        expect(MusicTuplet).to.have.ownProperty('brackets');
    });

    it('MusicTuplet Placement getter', function () {
        var MusicTuplet = new MyScript.MusicTuplet();
        expect(MusicTuplet.getPlacement()).to.be.undefined;
    });

    it('MusicTuplet Number getter', function () {
        var MusicTuplet = new MyScript.MusicTuplet();
        expect(MusicTuplet.getNumber()).to.be.undefined;
    });

});