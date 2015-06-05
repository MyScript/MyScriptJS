'use strict';

describe('MusicLedgerLine: output/music/musicLedgerLine.js', function () {

    describe('Default construction', function () {

        var musicLedgerLine;
        before(function (done) {
            musicLedgerLine = new MyScript.MusicLedgerLine();
            done();
        });

        it('check initial state', function () {
            expect(musicLedgerLine).to.be.an('object');
            expect(musicLedgerLine).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicLedgerLine).to.be.an.instanceof(MyScript.MusicLedgerLine);
        });

    });

});