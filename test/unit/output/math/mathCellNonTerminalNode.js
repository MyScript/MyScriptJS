'use strict';

describe('MathCellNonTerminalNode: output/math/mathCellNonTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathCellNonTerminalNode;
        before(function (done) {
            mathCellNonTerminalNode = new MyScript.MathCellNonTerminalNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathCellNonTerminalNode).to.be.an('object');
            expect(mathCellNonTerminalNode).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
            expect(mathCellNonTerminalNode).to.be.an.instanceOf(MyScript.MathCellNonTerminalNode);
        });

        it('Get data', function () {
            expect(mathCellNonTerminalNode.getData()).to.equal(undefined);
        });

    });

});