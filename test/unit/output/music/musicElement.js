'use strict';

describe('MusicElement: output/music/musicElement.js', function () {

    describe('Default construction', function () {

        var musicElement;
        before(function (done) {
            musicElement = new MyScript.MusicElement();
            done();
        });

        it('check initial state', function () {
            expect(musicElement).to.be.an('object');
            expect(musicElement).to.be.an.instanceof(MyScript.MusicElement);
            expect(musicElement).to.have.ownProperty('inputRanges');
        });

        it('Element Type getter', function () {
            expect(musicElement.getElementType()).to.be.undefined;
        });

        it('Input Ranges getter', function () {
            expect(musicElement.getInputRanges()).to.be.empty;
        });

    });

});