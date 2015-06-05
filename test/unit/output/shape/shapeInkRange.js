'use strict';

describe('ShapeInkRange: output/shape/shapeInkRange.js', function () {

    describe('Default construction', function () {

        var shapeInkRange;
        before(function (done) {
            shapeInkRange = new MyScript.ShapeInkRange();
            done();
        });

        it('check initial state', function () {
            expect(shapeInkRange).to.be.an('object');
            expect(shapeInkRange).to.be.an.instanceof(MyScript.ShapeInkRange);
        });

        it('First Stroke getter', function () {
            expect(shapeInkRange.getFirstStroke()).to.be.undefined;
        });

        it('Last Stroke getter', function () {
            expect(shapeInkRange.getLastStroke()).to.be.undefined;
        });

        it('First Point getter', function () {
            expect(shapeInkRange.getFirstPoint()).to.be.undefined;
        });

        it('Last Point getter', function () {
            expect(shapeInkRange.getLastPoint()).to.be.undefined;
        });

    });

});