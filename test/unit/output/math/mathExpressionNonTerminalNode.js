'use strict';

describe('MyScriptJS: output/math/mathExpressionNonTerminalNode.js', function () {

    it('MathExpressionNonTerminalNode object exist', function () {
        expect(MyScript.MathExpressionNonTerminalNode).to.exist;
        expect(MyScript.MathExpressionNonTerminalNode).not.to.be.null;
        expect(MyScript.MathExpressionNonTerminalNode).to.not.be.undefined;
    });

    it('MathExpressionNonTerminalNode constructor', function () {
        var mathExpressionNonTerminalNode = new MyScript.MathExpressionNonTerminalNode();
        expect(mathExpressionNonTerminalNode).to.be.an('object');
        expect(mathExpressionNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathExpressionNonTerminalNode).to.be.an.instanceof(MyScript.MathExpressionNonTerminalNode);
    });
});