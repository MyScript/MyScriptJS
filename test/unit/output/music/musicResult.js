'use strict';

describe('MusicResult: output/music/musicResult.js', function () {

    describe('Default construction', function () {

        var musicResult;
        before(function (done) {
            musicResult = new MyScript.MusicResult();
            done();
        });

        it('check initial state', function () {
            expect(musicResult).to.be.an('object');
            expect(musicResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(musicResult).to.be.an.instanceof(MyScript.MusicResult);
        });

        it('Get Music Document', function () {
            expect(musicResult.getMusicDocument()).to.be.undefined;
        });

    });

});