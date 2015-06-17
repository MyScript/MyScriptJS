'use strict';

describe('AbstractShapePrimitive: output/shape/abstractShapePrimitive.js', function () {

    describe('Default construction', function () {

        var abstractShapePrimitive;
        before(function (done) {
            abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
            done();
        });

        it('Check initial state', function () {
            expect(abstractShapePrimitive).to.be.an('object');
            expect(abstractShapePrimitive).to.be.an.instanceOf(MyScript.AbstractShapePrimitive);
        });

        it('Get type', function () {
            expect(abstractShapePrimitive.getType()).to.equal(undefined);
        });

        it('Get is line', function () {
            expect(abstractShapePrimitive.isLine()).to.equal(false);
        });

        it('Get is ellipse', function () {
            expect(abstractShapePrimitive.isEllipse()).to.equal(false);
        });

        it('Check has begin decoration', function () {
            expect(abstractShapePrimitive.hasBeginDecoration()).to.equal(false);
        });

        it('Check has end decoration', function () {
            expect(abstractShapePrimitive.hasEndDecoration()).to.equal(false);
        });

        it('Get begin decoration', function () {
            expect(abstractShapePrimitive.getBeginDecoration()).to.equal(undefined);
        });

        it('Get end decoration', function () {
            expect(abstractShapePrimitive.getEndDecoration()).to.equal(undefined);
        });

        it('Get begin tangent angle', function () {
            expect(abstractShapePrimitive.getBeginTangentAngle()).to.equal(undefined);
        });

        it('Get end tangent angle', function () {
            expect(abstractShapePrimitive.getEndTangentAngle()).to.equal(undefined);
        });

    });

    describe('JSON construction', function () {

        var abstractShapePrimitive;
        before(function (done) {
            abstractShapePrimitive = new MyScript.AbstractShapePrimitive({
                type: 'line',
                beginDecoration: 'ARROW_HEAD',
                beginTangentAngle: 3.1415927,
                endDecoration: 'ARROW_HEAD',
                endTangentAngle: 0
            });
            done();
        });

        it('Check initial state', function () {
            expect(abstractShapePrimitive).to.be.an('object');
            expect(abstractShapePrimitive).to.be.an.instanceOf(MyScript.AbstractShapePrimitive);
        });

        it('Get type', function () {
            expect(abstractShapePrimitive.getType()).to.equal('line');
        });

        it('Get is line', function () {
            expect(abstractShapePrimitive.isLine()).to.equal(true);
        });

        it('Get is ellipse', function () {
            expect(abstractShapePrimitive.isEllipse()).to.equal(false);
        });

        it('Check has begin decoration', function () {
            expect(abstractShapePrimitive.hasBeginDecoration()).to.equal(true);
        });

        it('Check has end decoration', function () {
            expect(abstractShapePrimitive.hasEndDecoration()).to.equal(true);
        });

        it('Get begin decoration', function () {
            expect(abstractShapePrimitive.getBeginDecoration()).to.equal('ARROW_HEAD');
        });

        it('Get end decoration', function () {
            expect(abstractShapePrimitive.getEndDecoration()).to.equal('ARROW_HEAD');
        });

        it('Get begin tangent angle', function () {
            expect(abstractShapePrimitive.getBeginTangentAngle()).to.equal(3.1415927);
        });

        it('Get end tangent angle', function () {
            expect(abstractShapePrimitive.getEndTangentAngle()).to.equal(0);
        });

    });

});