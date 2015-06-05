'use strict';

describe('MusicBeam: output/music/musicBeam.js', function () {

    describe('Default construction', function () {

        var musicBeam;
        before(function (done) {
            musicBeam = new MyScript.MusicBeam();
            done();
        });

        it('check initial state', function () {
            expect(musicBeam).to.be.an('object');
            expect(musicBeam).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicBeam).to.be.an.instanceof(MyScript.MusicBeam);
        });

        it('Placement getter', function () {
            expect(musicBeam.getPlacement()).to.be.undefined;
        });

        it('Left Count getter', function () {
            expect(musicBeam.getLeftCount()).to.be.undefined;
        });

        it('Right Count getter', function () {
            expect(musicBeam.getRightCount()).to.be.undefined;
        });

    });

});