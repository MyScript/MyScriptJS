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
            type: 'nonTerminalNode'
        }, {
            type: 'cell'
        }, {
            type: 'border'
        }, {
            type: 'terminalNode'
        }, {
            type: 'rule'
        }, {
            type: 'table'
        }]
    };

    var mathNonTerminalNode2 = new MyScript.MathNonTerminalNode(obj);
    it('Test MathNonTerminalNode object construction: selected index', function () {
        expect(mathNonTerminalNode2.getSelectedCandidateIdx()).to.equal(0);
    });
    it('Test MathNonTerminalNode object construction: MathNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[0]).to.be.an.instanceof(MyScript.MathNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathCellNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[1]).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathBorderNonTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[2]).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathTerminalNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[3]).to.be.an.instanceof(MyScript.MathTerminalNode);
    });
    it('Test MathNonTerminalNode object construction: MathRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[4]).to.be.an.instanceof(MyScript.MathRuleNode);
    });
    it('Test MathNonTerminalNode object construction: MathTableRuleNode construction', function () {
        expect(mathNonTerminalNode2.getCandidates()[5]).to.be.an.instanceof(MyScript.MathTableRuleNode);
    });
    it('Get bounding box', function () {
        expect(mathNonTerminalNode2.getBoundingBox()).to.be.undefined;
    });

    it('Test MathNonTerminalNode object construction: wrong node type', function () {
        var data = {
            candidates: [{
                type: 'ruleNode'
            }]
        };
        expect(function(){new MyScript.MathNonTerminalNode(data);}).to.throw(Error);
    });
});