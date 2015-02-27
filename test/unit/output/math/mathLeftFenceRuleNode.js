'use strict';

describe('MyScriptJS: output/math/mathLeftFenceRuleNode.js', function () {

    it('MathLeftFenceRuleNode object exist', function () {
        expect(MyScript.MathLeftFenceRuleNode).to.exist;
        expect(MyScript.MathLeftFenceRuleNode).not.to.be.null;
        expect(MyScript.MathLeftFenceRuleNode).to.not.be.undefined;
    });

    it('MathLeftFenceRuleNode constructor', function () {
        var mathLeftFenceRuleNode = new MyScript.MathLeftFenceRuleNode();
        expect(mathLeftFenceRuleNode).to.be.an('object');
        expect(mathLeftFenceRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathLeftFenceRuleNode).to.be.an.instanceof(MyScript.MathLeftFenceRuleNode);
    });
});