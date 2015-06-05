'use strict';

describe('MusicKeySignature: output/music/musicKeySignature.js', function () {

    describe('Default construction', function () {

        var musicKeySignature;
        before(function (done) {
            musicKeySignature = new MyScript.MusicKeySignature();
            done();
        });

        it('check initial state', function () {
            expect(musicKeySignature).to.be.an('object');
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicKeySignature);
            expect(musicKeySignature).to.have.ownProperty('accidentals');
        });

        it('Signature getter', function () {
            expect(musicKeySignature.getSignature()).to.be.undefined;
        });

        it('Accidentals getter', function () {
            expect(musicKeySignature.getAccidentals()).to.be.empty;
        });

    });

});