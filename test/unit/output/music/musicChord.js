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

        it('Get duration', function () {
            expect(musicChord.getDuration()).to.equal(undefined);
        });

        it('Get arpeggiate ', function () {
            expect(musicChord.getArpeggiate()).to.equal(undefined);
        });

        it('Get start beam', function () {
            expect(musicChord.getStartBeam()).to.equal(undefined);
        });

        it('Get stop beam', function () {
            expect(musicChord.getStopBeam()).to.equal(undefined);
        });

        it('Get stem', function () {
            expect(musicChord.getStem()).to.equal(undefined);
        });

        it('Get decorations', function () {
            expect(musicChord.getDecorations().length).to.equal(0);
        });

        it('Get notes', function () {
            expect(musicChord.getNotes().length).to.equal(0);
        });

        it('Get beam types', function () {
            expect(musicChord.getBeamTypes().length).to.equal(0);
        });

        it('Get ledger lines', function () {
            expect(musicChord.getLedgerLines().length).to.equal(0);
        });

        it('Get start slurs', function () {
            expect(musicChord.getStartSlurs().length).to.equal(0);
        });

        it('Get stop slurs', function () {
            expect(musicChord.getStopSlurs().length).to.equal(0);
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

        it('Get decorations', function () {
            expect(musicChord.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Get notes', function () {
            expect(musicChord.getNotes()[0]).to.be.an.instanceOf(MyScript.MusicNote);
        });

        it('Get beam types', function () {
            expect(musicChord.getBeamTypes().length).to.equal(1);
        });

        it('Get ledger lines', function () {
            expect(musicChord.getLedgerLines()[0]).to.be.an.instanceOf(MyScript.MusicLedgerLine);
        });

        it('Get start slurs', function () {
            expect(musicChord.getStartSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Get stop slurs', function () {
            expect(musicChord.getStopSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

    });

});