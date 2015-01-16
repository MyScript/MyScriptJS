'use strict';

describe('MyScriptJS: output/shape/shapeScratchOut.js', function () {

    var expect = require('chai').expect;

    it('ShapeScratchOut object exist', function () {
        expect(MyScript.ShapeScratchOut).to.exist;
        expect(MyScript.ShapeScratchOut).not.to.be.null;
        expect(MyScript.ShapeScratchOut).to.not.be.undefined;
    });

    it('ShapeScratchOut constructor', function () {
        var shapeScratchOut = new MyScript.ShapeScratchOut();
        expect(shapeScratchOut).to.be.an('object');
        expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeCandidate);
        expect(shapeScratchOut).to.be.an.instanceof(MyScript.ShapeScratchOut);
        expect(shapeScratchOut).to.have.ownProperty('inkRanges');
    });

    it('ShapeScratchOut Ink Ranges getter', function () {
        var shapeScratchOut = new MyScript.ShapeScratchOut();
        expect(shapeScratchOut.getInkRanges()).to.be.empty;
    });

});