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

        it('Get symbol', function () {
            expect(musicDecoration.getSymbol()).to.equal(undefined);
        });

        it('Set symbol', function () {
            musicDecoration.setSymbol('test');
            expect(musicDecoration.getSymbol()).to.equal('test');
        });

        it('Get placement', function () {
            expect(musicDecoration.getPlacement()).to.equal(undefined);
        });

        it('Set placement', function () {
            musicDecoration.setPlacement('test');
            expect(musicDecoration.getPlacement()).to.equal('test');
        });

    });

});