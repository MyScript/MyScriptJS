'use strict';

describe('MyScriptJS: output/music/musicNote.js', function () {

    it('MusicNote object exist', function () {
        expect(MyScript.MusicNote).to.exist;
        expect(MyScript.MusicNote).not.to.be.null;
        expect(MyScript.MusicNote).to.not.be.undefined;
    });

    var musicNote = new MyScript.MusicNote();
    it('MusicNote constructor', function () {
        expect(musicNote).to.be.an('object');
        expect(musicNote).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicNote).to.be.an.instanceof(MyScript.MusicNote);
        expect(musicNote).to.have.ownProperty('decorations');
        expect(musicNote).to.have.ownProperty('beamTypes');
        expect(musicNote).to.have.ownProperty('ledgerLines');
        expect(musicNote).to.have.ownProperty('startSlurs');
        expect(musicNote).to.have.ownProperty('stopSlurs');
    });

    it('MusicNote Accidental getter', function () {
        expect(musicNote.getAccidental()).to.be.undefined;
    });

    it('MusicNote Dots getter', function () {
        expect(musicNote.getDots()).to.be.undefined;
    });

    it('MusicNote Duration getter', function () {
        expect(musicNote.getDuration()).to.be.undefined;
    });

    it('MusicNote Head getter', function () {
        expect(musicNote.getHead()).to.be.undefined;
    });

    it('MusicNote Line getter', function () {
        expect(musicNote.getLine()).to.be.undefined;
    });

    it('MusicNote Pitch getter', function () {
        expect(musicNote.getPitch()).to.be.undefined;
    });

    it('MusicNote Start Beam getter', function () {
        expect(musicNote.getStartBeam()).to.be.undefined;
    });

    it('MusicNote Stop Beam getter', function () {
        expect(musicNote.getStopBeam()).to.be.undefined;
    });

    it('MusicNote Stem getter', function () {
        expect(musicNote.getStem()).to.be.undefined;
    });

    it('MusicNote Start Tie getter', function () {
        expect(musicNote.getStartTie()).to.be.undefined;
    });

    it('MusicNote Stop Tie getter', function () {
        expect(musicNote.getStopTie()).to.be.undefined;
    });

    it('MusicNote Start Tuplet getter', function () {
        expect(musicNote.getStartTuplet()).to.be.undefined;
    });

    it('MusicNote Stop Tuplet getter', function () {
        expect(musicNote.getStopTuplet()).to.be.undefined;
    });

    it('MusicNote TimeModification getter', function () {
        expect(musicNote.getTimeModification()).to.be.undefined;
    });

    it('MusicNote Type getter', function () {
        expect(musicNote.getType()).to.be.undefined;
    });

    it('MusicNote Decorations getter', function () {
        expect(musicNote.getDecorations()).to.be.empty;
    });

    it('MusicNote Beam Types getter', function () {
        expect(musicNote.getBeamTypes()).to.be.empty;
    });

    it('MusicNote Ledger Lines getter', function () {
        expect(musicNote.getLedgerLines()).to.be.empty;
    });

    it('MusicNote Start Slurs getter', function () {
        expect(musicNote.getStartSlurs()).to.be.empty;
    });

    it('MusicNote Stop Slurs getter', function () {
        expect(musicNote.getStopSlurs()).to.be.empty;
    });

    var obj = {
        decorations: [{
            type: 'decoration'
        }],
        beamTypes: [{
            type: 'beamType'
        }],
        ledgerLines: [{
            type: 'ledgerLine'
        }],
        startSlurs: [{
            type: 'startSlur'
        }],
        stopSlurs: [{
            type: 'stopSlur'
        }]
    };
    var musicNote2 = new MyScript.MusicNote(obj);
    it('Test MusicNote object construction: MusicDecoration construction', function () {
        expect(musicNote2.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
    });
    it('Test MusicNote object construction: beam types construction', function () {
        expect(musicNote2.getBeamTypes()[0]).to.not.be.empty;
    });
    it('Test MusicNote object construction: MusicLedgerLine construction', function () {
        expect(musicNote2.getLedgerLines()[0]).to.be.an.instanceof(MyScript.MusicLedgerLine);
    });
    it('Test MusicNote object construction: start MusicSlur construction', function () {
        expect(musicNote2.getStartSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });
    it('Test MusicNote object construction: stop MusicSlur construction', function () {
        expect(musicNote2.getStopSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });
});