'use strict';

describe('ShapeResult: output/shape/shapeResult.js', function () {

    describe('Default construction', function () {

        var shapeResult;
        before(function (done) {
            shapeResult = new MyScript.ShapeResult();
            done();
        });

        it('check initial state', function () {
            expect(shapeResult).to.be.an('object');
            expect(shapeResult).to.be.an.instanceof(MyScript.AbstractResult);
            expect(shapeResult).to.be.an.instanceof(MyScript.ShapeResult);
        });

        it('Shape Document getter', function () {
            expect(shapeResult.getShapeDocument()).to.be.undefined;
        });

    });

});