'use strict';

describe('MyScriptJS: output/math/mathPreSuperscriptRuleNode.js', function () {

    it('MathPreSuperscriptRuleNode object exist', function () {
        expect(MyScript.MathPreSuperscriptRuleNode).to.exist;
        expect(MyScript.MathPreSuperscriptRuleNode).not.to.be.null;
        expect(MyScript.MathPreSuperscriptRuleNode).to.not.be.undefined;
    });

    it('MathPreSuperscriptRuleNode constructor', function () {
        var mathPreSuperscriptRuleNode = new MyScript.MathPreSuperscriptRuleNode();
        expect(mathPreSuperscriptRuleNode).to.be.an('object');
        expect(mathPreSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathPreSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathPreSuperscriptRuleNode);
    });
});