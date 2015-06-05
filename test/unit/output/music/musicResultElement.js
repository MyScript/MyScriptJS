'use strict';

describe('MusicResultElement: output/music/musicResultElement.js', function () {

    describe('Default construction', function () {

        var musicResultElement;
        before(function (done) {
            musicResultElement = new MyScript.MusicResultElement();
            done();
        });

        it('check initial state', function () {
            expect(musicResultElement).to.be.an('object');
            expect(musicResultElement).to.be.an.instanceof(MyScript.MusicResultElement);
        });

        it('Type getter', function () {
            expect(musicResultElement.getType()).to.be.undefined;
        });

        it('Is Music XML', function () {
            expect(musicResultElement.isMusicXML()).to.be.false;
        });

        it('Is Score Tree', function () {
            expect(musicResultElement.isScoreTree()).to.be.false;
        });

    });

});