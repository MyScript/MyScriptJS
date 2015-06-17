'use strict';

describe('ShapeResult: output/shape/shapeResult.js', function () {

    describe('Default construction', function () {

        var shapeResult;
        before(function (done) {
            shapeResult = new MyScript.ShapeResult();
            done();
        });

        it('Check initial state', function () {
            expect(shapeResult).to.be.an('object');
            expect(shapeResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(shapeResult).to.be.an.instanceOf(MyScript.ShapeResult);
        });

        it('Get ShapeDocument', function () {
            expect(shapeResult.getShapeDocument()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var shapeResult;
        before(function (done) {
            shapeResult = new MyScript.ShapeResult({
                result: 'test'
            });
            done();
        });

        it('Check initial state', function () {
            expect(shapeResult).to.be.an('object');
            expect(shapeResult).to.be.an.instanceOf(MyScript.AbstractResult);
            expect(shapeResult).to.be.an.instanceOf(MyScript.ShapeResult);
        });

        it('Get ShapeDocument', function () {
            expect(shapeResult.getShapeDocument()).to.be.an.instanceOf(MyScript.ShapeDocument);
        });

    });

});