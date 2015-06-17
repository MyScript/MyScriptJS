'use strict';

describe('MusicRest: output/music/musicRest.js', function () {

    describe('Default construction', function () {

        var musicRest;
        before(function (done) {
            musicRest = new MyScript.MusicRest();
            done();
        });

        it('Check initial state', function () {
            expect(musicRest).to.be.an('object');
            expect(musicRest).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicRest).to.be.an.instanceOf(MyScript.MusicRest);
            expect(musicRest).to.have.ownProperty('decorations');
            expect(musicRest).to.have.ownProperty('startSlurs');
            expect(musicRest).to.have.ownProperty('stopSlurs');
        });

        it('Get type', function () {
            expect(musicRest.getType()).to.equal(undefined);
        });

        it('Get dots', function () {
            expect(musicRest.getDots()).to.equal(undefined);
        });

        it('Get duration', function () {
            expect(musicRest.getDuration()).to.equal(undefined);
        });

        it('Get decorations', function () {
            expect(musicRest.getDecorations().length).to.equal(0);
        });

        it('Get start slurs', function () {
            expect(musicRest.getStartSlurs().length).to.equal(0);
        });

        it('Get stop slurs', function () {
            expect(musicRest.getStopSlurs().length).to.equal(0);
        });

        it('Get start tuplet', function () {
            expect(musicRest.getStartTuplet()).to.equal(undefined);
        });

        it('Get stop tuplet', function () {
            expect(musicRest.getStopTuplet()).to.equal(undefined);
        });

        it('Get time modification', function () {
            expect(musicRest.getTimeModification()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var musicRest;
        before(function (done) {
            musicRest = new MyScript.MusicRest({
                decorations: [{
                    type: 'decoration'
                }],
                startSlurs: [{
                    type: 'startSlur'
                }],
                stopSlurs: [{
                    type: 'stopSlur'
                }]
            });
            done();
        });

        it('Check initial state', function () {
            expect(musicRest).to.be.an('object');
            expect(musicRest).to.be.an.instanceOf(MyScript.MusicElement);
            expect(musicRest).to.be.an.instanceOf(MyScript.MusicRest);
            expect(musicRest).to.have.ownProperty('decorations');
            expect(musicRest).to.have.ownProperty('startSlurs');
            expect(musicRest).to.have.ownProperty('stopSlurs');
        });

        it('Get decorations', function () {
            expect(musicRest.getDecorations().length).to.equal(1);
            expect(musicRest.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Get start slurs', function () {
            expect(musicRest.getStartSlurs().length).to.equal(1);
            expect(musicRest.getStartSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Get stop slurs', function () {
            expect(musicRest.getStopSlurs().length).to.equal(1);
            expect(musicRest.getStopSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

    });

});