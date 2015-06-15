'use strict';

describe('MusicDecoration: output/music/musicDecoration.js', function () {

    describe('Default construction', function () {

        var musicDecoration;
        before(function (done) {
            musicDecoration = new MyScript.MusicDecoration();
            done();
        });

        it('Check initial state', function () {
            expect(musicDecoration).to.be.an('object');
            expect(musicDecoration).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicDecoration).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Symbol getter', function () {
            expect(musicDecoration.getSymbol()).to.be.undefined;
        });

        it('Placement getter', function () {
            expect(musicDecoration.getPlacement()).to.be.undefined;
        });

    });

});