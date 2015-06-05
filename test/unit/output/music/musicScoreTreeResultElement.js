'use strict';

describe('MusicScoreTreeResultElement: output/music/musicScoreTreeResultElement.js', function () {

    describe('Default construction', function () {

        var scoreTree;
        before(function (done) {
            scoreTree = new MyScript.MusicScoreTreeResultElement();
            done();
        });

        it('check initial state', function () {
            expect(scoreTree).to.be.an('object');
            expect(scoreTree).to.be.an.instanceof(MyScript.MusicResultElement);
            expect(scoreTree).to.be.an.instanceof(MyScript.MusicScoreTreeResultElement);
        });

        it('Type getter', function () {
            expect(scoreTree.getScore()).to.be.undefined;
        });

    });

});