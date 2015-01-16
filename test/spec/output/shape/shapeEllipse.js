'use strict';

describe('MyScriptJS: output/shape/shapeEllipse.js', function () {

    var expect = require('chai').expect;

    it('ShapeEllipse object exist', function () {
        expect(MyScript.ShapeEllipse).to.exist;
        expect(MyScript.ShapeEllipse).not.to.be.null;
        expect(MyScript.ShapeEllipse).to.not.be.undefined;
    });

    it('ShapeEllipse constructor', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse).to.be.an('object');
        expect(shapeEllipse).to.be.an.instanceof(MyScript.AbstractDecoratedShape);
        expect(shapeEllipse).to.be.an.instanceof(MyScript.ShapeEllipse);
    });

    it('ShapeEllipse Center getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getCenter()).to.be.undefined;
    });

    it('ShapeEllipse Min Radius getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getMinRadius()).to.be.undefined;
    });

    it('ShapeEllipse Max Radius getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getMaxRadius()).to.be.undefined;
    });

    it('ShapeEllipse Orientation getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getOrientation()).to.be.undefined;
    });

    it('ShapeEllipse Start Angle getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getStartAngle()).to.be.undefined;
    });

    it('ShapeEllipse Sweep Angle getter', function () {
        var shapeEllipse = new MyScript.ShapeEllipse();
        expect(shapeEllipse.getSweepAngle()).to.be.undefined;
    });
});