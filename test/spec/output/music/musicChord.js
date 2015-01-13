'use strict';

describe('MyScriptJS: output/music/musicChord.js', function () {

    it('MusicChord object exist', function () {
        expect(MyScript.MusicChord).to.exist;
        expect(MyScript.MusicChord).not.to.be.null;
        expect(MyScript.MusicChord).to.not.be.undefined;
    });

    it('MusicChord constructor', function () {
        var musicChord = new MyScript.MusicChord();
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
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getDuration()).to.be.undefined;
    });

    it('MusicChord Arpeggiate getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getArpeggiate()).to.be.undefined;
    });
    it('MusicChord Start Beam getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getStartBeam()).to.be.undefined;
    });

    it('MusicChord Stop Beam getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getStopBeam()).to.be.undefined;
    });

    it('MusicChord Stem getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getStem()).to.be.undefined;
    });

    it('MusicChord Decorations getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getDecorations()).to.be.undefined;
    });

    it('MusicChord Notes getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getNotes()).to.be.undefined;
    });

    it('MusicChord Beam Types getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getBeamTypes()).to.be.undefined;
    });

    it('MusicChord Ledger Lines getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getLedgerLines()).to.be.undefined;
    });

    it('MusicChord Start Slurs getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getStartSlurs()).to.be.undefined;
    });

    it('MusicChord Stop Slurs getter', function () {
        var musicChord = new MyScript.MusicChord();
        expect(musicChord.getStopSlurs()).to.be.undefined;
    });
});