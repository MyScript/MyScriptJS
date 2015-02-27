'use strict';

describe('MyScriptJS: output/math/mathSubSuperscriptRuleNode.js', function () {

    it('MathSubSuperscriptRuleNode object exist', function () {
        expect(MyScript.MathSubSuperscriptRuleNode).to.exist;
        expect(MyScript.MathSubSuperscriptRuleNode).not.to.be.null;
        expect(MyScript.MathSubSuperscriptRuleNode).to.not.be.undefined;
    });

    it('MathSubSuperscriptRuleNode constructor', function () {
        var mathSubSuperscriptRuleNode = new MyScript.MathSubSuperscriptRuleNode();
        expect(mathSubSuperscriptRuleNode).to.be.an('object');
        expect(mathSubSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathSubSuperscriptRuleNode).to.be.an.instanceof(MyScript.MathSubSuperscriptRuleNode);
    });
});