'use strict';

describe('MusicScoreTreeResultElement: output/music/musicScoreTreeResultElement.js', function () {

    describe('Default construction', function () {

        var scoreTree;
        before(function (done) {
            scoreTree = new MyScript.MusicScoreTreeResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(scoreTree).to.be.an('object');
            expect(scoreTree).to.be.an.instanceOf(MyScript.MusicResultElement);
            expect(scoreTree).to.be.an.instanceOf(MyScript.MusicScoreTreeResultElement);
        });

        it('Get type', function () {
            expect(scoreTree.getScore()).to.equal(undefined);
        });

    });

});