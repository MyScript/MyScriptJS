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
            expect(musicKeySignature).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicKeySignature).to.be.an.instanceOf(MyScript.MusicKeySignature);
            expect(musicKeySignature).to.have.ownProperty('accidentals');
        });

        it('Get signature', function () {
            expect(musicKeySignature.getSignature()).to.equal(undefined);
        });

        it('Get accidentals', function () {
            expect(musicKeySignature.getAccidentals().length).to.equal(0);
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
            expect(musicKeySignature).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicKeySignature).to.be.an.instanceOf(MyScript.MusicKeySignature);
            expect(musicKeySignature).to.have.ownProperty('accidentals');
        });

        it('Get signature', function () {
            expect(musicKeySignature.getSignature()).to.be.an.instanceOf(MyScript.MusicKeySignatureData);
        });

        it('Get accidentals', function () {
            expect(musicKeySignature.getAccidentals()[0]).to.be.an.instanceOf(MyScript.MusicAccidental);
        });

    });

});