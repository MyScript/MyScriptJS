'use strict';

describe('ShapeEllipse: output/shape/shapeEllipse.js', function () {

    describe('Default construction', function () {

        var shapeEllipse;
        before(function (done) {
            shapeEllipse = new MyScript.ShapeEllipse();
            done();
        });

        it('Check initial state', function () {
            expect(shapeEllipse).to.be.an('object');
            expect(shapeEllipse).to.be.an.instanceOf(MyScript.AbstractShapePrimitive);
            expect(shapeEllipse).to.be.an.instanceOf(MyScript.ShapeEllipse);
        });

        it('Get center point', function () {
            expect(shapeEllipse.getCenter()).to.equal(undefined);
        });

        it('Get min radius', function () {
            expect(shapeEllipse.getMinRadius()).to.equal(undefined);
        });

        it('Get max radius', function () {
            expect(shapeEllipse.getMaxRadius()).to.equal(undefined);
        });

        it('Get orientation', function () {
            expect(shapeEllipse.getOrientation()).to.equal(undefined);
        });

        it('Get start angle', function () {
            expect(shapeEllipse.getStartAngle()).to.equal(undefined);
        });

        it('Get sweep angle', function () {
            expect(shapeEllipse.getSweepAngle()).to.equal(undefined);
        });

    });

});