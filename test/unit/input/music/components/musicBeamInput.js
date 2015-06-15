'use strict';

describe('MusicBeamInput: input/music/components/musicBeamInput.js', function () {

    describe('Default construction', function () {

        var musicBeamInput;
        before(function (done) {
            musicBeamInput = new MyScript.MusicBeamInput();
            done();
        });

        it('Check initial state', function () {
            expect(musicBeamInput).to.be.an('object');
            expect(musicBeamInput).to.be.an.instanceOf(MyScript.MusicBeamInput);
        });

        it('Get placement', function () {
            expect(musicBeamInput.getPlacement()).to.be.undefined;
        });

        it('Set placement', function () {
            musicBeamInput.setPlacement('ABOVE');
            expect(musicBeamInput.getPlacement()).not.to.be.undefined;
            expect(musicBeamInput.getPlacement()).to.equal('ABOVE');
        });

        it('Get slope', function () {
            expect(musicBeamInput.getSlope()).to.be.undefined;
        });

        it('Set slope', function () {
            musicBeamInput.setSlope('HORIZONTAL');
            expect(musicBeamInput.getSlope()).not.to.be.undefined;
            expect(musicBeamInput.getSlope()).to.equal('HORIZONTAL');
        });

        it('Get left count', function () {
            expect(musicBeamInput.getLeftCount()).to.be.undefined;
        });

        it('Set left count', function () {
            musicBeamInput.setLeftCount(6);
            expect(musicBeamInput.getLeftCount()).not.to.be.undefined;
            expect(musicBeamInput.getLeftCount()).to.equal(6);
        });

        it('Get right count', function () {
            expect(musicBeamInput.getRightCount()).to.be.undefined;
        });

        it('Set right count', function () {
            musicBeamInput.setRightCount(8);
            expect(musicBeamInput.getRightCount()).not.to.be.undefined;
            expect(musicBeamInput.getRightCount()).to.equal(8);
        });

        it('Get gap', function () {
            expect(musicBeamInput.getGap()).to.be.undefined;
        });

        it('Set gap', function () {
            musicBeamInput.setGap(8.6);
            expect(musicBeamInput.getGap()).not.to.be.undefined;
            expect(musicBeamInput.getGap()).to.equal(8.6);
        });

    });

});