'use strict';

describe('MyScriptJS: output/math/mathUnderscriptRuleNode.js', function () {

    it('MathUnderscriptRuleNode object exist', function () {
        expect(MyScript.MathUnderscriptRuleNode).to.exist;
        expect(MyScript.MathUnderscriptRuleNode).not.to.be.null;
        expect(MyScript.MathUnderscriptRuleNode).to.not.be.undefined;
    });

    it('MathUnderscriptRuleNode constructor', function () {
        var mathUnderscriptRuleNode = new MyScript.MathUnderscriptRuleNode();
        expect(mathUnderscriptRuleNode).to.be.an('object');
        expect(mathUnderscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathUnderscriptRuleNode).to.be.an.instanceof(MyScript.MathUnderscriptRuleNode);
    });
});