'use strict';

describe('MyScriptJS: output/shape/shapePoint.js', function () {

    var expect = require('chai').expect;

    it('ShapePoint object exist', function () {
        expect(MyScript.ShapePoint).to.exist;
        expect(MyScript.ShapePoint).not.to.be.null;
        expect(MyScript.ShapePoint).to.not.be.undefined;
    });

    it('ShapePoint constructor', function () {
        var shapePoint = new MyScript.ShapePoint();
        expect(shapePoint).to.be.an('object');
        expect(shapePoint).to.be.an.instanceof(MyScript.Point);
        expect(shapePoint).to.be.an.instanceof(MyScript.ShapePoint);
    });

});