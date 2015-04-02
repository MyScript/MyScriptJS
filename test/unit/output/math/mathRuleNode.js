'use strict';

describe('MyScriptJS: output/math/mathRuleNode.js', function () {

    it('MathRuleNode object exist', function () {
        expect(MyScript.MathRuleNode).to.exist;
        expect(MyScript.MathRuleNode).not.to.be.null;
        expect(MyScript.MathRuleNode).to.not.be.undefined;
    });

    var mathRuleNode = new MyScript.MathRuleNode();
    it('MathRuleNode constructor', function () {
        expect(mathRuleNode).to.be.an('object');
        expect(mathRuleNode).to.be.an.instanceof(MyScript.MathNode);
        expect(mathRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
        expect(mathRuleNode).to.have.ownProperty('children');
    });

    it('MathRuleNode Name getter', function () {
        expect(mathRuleNode.getName()).to.be.undefined;
    });

    it('MathRuleNode Children getter', function () {
        expect(mathRuleNode.getChildren()).to.be.empty;
    });

    var obj = {
        children: [{
            type: 'nonTerminalNode',
            name: 'term'
        }, {
            type: 'nonTerminalNode',
            name: 'sqrtTerm'
        }, {
            type: 'nonTerminalNode',
            name: 'vectorTerm'
        }, {
            type: 'nonTerminalNode',
            name: 'system'
        }, {
            type: 'nonTerminalNode',
            name: 'exponentiable'
        }, {
            type: 'nonTerminalNode',
            name: 'expression'
        }, {
            type: 'terminalNode'
        }, {
            type: 'rule',
            name: 'identity'
        }, {
            type: 'rule',
            name: 'horizontal pair'
        }, {
            type: 'rule',
            name: 'fence'
        }, {
            type: 'rule',
            name: 'fraction'
        }, {
            type: 'rule',
            name: 'sqrt'
        }, {
            type: 'rule',
            name: 'subscript'
        }, {
            type: 'rule',
            name: 'superscript'
        }, {
            type: 'rule',
            name: 'subsuperscript'
        }, {
            type: 'rule',
            name: 'underscript'
        }, {
            type: 'rule',
            name: 'overscript'
        }, {
            type: 'rule',
            name: 'underoverscript'
        }, {
            type: 'rule',
            name: 'presuperscript'
        }, {
            type: 'rule',
            name: 'vertical pair'
        }, {
            type: 'rule',
            name: 'left fence'
        }]
    };

    var mathRuleNode2 = new MyScript.MathRuleNode(obj);
    it('Test MathRuleNode object construction: MathTermNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[0]).to.be.an.instanceof(MyScript.MathTermNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathSqrtNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[1]).to.be.an.instanceof(MyScript.MathSqrtNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathVectorNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[2]).to.be.an.instanceof(MyScript.MathVectorNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathSystemNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[3]).to.be.an.instanceof(MyScript.MathSystemNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathExponentiableNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[4]).to.be.an.instanceof(MyScript.MathExponentiableNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathExpressionNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[5]).to.be.an.instanceof(MyScript.MathExpressionNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[6]).to.be.an.instanceof(MyScript.MathTerminalNode);
    });
    it('Test MathRuleNode object construction: MathIdentityRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[7]).to.be.an.instanceof(MyScript.MathIdentityRuleNode);
    });
    it('Test MathRuleNode object construction: MathHorizontalPairRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[8]).to.be.an.instanceof(MyScript.MathHorizontalPairRuleNode);
    });
    it('Test MathRuleNode object construction: MathFenceRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[9]).to.be.an.instanceof(MyScript.MathFenceRuleNode);
    });
    it('Test MathRuleNode object construction: MathFractionRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[10]).to.be.an.instanceof(MyScript.MathFractionRuleNode);
    });
    it('Test MathRuleNode object construction: MathSqrtRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[11]).to.be.an.instanceof(MyScript.MathSqrtRuleNode);
    });
    it('Test MathRuleNode object construction: MathSubscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[12]).to.be.an.instanceof(MyScript.MathSubscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathSuperscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[13]).to.be.an.instanceof(MyScript.MathSuperscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathSubSuperscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[14]).to.be.an.instanceof(MyScript.MathSubSuperscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathUnderscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[15]).to.be.an.instanceof(MyScript.MathUnderscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathOverscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[16]).to.be.an.instanceof(MyScript.MathOverscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathUnderOverscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[17]).to.be.an.instanceof(MyScript.MathUnderOverscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathPreSuperscriptRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[18]).to.be.an.instanceof(MyScript.MathPreSuperscriptRuleNode);
    });
    it('Test MathRuleNode object construction: MathVerticalPairRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[19]).to.be.an.instanceof(MyScript.MathVerticalPairRuleNode);
    });
    it('Test MathRuleNode object construction: MathLeftFenceRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[20]).to.be.an.instanceof(MyScript.MathLeftFenceRuleNode);
    });

    it('Test MathRuleNode object construction: wrong nonTerminalNode', function () {
        var data = {
            children: [{
                type: 'nonTerminalNode',
                name: 'terminalNode'
            }]
        };
        expect(function(){new MyScript.MathRuleNode(data);}).to.throw(Error);
    });

    it('Test MathRuleNode object construction: wrong ruleNode', function () {
        var data = {
            children: [{
                type: 'rule',
                name: 'terminalNode'
            }]
        };
        expect(function(){new MyScript.MathRuleNode(data);}).to.throw(Error);
    });

    it('Test MathRuleNode object construction: wrong node type', function () {
        var data = {
            children: [{
                type: 'ruleNode'
            }]
        };
        expect(function(){new MyScript.MathRuleNode(data);}).to.throw(Error);
    });
});