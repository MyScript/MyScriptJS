'use strict';

describe('MusicTimeSignature: output/music/musicTimeSignature.js', function () {

    describe('Default construction', function () {

        var musicTimeSignature;
        before(function (done) {
            musicTimeSignature = new MyScript.MusicTimeSignature();
            done();
        });

        it('check initial state', function () {
            expect(musicTimeSignature).to.be.an('object');
            expect(musicTimeSignature).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicTimeSignature).to.be.an.instanceof(MyScript.MusicTimeSignature);
        });

        it('Top getter', function () {
            expect(musicTimeSignature.getTop()).to.be.undefined;
        });

        it('Bottom getter', function () {
            expect(musicTimeSignature.getBottom()).to.be.undefined;
        });

        it('Type getter', function () {
            expect(musicTimeSignature.getType()).to.be.undefined;
        });

    });

});