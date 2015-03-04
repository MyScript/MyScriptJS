'use strict';

describe('MyScriptJS: output/music/musicTuplet.js', function () {

    it('MusicTuplet object exist', function () {
        expect(MyScript.MusicTuplet).to.exist;
        expect(MyScript.MusicTuplet).not.to.be.null;
        expect(MyScript.MusicTuplet).to.not.be.undefined;
    });

    var musicTuplet = new MyScript.MusicTuplet();
    it('MusicTuplet constructor', function () {
        expect(musicTuplet).to.be.an('object');
        expect(musicTuplet).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicTuplet).to.be.an.instanceof(MyScript.MusicTuplet);
        expect(musicTuplet).to.have.ownProperty('brackets');
    });

    it('MusicTuplet Placement getter', function () {
        expect(musicTuplet.getPlacement()).to.be.undefined;
    });

    it('MusicTuplet Number getter', function () {
        expect(musicTuplet.getNumber()).to.be.undefined;
    });

    var obj = {
        brackets: [{
            type: 'bracket'
        }]
    };
    var musicTuplet2 = new MyScript.MusicTuplet(obj);
    it('Test MusicTuplet object construction: MusicTupletBracket construction', function () {
        expect(musicTuplet2.getBrackets()[0]).to.be.an.instanceof(MyScript.MusicTupletBracket);
    });


});