'use strict';

describe('MusicStem: output/music/musicStem.js', function () {

    describe('Default construction', function () {

        var musicStem;
        before(function (done) {
            musicStem = new MyScript.MusicStem();
            done();
        });

        it('check initial state', function () {
            expect(musicStem).to.be.an('object');
            expect(musicStem).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicStem).to.be.an.instanceof(MyScript.MusicStem);
        });

        it('Type getter', function () {
            expect(musicStem.getType()).to.be.undefined;
        });

    });

});