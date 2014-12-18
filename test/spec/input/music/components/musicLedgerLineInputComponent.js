'use strict';

describe('MyScriptJS: input/music/components/musicLedgerLineInputComponent.js', function () {

    it('MusicLedgerLineInputComponent object exist', function () {
        expect(MyScript.MusicLedgerLineInputComponent).to.exist;
        expect(MyScript.MusicLedgerLineInputComponent).not.to.be.null;
        expect(MyScript.MusicLedgerLineInputComponent).to.not.be.undefined;
    });

    it('MusicLedgerLineInputComponent constructor', function () {
        var musicLedgerLineInputComponent = new MyScript.MusicLedgerLineInputComponent();
        expect(musicLedgerLineInputComponent).to.be.an('object');
        expect(musicLedgerLineInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
        expect(musicLedgerLineInputComponent).to.be.an.instanceof(MyScript.MusicLedgerLineInputComponent);
        expect(musicLedgerLineInputComponent).to.have.ownProperty('type');
    });

});