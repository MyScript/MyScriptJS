'use strict';

describe('MyScriptJS: output/math/mathScratchOut.js', function () {

    it('MathScratchOut object exist', function () {
        expect(MyScript.MathScratchOut).to.exist;
        expect(MyScript.MathScratchOut).not.to.be.null;
        expect(MyScript.MathScratchOut).to.not.be.undefined;
    });

    it('MathScratchOut constructor', function () {
        var mathScratchOut = new MyScript.MathScratchOut();
        expect(mathScratchOut).to.be.an('object');
        expect(mathScratchOut).to.be.an.instanceof(MyScript.MathScratchOut);
        expect(mathScratchOut).to.have.ownProperty('inkRanges');
        expect(mathScratchOut).to.have.ownProperty('erasedInkRanges');
    });

    it('MathScratchOut Ink Ranges getter', function () {
        var mathScratchOut = new MyScript.MathScratchOut();
        expect(mathScratchOut.getInkRanges()).to.be.empty;
    });

    it('MathScratchOut Erased Ink Ranges getter', function () {
        var mathScratchOut = new MyScript.MathScratchOut();
        expect(mathScratchOut.getErasedInkRanges()).to.be.empty;
    });

});