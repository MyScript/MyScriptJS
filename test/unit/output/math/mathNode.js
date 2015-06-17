'use strict';

describe('MathNode: output/math/mathNode.js', function () {

    describe('Default construction', function () {

        var mathNode;
        before(function (done) {
            mathNode = new MyScript.MathNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathNode).to.be.an('object');
            expect(mathNode).to.be.an.instanceOf(MyScript.MathNode);
        });

        it('Get name', function () {
            expect(mathNode.getName()).to.equal(undefined);
        });

        it('Get type', function () {
            expect(mathNode.getType()).to.equal(undefined);
        });

    });

});