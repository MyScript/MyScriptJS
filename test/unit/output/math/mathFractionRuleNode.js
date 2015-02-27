'use strict';

describe('MyScriptJS: output/math/mathFractionRuleNode.js', function () {

    it('MathFractionRuleNode object exist', function () {
        expect(MyScript.MathFractionRuleNode).to.exist;
        expect(MyScript.MathFractionRuleNode).not.to.be.null;
        expect(MyScript.MathFractionRuleNode).to.not.be.undefined;
    });

    it('MathFractionRuleNode constructor', function () {
        var mathFractionRuleNode = new MyScript.MathFractionRuleNode();
        expect(mathFractionRuleNode).to.be.an('object');
        expect(mathFractionRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathFractionRuleNode).to.be.an.instanceof(MyScript.MathFractionRuleNode);
    });
});