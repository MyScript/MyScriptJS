'use strict';

describe('MyScriptJS: output/math/mathSubscriptRuleNode.js', function () {

    it('MathSubscriptRuleNode object exist', function () {
        expect(MyScript.MathSubscriptRuleNode).to.exist;
        expect(MyScript.MathSubscriptRuleNode).not.to.be.null;
        expect(MyScript.MathSubscriptRuleNode).to.not.be.undefined;
    });

    it('MathSubscriptRuleNode constructor', function () {
        var mathSubscriptRuleNode = new MyScript.MathSubscriptRuleNode();
        expect(mathSubscriptRuleNode).to.be.an('object');
        expect(mathSubscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathSubscriptRuleNode).to.be.an.instanceof(MyScript.MathSubscriptRuleNode);
    });
});