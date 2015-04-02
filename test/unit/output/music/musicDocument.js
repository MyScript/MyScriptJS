'use strict';

describe('MyScriptJS: output/music/musicDocument.js', function () {

    it('MusicDocument object exist', function () {
        expect(MyScript.MusicDocument).to.exist;
        expect(MyScript.MusicDocument).not.to.be.null;
        expect(MyScript.MusicDocument).to.not.be.undefined;
    });

    var musicDocument = new MyScript.MusicDocument();
    it('MusicDocument constructor', function () {
        expect(musicDocument).to.be.an('object');
        expect(musicDocument).to.be.an.instanceof(MyScript.MusicDocument);
        expect(musicDocument).to.have.ownProperty('results');
        expect(musicDocument).to.have.ownProperty('scratchOutResults');
    });

    it('MusicDocument Result Elements getter', function () {
        expect(musicDocument.getResultElements()).to.be.empty;
    });

    it('MusicDocument Scratch Out Results getter', function () {
        expect(musicDocument.getScratchOutResults()).to.be.empty;
    });

    var obj = {
        results: [{
            type: 'MUSICXML'
        },{
            root: {
                type: 'default'
            }
        }],
        scratchOutResults: [{
            type: 'test'
        }]
    };
    var musicDocument2 = new MyScript.MusicDocument(obj);
    it('Test MusicDocument object construction: MusicXMLResultElement construction', function () {
        expect(musicDocument2.getResultElements()[0]).to.be.an.instanceof(MyScript.MusicXMLResultElement);
    });
    it('Test MusicDocument object construction: MusicScoreTreeResultElement construction', function () {
        expect(musicDocument2.getResultElements()[1]).to.be.an.instanceof(MyScript.MusicScoreTreeResultElement);
    });
    it('Test MusicDocument object construction: MathScratchOut construction', function () {
        expect(musicDocument2.getScratchOutResults()[0]).to.be.an.instanceof(MyScript.MusicScratchOut);
    });
});