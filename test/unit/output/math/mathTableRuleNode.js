'use strict';

describe('MyScriptJS: output/math/mathTableRuleNode.js', function () {

    it('MathTableRuleNode object exist', function () {
        expect(MyScript.MathTableRuleNode).to.exist;
        expect(MyScript.MathTableRuleNode).not.to.be.null;
        expect(MyScript.MathTableRuleNode).to.not.be.undefined;
    });

    var mathTableRuleNode = new MyScript.MathTableRuleNode();
    it('MathTableRuleNode constructor', function () {
        expect(mathTableRuleNode).to.be.an('object');
        expect(mathTableRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathTableRuleNode).to.be.an.instanceof(MyScript.MathTableRuleNode);
    });

    it('Get data', function () {
        expect(mathTableRuleNode.getData()).to.be.undefined;
    });
});