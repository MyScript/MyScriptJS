'use strict';

describe('MathCellNonTerminalNode: output/math/mathCellNonTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathCellNonTerminalNode;
        before(function (done) {
            mathCellNonTerminalNode = new MyScript.MathCellNonTerminalNode();
            done();
        });

        it('check initial state', function () {
            expect(mathCellNonTerminalNode).to.be.an('object');
            expect(mathCellNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
            expect(mathCellNonTerminalNode).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
        });

        it('Get data', function () {
            expect(mathCellNonTerminalNode.getData()).to.be.undefined;
        });

    });

});