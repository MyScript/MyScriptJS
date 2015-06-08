'use strict';

describe('MusicKeySignature: output/music/musicKeySignature.js', function () {

    describe('Default construction', function () {

        var musicKeySignature;
        before(function (done) {
            musicKeySignature = new MyScript.MusicKeySignature();
            done();
        });

        it('Check initial state', function () {
            expect(musicKeySignature).to.be.an('object');
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicKeySignature);
            expect(musicKeySignature).to.have.ownProperty('accidentals');
        });

        it('Get signature', function () {
            expect(musicKeySignature.getSignature()).to.be.undefined;
        });

        it('Get accidentals', function () {
            expect(musicKeySignature.getAccidentals()).to.be.empty;
        });

    });

    describe('JSON construction', function () {

        var musicKeySignature;
        before(function (done) {
            musicKeySignature = new MyScript.MusicKeySignature({
                signature: {
                },
                accidentals: [{
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicKeySignature).to.be.an('object');
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicKeySignature).to.be.an.instanceof(MyScript.MusicKeySignature);
            expect(musicKeySignature).to.have.ownProperty('accidentals');
        });

        it('Get signature', function () {
            expect(musicKeySignature.getSignature()).to.be.an.instanceof(MyScript.MusicKeySignatureData);
        });

        it('Get accidentals', function () {
            expect(musicKeySignature.getAccidentals()[0]).to.be.an.instanceof(MyScript.MusicAccidental);
        });

    });

});