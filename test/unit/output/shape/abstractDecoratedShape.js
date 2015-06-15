'use strict';

describe('AbstractDecoratedShape: output/shape/abstractDecoratedShape.js', function () {

    describe('Default construction', function () {

        var abstractDecoratedShape;
        before(function (done) {
            abstractDecoratedShape = new MyScript.AbstractDecoratedShape();
            done();
        });

        it('Check initial state', function () {
            expect(abstractDecoratedShape).to.be.an('object');
            expect(abstractDecoratedShape).to.be.an.instanceOf(MyScript.AbstractShapePrimitive);
            expect(abstractDecoratedShape).to.be.an.instanceOf(MyScript.AbstractDecoratedShape);
        });

        it('Has Begin Decoration', function () {
            expect(abstractDecoratedShape.hasBeginDecoration()).to.be.false;
        });

        it('Has End Decoration', function () {
            expect(abstractDecoratedShape.hasEndDecoration()).to.be.false;
        });

        it('Begin Decoration getter', function () {
            expect(abstractDecoratedShape.getBeginDecoration()).to.be.undefined;
        });

        it('End Decoration getter', function () {
            expect(abstractDecoratedShape.getEndDecoration()).to.be.undefined;
        });

        it('Begin Tangent Angle getter', function () {
            expect(abstractDecoratedShape.getBeginTangentAngle()).to.be.undefined;
        });

        it('End Tangent Angle getter', function () {
            expect(abstractDecoratedShape.getEndTangentAngle()).to.be.undefined;
        });

    });

});