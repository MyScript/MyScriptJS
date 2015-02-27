'use strict';

describe('MyScriptJS: output/math/mathFenceRuleNode.js', function () {

    it('MathFenceRuleNode object exist', function () {
        expect(MyScript.MathFenceRuleNode).to.exist;
        expect(MyScript.MathFenceRuleNode).not.to.be.null;
        expect(MyScript.MathFenceRuleNode).to.not.be.undefined;
    });

    it('MathExpressionNonTerminalNode constructor', function () {
        var mathFenceRuleNode = new MyScript.MathFenceRuleNode();
        expect(mathFenceRuleNode).to.be.an('object');
        expect(mathFenceRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathFenceRuleNode).to.be.an.instanceof(MyScript.MathFenceRuleNode);
    });
});