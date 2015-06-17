'use strict';

describe('MusicNote: output/music/musicNote.js', function () {

    describe('Default construction', function () {

        var musicNote;
        before(function (done) {
            musicNote = new MyScript.MusicNote();
            done();
        });

        it('Check initial state', function () {
            expect(musicNote).to.be.an('object');
            expect(musicNote).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicNote).to.be.an.instanceOf(MyScript.MusicNote);
            expect(musicNote).to.have.ownProperty('decorations');
            expect(musicNote).to.have.ownProperty('beamTypes');
            expect(musicNote).to.have.ownProperty('ledgerLines');
            expect(musicNote).to.have.ownProperty('startSlurs');
            expect(musicNote).to.have.ownProperty('stopSlurs');
        });

        it('Get accidental', function () {
            expect(musicNote.getAccidental()).to.equal(undefined);
        });

        it('Get dots', function () {
            expect(musicNote.getDots()).to.equal(undefined);
        });

        it('Get duration', function () {
            expect(musicNote.getDuration()).to.equal(undefined);
        });

        it('Get head', function () {
            expect(musicNote.getHead()).to.equal(undefined);
        });

        it('Get line', function () {
            expect(musicNote.getLine()).to.equal(undefined);
        });

        it('Get pitch', function () {
            expect(musicNote.getPitch()).to.equal(undefined);
        });

        it('Get start beam', function () {
            expect(musicNote.getStartBeam()).to.equal(undefined);
        });

        it('Get stop beam', function () {
            expect(musicNote.getStopBeam()).to.equal(undefined);
        });

        it('Get stem', function () {
            expect(musicNote.getStem()).to.equal(undefined);
        });

        it('Get start tie', function () {
            expect(musicNote.getStartTie()).to.equal(undefined);
        });

        it('Get stop tie', function () {
            expect(musicNote.getStopTie()).to.equal(undefined);
        });

        it('Get start tuplet', function () {
            expect(musicNote.getStartTuplet()).to.equal(undefined);
        });

        it('Get stop tuplet', function () {
            expect(musicNote.getStopTuplet()).to.equal(undefined);
        });

        it('Get time modification', function () {
            expect(musicNote.getTimeModification()).to.equal(undefined);
        });

        it('Get type', function () {
            expect(musicNote.getType()).to.equal(undefined);
        });

        it('Get decorations', function () {
            expect(musicNote.getDecorations().length).to.equal(0);
        });

        it('Get beam types', function () {
            expect(musicNote.getBeamTypes().length).to.equal(0);
        });

        it('Get ledger lines', function () {
            expect(musicNote.getLedgerLines().length).to.equal(0);
        });

        it('Get start slurs', function () {
            expect(musicNote.getStartSlurs().length).to.equal(0);
        });

        it('Get stop slurs', function () {
            expect(musicNote.getStopSlurs().length).to.equal(0);
        });

    });

    describe('JSON construction', function () {

        var musicNote;
        before(function (done) {
            musicNote = new MyScript.MusicNote({
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
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicNote).to.be.an('object');
            expect(musicNote).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicNote).to.be.an.instanceOf(MyScript.MusicNote);
            expect(musicNote).to.have.ownProperty('decorations');
            expect(musicNote).to.have.ownProperty('beamTypes');
            expect(musicNote).to.have.ownProperty('ledgerLines');
            expect(musicNote).to.have.ownProperty('startSlurs');
            expect(musicNote).to.have.ownProperty('stopSlurs');
        });

        it('Get decorations', function () {
            expect(musicNote.getDecorations().length).to.equal(1);
            expect(musicNote.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Get beam types', function () {
            expect(musicNote.getBeamTypes().length).to.equal(1);
        });

        it('Get ledger lines', function () {
            expect(musicNote.getLedgerLines().length).to.equal(1);
            expect(musicNote.getLedgerLines()[0]).to.be.an.instanceOf(MyScript.MusicLedgerLine);
        });

        it('Get start slurs', function () {
            expect(musicNote.getStartSlurs().length).to.equal(1);
            expect(musicNote.getStartSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Get stop slurs', function () {
            expect(musicNote.getStopSlurs().length).to.equal(1);
            expect(musicNote.getStopSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

    });

});