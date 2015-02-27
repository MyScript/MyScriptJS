'use strict';

describe('MyScriptJS: output/math/mathOverscriptRuleNode.js', function () {

    it('MathOverscriptRuleNode object exist', function () {
        expect(MyScript.MathOverscriptRuleNode).to.exist;
        expect(MyScript.MathOverscriptRuleNode).not.to.be.null;
        expect(MyScript.MathOverscriptRuleNode).to.not.be.undefined;
    });

    it('MathOverscriptRuleNode constructor', function () {
        var mathOverscriptRuleNode = new MyScript.MathOverscriptRuleNode();
        expect(mathOverscriptRuleNode).to.be.an('object');
        expect(mathOverscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathOverscriptRuleNode).to.be.an.instanceof(MyScript.MathOverscriptRuleNode);
    });
});