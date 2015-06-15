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

        it('Type getter', function () {
            expect(musicRest.getType()).to.be.undefined;
        });

        it('Dots getter', function () {
            expect(musicRest.getDots()).to.be.undefined;
        });

        it('Duration getter', function () {
            expect(musicRest.getDuration()).to.be.undefined;
        });

        it('Decorations getter', function () {
            expect(musicRest.getDecorations()).to.be.empty;
        });

        it('Start Slurs getter', function () {
            expect(musicRest.getStartSlurs()).to.be.empty;
        });

        it('Stop Slurs getter', function () {
            expect(musicRest.getStopSlurs()).to.be.empty;
        });

        it('Start Tuplet getter', function () {
            expect(musicRest.getStartTuplet()).to.be.undefined;
        });

        it('Stop Tuplet getter', function () {
            expect(musicRest.getStopTuplet()).to.be.undefined;
        });

        it('TimeModification getter', function () {
            expect(musicRest.getTimeModification()).to.be.undefined;
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

        it('Test MusicRest object construction: MusicDecoration construction', function () {
            expect(musicRest.getDecorations()[0]).to.be.an.instanceOf(MyScript.MusicDecoration);
        });

        it('Test MusicRest object construction: start MusicSlur construction', function () {
            expect(musicRest.getStartSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

        it('Test MusicRest object construction: stop MusicSlur construction', function () {
            expect(musicRest.getStopSlurs()[0]).to.be.an.instanceOf(MyScript.MusicSlur);
        });

    });

});