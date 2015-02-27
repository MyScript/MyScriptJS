'use strict';

describe('MyScriptJS: output/math/mathSqrtRuleNode.js', function () {

    it('MathSqrtRuleNode object exist', function () {
        expect(MyScript.MathSqrtRuleNode).to.exist;
        expect(MyScript.MathSqrtRuleNode).not.to.be.null;
        expect(MyScript.MathSqrtRuleNode).to.not.be.undefined;
    });

    it('MathSqrtRuleNode constructor', function () {
        var mathSqrtRuleNode = new MyScript.MathSqrtRuleNode();
        expect(mathSqrtRuleNode).to.be.an('object');
        expect(mathSqrtRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathSqrtRuleNode).to.be.an.instanceof(MyScript.MathSqrtRuleNode);
    });
});