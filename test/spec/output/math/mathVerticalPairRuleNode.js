'use strict';

describe('MyScriptJS: output/math/mathVerticalPairRuleNode.js', function () {

    it('MathVerticalPairRuleNode object exist', function () {
        expect(MyScript.MathVerticalPairRuleNode).to.exist;
        expect(MyScript.MathVerticalPairRuleNode).not.to.be.null;
        expect(MyScript.MathVerticalPairRuleNode).to.not.be.undefined;
    });

    it('MathVerticalPairRuleNode constructor', function () {
        var mathVerticalPairRuleNode = new MyScript.MathVerticalPairRuleNode();
        expect(mathVerticalPairRuleNode).to.be.an('object');
        expect(mathVerticalPairRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathVerticalPairRuleNode).to.be.an.instanceof(MyScript.MathVerticalPairRuleNode);
    });
});