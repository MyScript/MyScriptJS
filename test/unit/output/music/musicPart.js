'use strict';

describe('MyScriptJS: output/music/musicPart.js', function () {

    it('MusicPart object exist', function () {
        expect(MyScript.MusicPart).to.exist;
        expect(MyScript.MusicPart).not.to.be.null;
        expect(MyScript.MusicPart).to.not.be.undefined;
    });

    var musicPart = new MyScript.MusicPart();
    it('MusicPart constructor', function () {
        expect(musicPart).to.be.an('object');
        expect(musicPart).to.be.an.instanceof(MyScript.MusicPart);
        expect(musicPart).to.have.ownProperty('elements');
    });

    it('MusicPart Elements getter', function () {
        expect(musicPart.getElements()).to.be.empty;
    });

    var obj = {
        elements: [{
            elementType: 'accidental'
        }, {
            elementType: 'annotation'
        }, {
            elementType: 'arpeggiate'
        }, {
            elementType: 'bar'
        }, {
            elementType: 'beam'
        }, {
            elementType: 'chord'
        }, {
            elementType: 'clef'
        }, {
            elementType: 'decoration'
        }, {
            elementType: 'dots'
        }, {
            elementType: 'head'
        }, {
            elementType: 'keySignature'
        }, {
            elementType: 'ledgerLine'
        }, {
            elementType: 'note'
        }, {
            elementType: 'rest'
        }, {
            elementType: 'slur'
        }, {
            elementType: 'stem'
        }, {
            elementType: 'tie'
        }, {
            elementType: 'timeSignature'
        }, {
            elementType: 'tuplet'
        }, {
            elementType: 'tupletBracket'
        }]
    };

    var musicPart2 = new MyScript.MusicPart(obj);
    it('Test MusicPart object construction: MusicAccidental construction', function () {
        expect(musicPart2.getElements()[0]).to.be.an.instanceof(MyScript.MusicAccidental);
    });
    it('Test MusicPart object construction: MusicAnnotation construction', function () {
        expect(musicPart2.getElements()[1]).to.be.an.instanceof(MyScript.MusicAnnotation);
    });
    it('Test MusicPart object construction: MusicArpeggiate construction', function () {
        expect(musicPart2.getElements()[2]).to.be.an.instanceof(MyScript.MusicArpeggiate);
    });
    it('Test MusicPart object construction: MusicBar construction', function () {
        expect(musicPart2.getElements()[3]).to.be.an.instanceof(MyScript.MusicBar);
    });
    it('Test MusicPart object construction: MusicBeam construction', function () {
        expect(musicPart2.getElements()[4]).to.be.an.instanceof(MyScript.MusicBeam);
    });
    it('Test MusicPart object construction: MusicChord construction', function () {
        expect(musicPart2.getElements()[5]).to.be.an.instanceof(MyScript.MusicChord);
    });
    it('Test MusicPart object construction: MusicClef construction', function () {
        expect(musicPart2.getElements()[6]).to.be.an.instanceof(MyScript.MusicClef);
    });
    it('Test MusicPart object construction: MusicDecoration construction', function () {
        expect(musicPart2.getElements()[7]).to.be.an.instanceof(MyScript.MusicDecoration);
    });
    it('Test MusicPart object construction: MusicDots construction', function () {
        expect(musicPart2.getElements()[8]).to.be.an.instanceof(MyScript.MusicDots);
    });
    it('Test MusicPart object construction: MusicHead construction', function () {
        expect(musicPart2.getElements()[9]).to.be.an.instanceof(MyScript.MusicHead);
    });
    it('Test MusicPart object construction: MusicKeySignature construction', function () {
        expect(musicPart2.getElements()[10]).to.be.an.instanceof(MyScript.MusicKeySignature);
    });
    it('Test MusicPart object construction: MusicLedgerLine construction', function () {
        expect(musicPart2.getElements()[11]).to.be.an.instanceof(MyScript.MusicLedgerLine);
    });
    it('Test MusicPart object construction: MusicNote construction', function () {
        expect(musicPart2.getElements()[12]).to.be.an.instanceof(MyScript.MusicNote);
    });
    it('Test MusicPart object construction: MusicRest construction', function () {
        expect(musicPart2.getElements()[13]).to.be.an.instanceof(MyScript.MusicRest);
    });
    it('Test MusicPart object construction: MusicSlur construction', function () {
        expect(musicPart2.getElements()[14]).to.be.an.instanceof(MyScript.MusicSlur);
    });
    it('Test MusicPart object construction: MusicStem construction', function () {
        expect(musicPart2.getElements()[15]).to.be.an.instanceof(MyScript.MusicStem);
    });
    it('Test MusicPart object construction: MusicTie construction', function () {
        expect(musicPart2.getElements()[16]).to.be.an.instanceof(MyScript.MusicTie);
    });
    it('Test MusicPart object construction: MusicTimeSignature construction', function () {
        expect(musicPart2.getElements()[17]).to.be.an.instanceof(MyScript.MusicTimeSignature);
    });
    it('Test MusicPart object construction: MusicTuplet construction', function () {
        expect(musicPart2.getElements()[18]).to.be.an.instanceof(MyScript.MusicTuplet);
    });
    it('Test MusicPart object construction: MusicTupletBracket construction', function () {
        expect(musicPart2.getElements()[19]).to.be.an.instanceof(MyScript.MusicTupletBracket);
    });
});