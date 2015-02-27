'use strict';

describe('MyScriptJS: output/math/mathSuperscriptRuleNode.js', function () {

    it('MathSuperscriptRuleNode object exist', function () {
        expect(MyScript.MathSuperscriptRuleNode).to.exist;
        expect(MyScript.MathSuperscriptRuleNode).not.to.be.null;
        expect(MyScript.MathSuperscriptRuleNode).to.not.be.undefined;
    });

    it('MathSuperscriptRuleNode constructor', function () {
        var mathSuperscriptRuleNode = new MyScript.MathSuperscriptRuleNode();
        expect(mathSuperscriptRuleNode).to.be.an('object');
        expect(mathSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathSuperscriptRuleNode);
    });
});