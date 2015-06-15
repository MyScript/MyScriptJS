'use strict';

describe('ShapeLine: output/shape/shapeLine.js', function () {

    describe('Default construction', function () {

        var shapeLine;
        before(function (done) {
            shapeLine = new MyScript.ShapeLine();
            done();
        });

        it('Check initial state', function () {
            expect(shapeLine).to.be.an('object');
            expect(shapeLine).to.be.an.instanceOf(MyScript.AbstractShapePrimitive);
            expect(shapeLine).to.be.an.instanceOf(MyScript.ShapeLine);
        });

        it('Get first point', function () {
            expect(shapeLine.getFirstPoint()).to.equal(undefined);
        });

        it('Get last point', function () {
            expect(shapeLine.getLastPoint()).to.equal(undefined);
        });

    });

});