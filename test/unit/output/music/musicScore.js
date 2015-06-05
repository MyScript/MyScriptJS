'use strict';

describe('MusicScore: output/music/musicScore.js', function () {

    describe('Default construction', function () {

        var musicScore;
        before(function (done) {
            musicScore = new MyScript.MusicScore();
            done();
        });

        it('check initial state', function () {
            expect(musicScore).to.be.an('object');
            expect(musicScore).to.be.an.instanceof(MyScript.MusicScore);
            expect(musicScore).to.have.ownProperty('parts');
        });

        it('Parts getter', function () {
            expect(musicScore.getParts()).to.be.empty;
        });

    });

});