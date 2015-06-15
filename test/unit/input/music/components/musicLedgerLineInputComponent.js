'use strict';

describe('MusicLedgerLineInputComponent: input/music/components/musicLedgerLineInputComponent.js', function () {

    describe('Default construction', function () {

        var musicLedgerLineInputComponent;
        before(function (done) {
            musicLedgerLineInputComponent = new MyScript.MusicLedgerLineInputComponent();
            done();
        });

        it('Check initial state', function () {
            expect(musicLedgerLineInputComponent).to.be.an('object');
            expect(musicLedgerLineInputComponent).to.be.an.instanceOf(MyScript.AbstractMusicInputComponent);
            expect(musicLedgerLineInputComponent).to.be.an.instanceOf(MyScript.MusicLedgerLineInputComponent);
            expect(musicLedgerLineInputComponent).to.have.ownProperty('type');
        });

    });

});