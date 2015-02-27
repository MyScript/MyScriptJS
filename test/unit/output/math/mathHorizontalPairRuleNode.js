'use strict';

describe('MyScriptJS: output/math/mathHorizontalPairRuleNode.js', function () {

    it('MathHorizontalPairRuleNode object exist', function () {
        expect(MyScript.MathHorizontalPairRuleNode).to.exist;
        expect(MyScript.MathHorizontalPairRuleNode).not.to.be.null;
        expect(MyScript.MathHorizontalPairRuleNode).to.not.be.undefined;
    });

    it('MathHorizontalPairRuleNode constructor', function () {
        var mathHorizontalPairRuleNode = new MyScript.MathHorizontalPairRuleNode();
        expect(mathHorizontalPairRuleNode).to.be.an('object');
        expect(mathHorizontalPairRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathHorizontalPairRuleNode).to.be.an.instanceof(MyScript.MathHorizontalPairRuleNode);
    });
});