'use strict';

describe('MyScriptJS: output/music/musicArpeggiate.js', function () {

    it('MusicArpeggiate object exist', function () {
        expect(MyScript.MusicArpeggiate).to.exist;
        expect(MyScript.MusicArpeggiate).not.to.be.null;
        expect(MyScript.MusicArpeggiate).to.not.be.undefined;
    });

    var musicArpeggiate = new MyScript.MusicArpeggiate();
    it('MusicArpeggiate constructor', function () {
        expect(musicArpeggiate).to.be.an('object');
        expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicArpeggiate);
    });

    it('MusicArpeggiate Type getter', function () {
        expect(musicArpeggiate.getType()).to.be.undefined;
    });

    var obj = {
        type: 'arpeggiate'
    };
    var musicArpeggiate2 = new MyScript.MusicArpeggiate(obj);
    it('Test MusicArpeggiate object construction', function () {
        expect(musicArpeggiate2.getType()).to.not.be.undefined;
    });

});