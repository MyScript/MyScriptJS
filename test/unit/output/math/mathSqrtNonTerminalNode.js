'use strict';

describe('MyScriptJS: output/math/mathSqrtNonTerminalNode.js', function () {

    it('MathSqrtNonTerminalNode object exist', function () {
        expect(MyScript.MathSqrtNonTerminalNode).to.exist;
        expect(MyScript.MathSqrtNonTerminalNode).not.to.be.null;
        expect(MyScript.MathSqrtNonTerminalNode).to.not.be.undefined;
    });

    it('MathSqrtNonTerminalNode constructor', function () {
        var mathSqrtNonTerminalNode = new MyScript.MathSqrtNonTerminalNode();
        expect(mathSqrtNonTerminalNode).to.be.an('object');
        expect(mathSqrtNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathSqrtNonTerminalNode).to.be.an.instanceof(MyScript.MathSqrtNonTerminalNode);
    });
});