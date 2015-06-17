'use strict';

describe('MusicElement: output/music/musicElement.js', function () {

    describe('Default construction', function () {

        var musicElement;
        before(function (done) {
            musicElement = new MyScript.MusicElement();
            done();
        });

        it('Check initial state', function () {
            expect(musicElement).to.be.an('object');
            expect(musicElement).to.be.an.instanceOf(MyScript.MusicElement);
        });

        it('Get element type', function () {
            expect(musicElement.getElementType()).to.equal(undefined);
        });

        it('Get input ranges', function () {
            expect(musicElement.getInputRanges()).to.equal(undefined);
        });

    });

});