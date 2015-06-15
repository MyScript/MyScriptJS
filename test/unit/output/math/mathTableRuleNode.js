'use strict';

describe('MathTableRuleNode: output/math/mathTableRuleNode.js', function () {

    describe('Default construction', function () {

        var mathTableRuleNode;
        before(function (done) {
            mathTableRuleNode = new MyScript.MathTableRuleNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathTableRuleNode).to.be.an('object');
            expect(mathTableRuleNode).to.be.an.instanceOf(MyScript.MathRuleNode);
            expect(mathTableRuleNode).to.be.an.instanceOf(MyScript.MathTableRuleNode);
        });

        it('Get data', function () {
            expect(mathTableRuleNode.getData()).to.be.undefined;
        });

    });

});