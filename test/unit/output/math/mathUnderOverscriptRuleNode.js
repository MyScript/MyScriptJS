'use strict';

describe('MyScriptJS: output/math/mathUnderOverscriptRuleNode.js', function () {

    it('MathUnderOverscriptRuleNode object exist', function () {
        expect(MyScript.MathUnderOverscriptRuleNode).to.exist;
        expect(MyScript.MathUnderOverscriptRuleNode).not.to.be.null;
        expect(MyScript.MathUnderOverscriptRuleNode).to.not.be.undefined;
    });

    it('MathUnderOverscriptRuleNode constructor', function () {
        var mathUnderOverscriptRuleNode = new MyScript.MathUnderOverscriptRuleNode();
        expect(mathUnderOverscriptRuleNode).to.be.an('object');
        expect(mathUnderOverscriptRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathUnderOverscriptRuleNode).to.be.an.instanceof(MyScript.MathUnderOverscriptRuleNode);
    });
});