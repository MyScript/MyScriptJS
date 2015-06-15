'use strict';

describe('MusicScore: output/music/musicScore.js', function () {

    describe('Default construction', function () {

        var musicScore;
        before(function (done) {
            musicScore = new MyScript.MusicScore();
            done();
        });

        it('Check initial state', function () {
            expect(musicScore).to.be.an('object');
            expect(musicScore).to.be.an.instanceOf(MyScript.MusicScore);
            expect(musicScore).to.have.ownProperty('parts');
        });

        it('Get parts', function () {
            expect(musicScore.getParts()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicScore;
        before(function (done) {
            musicScore = new MyScript.MusicScore({
                parts: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicScore).to.be.an('object');
            expect(musicScore).to.be.an.instanceOf(MyScript.MusicScore);
            expect(musicScore).to.have.ownProperty('parts');
        });

        it('Get parts', function () {
            expect(musicScore.getParts()[0]).to.be.an.instanceOf(MyScript.MusicPart);
        });

    });

});