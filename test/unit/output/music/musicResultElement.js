'use strict';

describe('MusicResultElement: output/music/musicResultElement.js', function () {

    describe('Default construction', function () {

        var musicResultElement;
        before(function (done) {
            musicResultElement = new MyScript.MusicResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(musicResultElement).to.be.an('object');
            expect(musicResultElement).to.be.an.instanceOf(MyScript.MusicResultElement);
        });

        it('Get type', function () {
            expect(musicResultElement.getType()).to.equal(undefined);
        });

        it('Get is MusicXML', function () {
            expect(musicResultElement.isMusicXML()).to.equal(false);
        });

        it('Get is score tree', function () {
            expect(musicResultElement.isScoreTree()).to.equal(false);
        });

    });

});