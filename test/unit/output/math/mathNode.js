'use strict';

describe('MathNode: output/math/mathNode.js', function () {

    describe('Default construction', function () {

        var mathNode;
        before(function (done) {
            mathNode = new MyScript.MathNode();
            done();
        });

        it('check initial state', function () {
            expect(mathNode).to.be.an('object');
            expect(mathNode).to.be.an.instanceof(MyScript.MathNode);
        });

        it('Name getter', function () {
            expect(mathNode.getName()).to.be.undefined;
        });

        it('type getter', function () {
            expect(mathNode.getType()).to.be.undefined;
        });

    });

});