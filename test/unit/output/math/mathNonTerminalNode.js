'use strict';

describe('MyScriptJS: output/math/mathNonTerminalNode.js', function () {

    it('MathNonTerminalNode object exist', function () {
        expect(MyScript.MathNonTerminalNode).to.exist;
        expect(MyScript.MathNonTerminalNode).not.to.be.null;
        expect(MyScript.MathNonTerminalNode).to.not.be.undefined;
    });

    var mathNonTerminalNode = new MyScript.MathNonTerminalNode();
    it('MathNonTerminalNode constructor', function () {
        expect(mathNonTerminalNode).to.be.an('object');
        expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNode);
        expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathNonTerminalNode).to.have.ownProperty('candidates');
    });

    it('MathNonTerminalNode Candidates getter', function () {
        expect(mathNonTerminalNode.getCandidates()).to.be.empty;
    });

    it('MathNonTerminalNode Selected Candidate Idx getter', function () {
        expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.be.undefined;
    });

    it('MathNonTerminalNode Selected Candidate getter', function () {
        expect(mathNonTerminalNode.getSelectedCandidate()).to.be.undefined;
    });

    it('MathNonTerminalNode Bounding Box getter', function () {
        expect(mathNonTerminalNode.getBoundingBox()).to.be.undefined;
    });

    var obj = {
        selectedCandidate: 0,
        candidates: [{
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

    var mathNonTerminalNode2 = new MyScript.MathNonTerminalNode(obj);
    it('Test MathNonTerminalNode object construction: selected index', function () {
        expect(mathNonTerminalNode2.getSelectedCandidateIdx()).to.equal(0);
    });
    it('Test MathNonTerminalNode object construction: MathTermNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[0]).to.be.an.instanceof(MyScript.MathTermNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathSqrtNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[1]).to.be.an.instanceof(MyScript.MathSqrtNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathVectorNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[2]).to.be.an.instanceof(MyScript.MathVectorNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathSystemNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[3]).to.be.an.instanceof(MyScript.MathSystemNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathExponentiableNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[4]).to.be.an.instanceof(MyScript.MathExponentiableNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathExpressionNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[5]).to.be.an.instanceof(MyScript.MathExpressionNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[6]).to.be.an.instanceof(MyScript.MathTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathIdentityRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[7]).to.be.an.instanceof(MyScript.MathIdentityRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathHorizontalPairRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[8]).to.be.an.instanceof(MyScript.MathHorizontalPairRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathFenceRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[9]).to.be.an.instanceof(MyScript.MathFenceRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathFractionRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[10]).to.be.an.instanceof(MyScript.MathFractionRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathSqrtRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[11]).to.be.an.instanceof(MyScript.MathSqrtRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathSubscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[12]).to.be.an.instanceof(MyScript.MathSubscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathSuperscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[13]).to.be.an.instanceof(MyScript.MathSuperscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathSubSuperscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[14]).to.be.an.instanceof(MyScript.MathSubSuperscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathUnderscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[15]).to.be.an.instanceof(MyScript.MathUnderscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathOverscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[16]).to.be.an.instanceof(MyScript.MathOverscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathUnderOverscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[17]).to.be.an.instanceof(MyScript.MathUnderOverscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathPreSuperscriptRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[18]).to.be.an.instanceof(MyScript.MathPreSuperscriptRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathVerticalPairRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[19]).to.be.an.instanceof(MyScript.MathVerticalPairRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathLeftFenceRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[20]).to.be.an.instanceof(MyScript.MathLeftFenceRuleNode);
    });
});