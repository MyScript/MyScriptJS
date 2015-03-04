'use strict';

describe('MyScriptJS: output/shape/shapeScratchOut.js', function () {

    it('ShapeScratchOut object exist', function () {
        expect(MyScript.ShapeScratchOut).to.exist;
        expect(MyScript.ShapeScratchOut).not.to.be.null;
        expect(MyScript.ShapeScratchOut).to.not.be.undefined;
    });

    var shapeScratchOut = new MyScript.ShapeScratchOut();
    it('ShapeScratchOut constructor', function () {
        expect(shapeScratchOut).to.be.an('object');
        expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeCandidate);
        expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeScratchOut);
        expect(shapeScratchOut).to.have.ownProperty('inkRanges');
    });

    it('ShapeScratchOut Ink Ranges getter', function () {
        expect(shapeScratchOut.getInkRanges()).to.be.empty;
    });

    var obj = {
        inkRanges: [{
            type: 'inkRange'
        }]
    };
    var shapeScratchOut2 = new MyScript.ShapeScratchOut(obj);
    it('Test ShapeScratchOut object construction: ShapeInkRange construction', function () {
        expect(shapeScratchOut2.getInkRanges()[0]).to.be.an.instanceof(MyScript.ShapeInkRange);
    });

});