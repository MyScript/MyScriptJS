'use strict';

describe('MyScriptJS: output/math/mathExponentiableNonTerminalNode.js', function () {

    it('MathExponentiableNonTerminalNode object exist', function () {
        expect(MyScript.MathExponentiableNonTerminalNode).to.exist;
        expect(MyScript.MathExponentiableNonTerminalNode).not.to.be.null;
        expect(MyScript.MathExponentiableNonTerminalNode).to.not.be.undefined;
    });

    it('MathExponentiableNonTerminalNode constructor', function () {
        var mathExponentiableNonTerminalNode = new MyScript.MathExponentiableNonTerminalNode();
        expect(mathExponentiableNonTerminalNode).to.be.an('object');
        expect(mathExponentiableNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathExponentiableNonTerminalNode).to.be.an.instanceof(MyScript.MathExponentiableNonTerminalNode);
    });
});