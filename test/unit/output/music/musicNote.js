'use strict';

describe('MusicNote: output/music/musicNote.js', function () {

    describe('Default construction', function () {

        var musicNote;
        before(function (done) {
            musicNote = new MyScript.MusicNote();
            done();
        });

        it('check initial state', function () {
            expect(musicNote).to.be.an('object');
            expect(musicNote).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicNote).to.be.an.instanceof(MyScript.MusicNote);
            expect(musicNote).to.have.ownProperty('decorations');
            expect(musicNote).to.have.ownProperty('beamTypes');
            expect(musicNote).to.have.ownProperty('ledgerLines');
            expect(musicNote).to.have.ownProperty('startSlurs');
            expect(musicNote).to.have.ownProperty('stopSlurs');
        });

        it('Accidental getter', function () {
            expect(musicNote.getAccidental()).to.be.undefined;
        });

        it('Dots getter', function () {
            expect(musicNote.getDots()).to.be.undefined;
        });

        it('Duration getter', function () {
            expect(musicNote.getDuration()).to.be.undefined;
        });

        it('Head getter', function () {
            expect(musicNote.getHead()).to.be.undefined;
        });

        it('Line getter', function () {
            expect(musicNote.getLine()).to.be.undefined;
        });

        it('Pitch getter', function () {
            expect(musicNote.getPitch()).to.be.undefined;
        });

        it('Start Beam getter', function () {
            expect(musicNote.getStartBeam()).to.be.undefined;
        });

        it('Stop Beam getter', function () {
            expect(musicNote.getStopBeam()).to.be.undefined;
        });

        it('Stem getter', function () {
            expect(musicNote.getStem()).to.be.undefined;
        });

        it('Start Tie getter', function () {
            expect(musicNote.getStartTie()).to.be.undefined;
        });

        it('Stop Tie getter', function () {
            expect(musicNote.getStopTie()).to.be.undefined;
        });

        it('Start Tuplet getter', function () {
            expect(musicNote.getStartTuplet()).to.be.undefined;
        });

        it('Stop Tuplet getter', function () {
            expect(musicNote.getStopTuplet()).to.be.undefined;
        });

        it('TimeModification getter', function () {
            expect(musicNote.getTimeModification()).to.be.undefined;
        });

        it('Type getter', function () {
            expect(musicNote.getType()).to.be.undefined;
        });

        it('Decorations getter', function () {
            expect(musicNote.getDecorations()).to.be.empty;
        });

        it('Beam Types getter', function () {
            expect(musicNote.getBeamTypes()).to.be.empty;
        });

        it('Ledger Lines getter', function () {
            expect(musicNote.getLedgerLines()).to.be.empty;
        });

        it('Start Slurs getter', function () {
            expect(musicNote.getStartSlurs()).to.be.empty;
        });

        it('Stop Slurs getter', function () {
            expect(musicNote.getStopSlurs()).to.be.empty;
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

        it('check initial state', function () {
            expect(musicNote).to.be.an('object');
            expect(musicNote).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicNote).to.be.an.instanceof(MyScript.MusicNote);
            expect(musicNote).to.have.ownProperty('decorations');
            expect(musicNote).to.have.ownProperty('beamTypes');
            expect(musicNote).to.have.ownProperty('ledgerLines');
            expect(musicNote).to.have.ownProperty('startSlurs');
            expect(musicNote).to.have.ownProperty('stopSlurs');
        });

        it('Test MusicNote object construction: MusicDecoration construction', function () {
            expect(musicNote.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
        });

        it('Test MusicNote object construction: beam types construction', function () {
            expect(musicNote.getBeamTypes()[0]).to.not.be.empty;
        });

        it('Test MusicNote object construction: MusicLedgerLine construction', function () {
            expect(musicNote.getLedgerLines()[0]).to.be.an.instanceof(MyScript.MusicLedgerLine);
        });

        it('Test MusicNote object construction: start MusicSlur construction', function () {
            expect(musicNote.getStartSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
        });

        it('Test MusicNote object construction: stop MusicSlur construction', function () {
            expect(musicNote.getStopSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
        });

    });

});