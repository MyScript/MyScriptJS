'use strict';

describe('MusicLedgerLineInputComponent: input/music/components/musicLedgerLineInputComponent.js', function () {

    describe('Default construction', function () {

        var musicLedgerLineInputComponent;
        before(function (done) {
            musicLedgerLineInputComponent = new MyScript.MusicLedgerLineInputComponent();
            done();
        });

        it('check initial state', function () {
            expect(musicLedgerLineInputComponent).to.be.an('object');
            expect(musicLedgerLineInputComponent).to.be.an.instanceof(MyScript.AbstractMusicInputComponent);
            expect(musicLedgerLineInputComponent).to.be.an.instanceof(MyScript.MusicLedgerLineInputComponent);
            expect(musicLedgerLineInputComponent).to.have.ownProperty('type');
        });

    });

});