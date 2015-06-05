'use strict';

describe('AbstractShapePrimitive: output/shape/abstractShapePrimitive.js', function () {

    describe('Default construction', function () {

        var abstractShapePrimitive;
        before(function (done) {
            abstractShapePrimitive = new MyScript.AbstractShapePrimitive();
            done();
        });

        it('check initial state', function () {
            expect(abstractShapePrimitive).to.be.an('object');
            expect(abstractShapePrimitive).to.be.an.instanceof(MyScript.AbstractShapePrimitive);
        });

        it('Type getter', function () {
            expect(abstractShapePrimitive.getType()).to.be.undefined;
        });

        it('Is Line getter', function () {
            expect(abstractShapePrimitive.isLine()).to.be.false;
        });

        it('Is Ellipse getter', function () {
            expect(abstractShapePrimitive.isEllipse()).to.be.false;
        });

    });

});