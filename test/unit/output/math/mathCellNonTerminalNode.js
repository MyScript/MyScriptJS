'use strict';

describe('MyScriptJS: output/math/mathCellNonTerminalNode.js', function () {

    it('MathCellNonTerminalNode object exist', function () {
        expect(MyScript.MathCellNonTerminalNode).to.exist;
        expect(MyScript.MathCellNonTerminalNode).not.to.be.null;
        expect(MyScript.MathCellNonTerminalNode).to.not.be.undefined;
    });

    var mathCellNonTerminalNode = new MyScript.MathCellNonTerminalNode();
    it('MathCellNonTerminalNode constructor', function () {
        expect(mathCellNonTerminalNode).to.be.an('object');
        expect(mathCellNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathCellNonTerminalNode).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
    });

    it('Get data', function () {
        expect(mathCellNonTerminalNode.getData()).to.be.undefined;
    });
});