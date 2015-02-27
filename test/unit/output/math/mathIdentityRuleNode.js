'use strict';

describe('MyScriptJS: output/math/mathIdentityRuleNode.js', function () {

    it('MathIdentityRuleNode object exist', function () {
        expect(MyScript.MathIdentityRuleNode).to.exist;
        expect(MyScript.MathIdentityRuleNode).not.to.be.null;
        expect(MyScript.MathIdentityRuleNode).to.not.be.undefined;
    });

    it('MathIdentityRuleNode constructor', function () {
        var mathIdentityRuleNode = new MyScript.MathIdentityRuleNode();
        expect(mathIdentityRuleNode).to.be.an('object');
        expect(mathIdentityRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathIdentityRuleNode).to.be.an.instanceof(MyScript.MathIdentityRuleNode);
    });
});