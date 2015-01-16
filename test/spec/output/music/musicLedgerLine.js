'use strict';

describe('MyScriptJS: output/music/musicLedgerLine.js', function () {

    var expect = require('chai').expect;

    it('MusicLedgerLine object exist', function () {
        expect(MyScript.MusicLedgerLine).to.exist;
        expect(MyScript.MusicLedgerLine).not.to.be.null;
        expect(MyScript.MusicLedgerLine).to.not.be.undefined;
    });


    it('MusicLedgerLine constructor', function () {
        var musicLedgerLine = new MyScript.MusicLedgerLine();
        expect(musicLedgerLine).to.be.an('object');
        expect(musicLedgerLine).to.be.an.instanceof(MyScript.MusicElement);
        expect(musicLedgerLine).to.be.an.instanceof(MyScript.MusicLedgerLine);
    });
});