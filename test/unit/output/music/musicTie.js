'use strict';

describe('MusicTie: output/music/musicTie.js', function () {

    describe('Default construction', function () {

        var musicTie;
        before(function (done) {
            musicTie = new MyScript.MusicTie();
            done();
        });

        it('check initial state', function () {
            expect(musicTie).to.be.an('object');
            expect(musicTie).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicTie).to.be.an.instanceof(MyScript.MusicTie);
        });

        it('Placement getter', function () {
            expect(musicTie.getPlacement()).to.be.undefined;
        });

    });

});