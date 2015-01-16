'use strict';

describe('MyScriptJS: output/shape/shapeResult.js', function () {

    var expect = require('chai').expect;

    it('ShapeResult object exist', function () {
        expect(MyScript.ShapeResult).to.exist;
        expect(MyScript.ShapeResult).not.to.be.null;
        expect(MyScript.ShapeResult).to.not.be.undefined;
    });

    it('ShapeResult constructor', function () {
        var shapeResult = new MyScript.ShapeResult();
        expect(shapeResult).to.be.an('object');
        expect(shapeResult).to.be.an.instanceof(MyScript.AbstractResult);
        expect(shapeResult).to.be.an.instanceof(MyScript.ShapeResult);
    });

    it('ShapeResult Shape Document getter', function () {
        var shapeResult = new MyScript.ShapeResult();
        expect(shapeResult.getShapeDocument()).to.be.undefined;
    });

});