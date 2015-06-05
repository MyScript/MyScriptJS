'use strict';

describe('MathNonTerminalNode: output/math/mathNonTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathNonTerminalNode;
        before(function (done) {
            mathNonTerminalNode = new MyScript.MathNonTerminalNode();
            done();
        });

        it('check initial state', function () {
            expect(mathNonTerminalNode).to.be.an('object');
            expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
            expect(mathNonTerminalNode).to.have.ownProperty('candidates');
        });

        it('Candidates getter', function () {
            expect(mathNonTerminalNode.getCandidates()).to.be.empty;
        });

        it('Selected Candidate Idx getter', function () {
            expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.be.undefined;
        });

        it('Selected Candidate getter', function () {
            expect(mathNonTerminalNode.getSelectedCandidate()).to.be.undefined;
        });

        it('Bounding Box getter', function () {
            expect(mathNonTerminalNode.getBoundingBox()).to.be.undefined;
        });

    });

    describe('JSON construction', function () {

        var mathNonTerminalNode;
        before(function (done) {
            mathNonTerminalNode = new MyScript.MathNonTerminalNode({
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
            });
            done();
        });

        it('check initial state', function () {
            expect(mathNonTerminalNode).to.be.an('object');
            expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
            expect(mathNonTerminalNode).to.have.ownProperty('candidates');
        });
        it('Test MathNonTerminalNode object construction: selected index', function () {
            expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.equal(0);
        });
        it('Test MathNonTerminalNode object construction: MathNonTerminalNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[0]).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        });
        it('Test MathNonTerminalNode object construction: MathCellNonTerminalNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[1]).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
        });
        it('Test MathNonTerminalNode object construction: MathBorderNonTerminalNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[2]).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
        });
        it('Test MathNonTerminalNode object construction: MathTerminalNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[3]).to.be.an.instanceof(MyScript.MathTerminalNode);
        });
        it('Test MathNonTerminalNode object construction: MathRuleNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[4]).to.be.an.instanceof(MyScript.MathRuleNode);
        });
        it('Test MathNonTerminalNode object construction: MathTableRuleNode construction', function () {
            expect(mathNonTerminalNode.getCandidates()[5]).to.be.an.instanceof(MyScript.MathTableRuleNode);
        });
        it('Get bounding box', function () {
            expect(mathNonTerminalNode.getBoundingBox()).to.be.undefined;
        });

        it('Test MathNonTerminalNode object construction: wrong node type', function () {
            var data = {
                candidates: [{
                    type: 'ruleNode'
                }]
            };
            expect(function () {
                new MyScript.MathNonTerminalNode(data);
            }).to.throw(Error);
        });

    });
});