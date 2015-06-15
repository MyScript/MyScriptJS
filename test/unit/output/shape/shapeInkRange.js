'use strict';

describe('ShapeInkRange: output/shape/shapeInkRange.js', function () {

    describe('Default construction', function () {

        var shapeInkRange;
        before(function (done) {
            shapeInkRange = new MyScript.ShapeInkRange();
            done();
        });

        it('Check initial state', function () {
            expect(shapeInkRange).to.be.an('object');
            expect(shapeInkRange).to.be.an.instanceOf(MyScript.ShapeInkRange);
        });

        it('Get first stroke', function () {
            expect(shapeInkRange.getFirstStroke()).to.equal(undefined);
        });

        it('Get last stroke', function () {
            expect(shapeInkRange.getLastStroke()).to.equal(undefined);
        });

        it('Get first point', function () {
            expect(shapeInkRange.getFirstPoint()).to.equal(undefined);
        });

        it('Get last point', function () {
            expect(shapeInkRange.getLastPoint()).to.equal(undefined);
        });

    });

});