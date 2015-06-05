'use strict';

describe('MusicBeamInput: input/music/components/musicBeamInput.js', function () {

    describe('Default construction', function () {

        var musicBeamInput;
        before(function (done) {
            musicBeamInput = new MyScript.MusicBeamInput();
            done();
        });

        it('check initial state', function () {
            expect(musicBeamInput).to.be.an('object');
            expect(musicBeamInput).to.be.an.instanceof(MyScript.MusicBeamInput);
        });

    });

    describe('Accessors', function () {

        var musicBeamInput;
        beforeEach(function (done) {
            musicBeamInput = new MyScript.MusicBeamInput();
            done();
        });

        it('Placement getter', function () {
            expect(musicBeamInput.getPlacement()).to.be.undefined;
        });

        it('Placement setter', function () {
            expect(musicBeamInput.getPlacement()).to.be.undefined;
            musicBeamInput.setPlacement('ABOVE');
            expect(musicBeamInput.getPlacement()).not.to.be.undefined;
            expect(musicBeamInput.getPlacement()).to.be.equal('ABOVE');
        });

        it('Slope getter', function () {
            expect(musicBeamInput.getSlope()).to.be.undefined;
        });

        it('Slope setter', function () {
            expect(musicBeamInput.getSlope()).to.be.undefined;
            musicBeamInput.setSlope('HORIZONTAL');
            expect(musicBeamInput.getSlope()).not.to.be.undefined;
            expect(musicBeamInput.getSlope()).to.be.equal('HORIZONTAL');
        });

        it('left count getter', function () {
            expect(musicBeamInput.getLeftCount()).to.be.undefined;
        });

        it('left count setter', function () {
            expect(musicBeamInput.getLeftCount()).to.be.undefined;
            musicBeamInput.setLeftCount(6);
            expect(musicBeamInput.getLeftCount()).not.to.be.undefined;
            expect(musicBeamInput.getLeftCount()).to.be.equal(6);
        });

        it('right count getter', function () {
            expect(musicBeamInput.getRightCount()).to.be.undefined;
        });

        it('right count setter', function () {
            expect(musicBeamInput.getRightCount()).to.be.undefined;
            musicBeamInput.setRightCount(8);
            expect(musicBeamInput.getRightCount()).not.to.be.undefined;
            expect(musicBeamInput.getRightCount()).to.be.equal(8);
        });

        it('gap getter', function () {
            expect(musicBeamInput.getGap()).to.be.undefined;
        });

        it('gap setter', function () {
            expect(musicBeamInput.getGap()).to.be.undefined;
            musicBeamInput.setGap(8.6);
            expect(musicBeamInput.getGap()).not.to.be.undefined;
            expect(musicBeamInput.getGap()).to.be.equal(8.6);
        });

    });

});