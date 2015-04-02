'use strict';

describe('MyScriptJS: output/music/musicRest.js', function () {

    it('MusicRest object exist', function () {
        expect(MyScript.MusicRest).to.exist;
        expect(MyScript.MusicRest).not.to.be.null;
        expect(MyScript.MusicRest).to.not.be.undefined;
    });

    var musicRest = new MyScript.MusicRest();
    it('MusicRest constructor', function () {
        expect(musicRest).to.be.an('object');
        expect(musicRest).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicRest).to.be.an.instanceof(MyScript.MusicRest);
        expect(musicRest).to.have.ownProperty('decorations');
        expect(musicRest).to.have.ownProperty('startSlurs');
        expect(musicRest).to.have.ownProperty('stopSlurs');
    });

    it('MusicRest Type getter', function () {
        expect(musicRest.getType()).to.be.undefined;
    });

    it('MusicRest Dots getter', function () {
        expect(musicRest.getDots()).to.be.undefined;
    });

    it('MusicRest Duration getter', function () {
        expect(musicRest.getDuration()).to.be.undefined;
    });

    it('MusicRest Decorations getter', function () {
        expect(musicRest.getDecorations()).to.be.empty;
    });

    it('MusicRest Start Slurs getter', function () {
        expect(musicRest.getStartSlurs()).to.be.empty;
    });

    it('MusicRest Stop Slurs getter', function () {
        expect(musicRest.getStopSlurs()).to.be.empty;
    });

    it('MusicRest Start Tuplet getter', function () {
        expect(musicRest.getStartTuplet()).to.be.undefined;
    });

    it('MusicRest Stop Tuplet getter', function () {
        expect(musicRest.getStopTuplet()).to.be.undefined;
    });

    it('MusicRest TimeModification getter', function () {
        expect(musicRest.getTimeModification()).to.be.undefined;
    });

    var obj = {
        decorations: [{
            type: 'decoration'
        }],
        startSlurs: [{
            type: 'startSlur'
        }],
        stopSlurs: [{
            type: 'stopSlur'
        }]
    };
    var musicRest2 = new MyScript.MusicRest(obj);
    it('Test MusicRest object construction: MusicDecoration construction', function () {
        expect(musicRest2.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
    });
    it('Test MusicRest object construction: start MusicSlur construction', function () {
        expect(musicRest2.getStartSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });
    it('Test MusicRest object construction: stop MusicSlur construction', function () {
        expect(musicRest2.getStopSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });

});