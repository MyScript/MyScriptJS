'use strict';

describe('ShapeEllipse: output/shape/shapeEllipse.js', function () {

    describe('Default construction', function () {

        var shapeEllipse;
        before(function (done) {
            shapeEllipse = new MyScript.ShapeEllipse();
            done();
        });

        it('check initial state', function () {
            expect(shapeEllipse).to.be.an('object');
            expect(shapeEllipse).to.be.an.instanceof(MyScript.AbstractDecoratedShape);
            expect(shapeEllipse).to.be.an.instanceof(MyScript.ShapeEllipse);
        });

        it('Center getter', function () {
            expect(shapeEllipse.getCenter()).to.be.undefined;
        });

        it('Min Radius getter', function () {
            expect(shapeEllipse.getMinRadius()).to.be.undefined;
        });

        it('Max Radius getter', function () {
            expect(shapeEllipse.getMaxRadius()).to.be.undefined;
        });

        it('Orientation getter', function () {
            expect(shapeEllipse.getOrientation()).to.be.undefined;
        });

        it('Start Angle getter', function () {
            expect(shapeEllipse.getStartAngle()).to.be.undefined;
        });

        it('Sweep Angle getter', function () {
            expect(shapeEllipse.getSweepAngle()).to.be.undefined;
        });

    });

});