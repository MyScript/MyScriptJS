'use strict';

describe('MyScriptJS: output/music/musicAnnotation.js', function () {

    var expect = require('chai').expect;

    it('MusicAnnotation object exist', function () {
        expect(MyScript.MusicAnnotation).to.exist;
        expect(MyScript.MusicAnnotation).not.to.be.null;
        expect(MyScript.MusicAnnotation).to.not.be.undefined;
    });

    it('MusicAnnotation constructor', function () {
        var musicAnnotation = new MyScript.MusicAnnotation();
        expect(musicAnnotation).to.be.an('object');
        expect(musicAnnotation).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicAnnotation).to.be.an.instanceof(MyScript.MusicAnnotation);
    });

    it('MusicAnnotation Label getter', function () {
        var musicAnnotation = new MyScript.MusicAnnotation();
        expect(musicAnnotation.getLabel()).to.be.undefined;
    });

});