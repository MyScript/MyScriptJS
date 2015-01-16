'use strict';

describe('MyScriptJS: output/shape/shapeInkRange.js', function () {

    var expect = require('chai').expect;

    it('ShapeInkRange object exist', function () {
        expect(MyScript.ShapeInkRange).to.exist;
        expect(MyScript.ShapeInkRange).not.to.be.null;
        expect(MyScript.ShapeInkRange).to.not.be.undefined;
    });

    it('ShapeInkRange constructor', function () {
        var shapeInkRange = new MyScript.ShapeInkRange();
        expect(shapeInkRange).to.be.an('object');
        expect(shapeInkRange).to.be.an.instanceof(MyScript.ShapeInkRange);
    });

    it('ShapeInkRange First Stroke getter', function () {
        var shapeInkRange = new MyScript.ShapeInkRange();
        expect(shapeInkRange.getFirstStroke()).to.be.undefined;
    });

    it('ShapeInkRange Last Stroke getter', function () {
        var shapeInkRange = new MyScript.ShapeInkRange();
        expect(shapeInkRange.getLastStroke()).to.be.undefined;
    });

    it('ShapeInkRange First Point getter', function () {
        var shapeInkRange = new MyScript.ShapeInkRange();
        expect(shapeInkRange.getFirstPoint()).to.be.undefined;
    });

    it('ShapeInkRange Last Point getter', function () {
        var shapeInkRange = new MyScript.ShapeInkRange();
        expect(shapeInkRange.getLastPoint()).to.be.undefined;
    });

});