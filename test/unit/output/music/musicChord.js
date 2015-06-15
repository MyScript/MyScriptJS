'use strict';

describe('MusicChord: output/music/musicChord.js', function () {

    describe('Default construction', function () {

        var musicChord;
        before(function (done) {
            musicChord = new MyScript.MusicChord();
            done();
        });

        it('Check initial state', function () {
            expect(musicChord).to.be.an('object');
            expect(musicChord).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicChord).to.be.an.instanceOf(MyScript.MusicChord);
            expect(musicChord).to.have.ownProperty('decorations');
            expect(musicChord).to.have.ownProperty('notes');
            expect(musicChord).to.have.ownProperty('beamTypes');
            expect(musicChord).to.have.ownProperty('ledgerLines');
            expect(musicChord).to.have.ownProperty('startSlurs');
            expect(musicChord).to.have.ownProperty('stopSlurs');
        });

        it('Duration getter', function () {
            expect(musicChord.getDuration()).to.be.undefined;
        });

        it('Arpeggiate getter', function () {
            expect(musicChord.getArpeggiate()).to.be.undefined;
        });
        it('Start Beam getter', function () {
            expect(musicChord.getStartBeam()).to.be.undefined;
        });

        it('Stop Beam getter', function () {
            expect(musicChord.getStopBeam()).to.be.undefined;
        });

        it('Stem getter', function () {
            expect(musicChord.getStem()).to.be.undefined;
        });

        it('Decorations getter', function () {
            expect(musicChord.getDecorations()).to.be.empty;
        });

        it('Notes getter', function () {
            expect(musicChord.getNotes()).to.be.empty;
        });

        it('Beam Types getter', function () {
            expect(musicChord.getBeamTypes()).to.be.empty;
        });

        it('Ledger Lines getter', function () {
            expect(musicChord.getLedgerLines()).to.be.empty;
        });

        it('Start Slurs getter', function () {
            expect(musicChord.getStartSlurs()).to.be.empty;
        });

        it('Stop Slurs getter', function () {
            expect(musicChord.getStopSlurs()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicChord;
        before(function (done) {
            musicChord = new MyScript.MusicChord({
                decorations: [{
                    type: 'decoration'
                }],
                notes: [{
                    type: 'note'
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
            expect(musicChord).to.be.an('object');
            expect(musicChord).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicChord).to.be.an.instanceOf(MyScript.MusicChord);
            expect(musicChord).to.have.ownProperty('decorations');
            expect(musicChord).to.have.ownProperty('notes');
            expect(musicChord).to.have.ownProperty('beamTypes');
            expect(musicChord).to.have.ownProperty('ledgerLines');
            expect(musicChord).to.have.ownProperty('startSlurs');
            expect(musicChord).to.have.ownProperty('stopSlurs');
        });

        it('Test MusicChord object construction: MusicDecoration construction', function () {
            expect(musicChord.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Test MusicChord object construction: MusicNote construction', function () {
            expect(musicChord.getNotes()[0]).to.be.an.instanceOf(MyScript.MusicNote);
        });

        it('Test MusicChord object construction: beam types construction', function () {
            expect(musicChord.getBeamTypes()[0]).to.not.be.empty;
        });

        it('Test MusicChord object construction: MusicLedgerLine construction', function () {
            expect(musicChord.getLedgerLines()[0]).to.be.an.instanceOf(MyScript.MusicLedgerLine);
        });

        it('Test MusicChord object construction: start MusicSlur construction', function () {
            expect(musicChord.getStartSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Test MusicChord object construction: stop MusicSlur construction', function () {
            expect(musicChord.getStopSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

    });

});