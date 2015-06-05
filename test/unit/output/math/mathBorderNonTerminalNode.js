'use strict';

describe('MathBorderNonTerminalNode: output/math/mathBorderNonTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathBorderNonTerminalNode;
        before(function (done) {
            mathBorderNonTerminalNode = new MyScript.MathBorderNonTerminalNode();
            done();
        });

        it('check initial state', function () {
            expect(mathBorderNonTerminalNode).to.be.an('object');
            expect(mathBorderNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
            expect(mathBorderNonTerminalNode).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
        });

        it('Get data', function () {
            expect(mathBorderNonTerminalNode.getData()).to.be.undefined;
        });

    });

});