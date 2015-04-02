'use strict';

describe('MyScriptJS: output/music/musicChord.js', function () {

    it('MusicChord object exist', function () {
        expect(MyScript.MusicChord).to.exist;
        expect(MyScript.MusicChord).not.to.be.null;
        expect(MyScript.MusicChord).to.not.be.undefined;
    });

    var musicChord = new MyScript.MusicChord();
    it('MusicChord constructor', function () {
        expect(musicChord).to.be.an('object');
        expect(musicChord).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicChord).to.be.an.instanceof(MyScript.MusicChord);
        expect(musicChord).to.have.ownProperty('decorations');
        expect(musicChord).to.have.ownProperty('notes');
        expect(musicChord).to.have.ownProperty('beamTypes');
        expect(musicChord).to.have.ownProperty('ledgerLines');
        expect(musicChord).to.have.ownProperty('startSlurs');
        expect(musicChord).to.have.ownProperty('stopSlurs');
    });

    it('MusicChord Duration getter', function () {
        expect(musicChord.getDuration()).to.be.undefined;
    });

    it('MusicChord Arpeggiate getter', function () {
        expect(musicChord.getArpeggiate()).to.be.undefined;
    });
    it('MusicChord Start Beam getter', function () {
        expect(musicChord.getStartBeam()).to.be.undefined;
    });

    it('MusicChord Stop Beam getter', function () {
        expect(musicChord.getStopBeam()).to.be.undefined;
    });

    it('MusicChord Stem getter', function () {
        expect(musicChord.getStem()).to.be.undefined;
    });

    it('MusicChord Decorations getter', function () {
        expect(musicChord.getDecorations()).to.be.empty;
    });

    it('MusicChord Notes getter', function () {
        expect(musicChord.getNotes()).to.be.empty;
    });

    it('MusicChord Beam Types getter', function () {
        expect(musicChord.getBeamTypes()).to.be.empty;
    });

    it('MusicChord Ledger Lines getter', function () {
        expect(musicChord.getLedgerLines()).to.be.empty;
    });

    it('MusicChord Start Slurs getter', function () {
        expect(musicChord.getStartSlurs()).to.be.empty;
    });

    it('MusicChord Stop Slurs getter', function () {
        expect(musicChord.getStopSlurs()).to.be.empty;
    });

    var obj = {
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
    };
    var musicChord2 = new MyScript.MusicChord(obj);
    it('Test MusicChord object construction: MusicDecoration construction', function () {
        expect(musicChord2.getDecorations()[0]).to.be.an.instanceof(MyScript.MusicDecoration);
    });
    it('Test MusicChord object construction: MusicNote construction', function () {
        expect(musicChord2.getNotes()[0]).to.be.an.instanceof(MyScript.MusicNote);
    });
    it('Test MusicChord object construction: beam types construction', function () {
        expect(musicChord2.getBeamTypes()[0]).to.not.be.empty;
    });
    it('Test MusicChord object construction: MusicLedgerLine construction', function () {
        expect(musicChord2.getLedgerLines()[0]).to.be.an.instanceof(MyScript.MusicLedgerLine);
    });
    it('Test MusicChord object construction: start MusicSlur construction', function () {
        expect(musicChord2.getStartSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });
    it('Test MusicChord object construction: stop MusicSlur construction', function () {
        expect(musicChord2.getStopSlurs()[0]).to.be.an.instanceof(MyScript.MusicSlur);
    });
});