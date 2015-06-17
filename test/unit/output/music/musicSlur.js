'use strict';

describe('MusicSlur: output/music/musicSlur.js', function () {

    describe('Default construction', function () {

        var musicSlur;
        before(function (done) {
            musicSlur = new MyScript.MusicSlur();
            done();
        });

        it('Check initial state', function () {
            expect(musicSlur).to.be.an('object');
            expect(musicSlur).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicSlur).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Get placement', function () {
            expect(musicSlur.getPlacement()).to.equal(undefined);
        });

    });

});