'use strict';

describe('MathScratchOut: output/math/mathScratchOut.js', function () {

    describe('Default construction', function () {

        var mathScratchOut;
        before(function (done) {
            mathScratchOut = new MyScript.MathScratchOut();
            done();
        });

        it('Check initial state', function () {
            expect(mathScratchOut).to.be.an('object');
            expect(mathScratchOut).to.be.an.instanceOf(MyScript.MathScratchOut);
            expect(mathScratchOut).to.have.ownProperty('inkRanges');
            expect(mathScratchOut).to.have.ownProperty('erasedInkRanges');
        });

        it('Ink Ranges getter', function () {
            expect(mathScratchOut.getInkRanges()).to.be.empty;
        });

        it('Erased Ink Ranges getter', function () {
            expect(mathScratchOut.getErasedInkRanges()).to.be.empty;
        });

    });

});