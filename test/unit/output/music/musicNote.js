'use strict';

describe('MyScriptJS: output/music/musicNote.js', function () {

    it('MusicNote object exist', function () {
        expect(MyScript.MusicNote).to.exist;
        expect(MyScript.MusicNote).not.to.be.null;
        expect(MyScript.MusicNote).to.not.be.undefined;
    });

    it('MusicNote constructor', function () {
        var musicNote = new MyScript.MusicNote();
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
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getAccidental()).to.be.undefined;
    });

    it('MusicNote Dots getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getDots()).to.be.undefined;
    });

    it('MusicNote Duration getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getDuration()).to.be.undefined;
    });

    it('MusicNote Head getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getHead()).to.be.undefined;
    });

    it('MusicNote Line getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getLine()).to.be.undefined;
    });

    it('MusicNote Pitch getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getPitch()).to.be.undefined;
    });

    it('MusicNote Start Beam getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStartBeam()).to.be.undefined;
    });

    it('MusicNote Stop Beam getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStopBeam()).to.be.undefined;
    });

    it('MusicNote Stem getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStem()).to.be.undefined;
    });

    it('MusicNote Start Tie getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStartTie()).to.be.undefined;
    });

    it('MusicNote Stop Tie getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStopTie()).to.be.undefined;
    });

    it('MusicNote Start Tuplet getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStartTuplet()).to.be.undefined;
    });

    it('MusicNote Stop Tuplet getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStopTuplet()).to.be.undefined;
    });

    it('MusicNote TimeModification getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getTimeModification()).to.be.undefined;
    });

    it('MusicNote Type getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getType()).to.be.undefined;
    });

    it('MusicNote Decorations getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getDecorations()).to.be.empty;
    });

    it('MusicNote Beam Types getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getBeamTypes()).to.be.empty;
    });

    it('MusicNote Ledger Lines getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getLedgerLines()).to.be.empty;
    });

    it('MusicNote Start Slurs getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStartSlurs()).to.be.empty;
    });

    it('MusicNote Stop Slurs getter', function () {
        var musicNote = new MyScript.MusicNote();
        expect(musicNote.getStopSlurs()).to.be.empty;
    });
});