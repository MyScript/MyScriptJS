'use strict';

describe('MyScriptJS: output/music/musicScratchOut.js', function () {

    it('MusicScratchOut object exist', function () {
        expect(MyScript.MusicScratchOut).to.exist;
        expect(MyScript.MusicScratchOut).not.to.be.null;
        expect(MyScript.MusicScratchOut).to.not.be.undefined;
    });

    var musicScratchOut = new MyScript.MusicScratchOut();
    it('MusicScratchOut constructor', function () {
        expect(musicScratchOut).to.be.an('object');
        expect(musicScratchOut).to.be.an.instanceof(MyScript.MusicScratchOut);
        expect(musicScratchOut).to.have.ownProperty('inputRanges');
        expect(musicScratchOut).to.have.ownProperty('erasedInputRanges');
    });

    it('Get MusicScratchOut input ranges', function () {
        expect(musicScratchOut.getInputRanges()).to.be.empty;
    });

    it('Get MusicScratchOut erased input ranges', function () {
        expect(musicScratchOut.getErasedInputRanges()).to.be.empty;
    });

    var musicScratchOut2 = new MyScript.MusicScratchOut({
        'erasedInputRanges': [{
            'component': 1,
            'firstItem': 0.0,
            'lastItem': 11.0
        }, {'component': 2, 'firstItem': 0.0, 'lastItem': 57.0}],
        'inputRanges': [{'component': 3, 'firstItem': 0.0, 'lastItem': 205.0}]
    });

    it('Check MusicScratchOut input ranges', function () {
        expect(musicScratchOut2.getInputRanges().length).to.equal(1);
        expect(musicScratchOut2.getInputRanges()[0].getComponent()).to.equal(3);
        expect(musicScratchOut2.getInputRanges()[0].getFirstItem()).to.equal(0.0);
        expect(musicScratchOut2.getInputRanges()[0].getLastItem()).to.equal(205.0);
    });

    it('Check MusicScratchOut erased input ranges', function () {
        expect(musicScratchOut2.getErasedInputRanges().length).to.equal(2);
        expect(musicScratchOut2.getErasedInputRanges()[0].getComponent()).to.equal(1);
        expect(musicScratchOut2.getErasedInputRanges()[0].getFirstItem()).to.equal(0.0);
        expect(musicScratchOut2.getErasedInputRanges()[0].getLastItem()).to.equal(11.0);
        expect(musicScratchOut2.getErasedInputRanges()[1].getComponent()).to.equal(2);
        expect(musicScratchOut2.getErasedInputRanges()[1].getFirstItem()).to.equal(0.0);
        expect(musicScratchOut2.getErasedInputRanges()[1].getLastItem()).to.equal(57.0);
    });

});