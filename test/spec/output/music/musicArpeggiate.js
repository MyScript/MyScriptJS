'use strict';

describe('MyScriptJS: output/music/musicArpeggiate.js', function () {

    var expect = require('chai').expect;

    it('MusicArpeggiate object exist', function () {
        expect(MyScript.MusicArpeggiate).to.exist;
        expect(MyScript.MusicArpeggiate).not.to.be.null;
        expect(MyScript.MusicArpeggiate).to.not.be.undefined;
    });

    it('MusicArpeggiate constructor', function () {
        var musicArpeggiate = new MyScript.MusicArpeggiate();
        expect(musicArpeggiate).to.be.an('object');
        expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicArpeggiate).to.be.an.instanceof(MyScript.MusicArpeggiate);
    });

    it('MusicArpeggiate Type getter', function () {
        var musicArpeggiate = new MyScript.MusicArpeggiate();
        expect(musicArpeggiate.getType()).to.be.undefined;
    });

});