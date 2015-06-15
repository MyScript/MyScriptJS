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
            expect(shapeLine).to.be.an.instanceOf(MyScript.AbstractDecoratedShape);
            expect(shapeLine).to.be.an.instanceOf(MyScript.ShapeLine);
        });

        it('First Point getter', function () {
            expect(shapeLine.getFirstPoint()).to.be.undefined;
        });

        it('Last Point getter', function () {
            expect(shapeLine.getLastPoint()).to.be.undefined;
        });

    });

});