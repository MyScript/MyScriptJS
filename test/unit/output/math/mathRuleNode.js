'use strict';

describe('MyScriptJS: output/math/mathRuleNode.js', function () {

	it('MathRuleNode object exist', function () {
		expect(MyScript.MathRuleNode).to.exist;
		expect(MyScript.MathRuleNode).not.to.be.null;
		expect(MyScript.MathRuleNode).to.not.be.undefined;
	});

	it('MathRuleNode constructor', function () {
		var mathRuleNode = new MyScript.MathRuleNode();
		expect(mathRuleNode).to.be.an('object');
		expect(mathRuleNode).to.be.an.instanceof(MyScript.MathNode);
		expect(mathRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
		expect(mathRuleNode).to.have.ownProperty('children');
	});

	it('MathRuleNode Name getter', function () {
		var mathRuleNode = new MyScript.MathRuleNode();
		expect(mathRuleNode.getName()).to.be.undefined;
	});

	it('MathRuleNode Children getter', function () {
		var mathRuleNode = new MyScript.MathRuleNode();
		expect(mathRuleNode.getChildren()).to.be.empty;
	});
});