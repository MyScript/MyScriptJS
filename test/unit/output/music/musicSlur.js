'use strict';

describe('MusicSlur: output/music/musicSlur.js', function () {

    describe('Default construction', function () {

        var musicSlur;
        before(function (done) {
            musicSlur = new MyScript.MusicSlur();
            done();
        });

        it('check initial state', function () {
            expect(musicSlur).to.be.an('object');
            expect(musicSlur).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicSlur).to.be.an.instanceof(MyScript.MusicSlur);
        });

        it('Placement getter', function () {
            expect(musicSlur.getPlacement()).to.be.undefined;
        });

    });

});