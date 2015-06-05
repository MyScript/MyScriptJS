'use strict';

describe('MusicResult: output/music/musicResult.js', function () {

    describe('Default construction', function () {

        var musicResult;
        before(function (done) {
            musicResult = new MyScript.MusicResult();
            done();
        });

        it('Check initial state', function () {
            expect(musicResult).to.be.an('object');
            expect(musicResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(musicResult).to.be.an.instanceof(MyScript.MusicResult);
        });

        it('Get MusicDocument', function () {
            expect(musicResult.getMusicDocument()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var musicResult;
        before(function (done) {
            musicResult = new MyScript.MusicResult({
                result: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicResult).to.be.an('object');
            expect(musicResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(musicResult).to.be.an.instanceof(MyScript.MusicResult);
        });

        it('Get MusicDocument', function () {
            expect(musicResult.getMusicDocument()).to.be.an.instanceof(MyScript.MusicDocument);
        });

    });

});