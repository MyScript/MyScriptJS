'use strict';

describe('MyScriptJS: output/music/musicAnnotation.js', function () {

    it('MusicAnnotation object exist', function () {
        expect(MyScript.MusicAnnotation).to.exist;
        expect(MyScript.MusicAnnotation).not.to.be.null;
        expect(MyScript.MusicAnnotation).to.not.be.undefined;
    });

    var musicAnnotation = new MyScript.MusicAnnotation();
    it('MusicAnnotation constructor', function () {
        expect(musicAnnotation).to.be.an('object');
        expect(musicAnnotation).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicAnnotation).to.be.an.instanceof(MyScript.MusicAnnotation);
    });

    it('MusicAnnotation Label getter', function () {
        expect(musicAnnotation.getLabel()).to.be.undefined;
    });

    var obj = {
        label: 'test'
    };
    var musicAnnotation2 = new MyScript.MusicAnnotation(obj);
    it('Test MusicAnnotation object construction', function () {
        expect(musicAnnotation2.getLabel()).to.not.be.undefined;
    });

});