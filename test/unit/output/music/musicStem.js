'use strict';

describe('MusicStem: output/music/musicStem.js', function () {

    describe('Default construction', function () {

        var musicStem;
        before(function (done) {
            musicStem = new MyScript.MusicStem();
            done();
        });

        it('Check initial state', function () {
            expect(musicStem).to.be.an('object');
            expect(musicStem).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicStem).to.be.an.instanceOf(MyScript.MusicStem);
        });

        it('Type getter', function () {
            expect(musicStem.getType()).to.be.undefined;
        });

    });

});