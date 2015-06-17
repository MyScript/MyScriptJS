'use strict';

describe('MathNonTerminalNode: output/math/mathNonTerminalNode.js', function () {

    describe('Default construction', function () {

        var mathNonTerminalNode;
        before(function (done) {
            mathNonTerminalNode = new MyScript.MathNonTerminalNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathNonTerminalNode).to.be.an('object');
            expect(mathNonTerminalNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathNonTerminalNode).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
            expect(mathNonTerminalNode).to.have.ownProperty('candidates');
        });

        it('Get candidates', function () {
            expect(mathNonTerminalNode.getCandidates().length).to.equal(0);
        });

        it('Get selected candidate index', function () {
            expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.equal(undefined);
        });

        it('Get selected candidate', function () {
            expect(mathNonTerminalNode.getSelectedCandidate()).to.equal(undefined);
        });

        it('Get ink ranges', function () {
            expect(function () {
                mathNonTerminalNode.getInkRanges(); // no selected candidate
            }).to.throw(Error);
        });

    });

    describe('JSON construction', function () {

        var mathNonTerminalNode;
        before(function (done) {
            mathNonTerminalNode = new MyScript.MathNonTerminalNode({
                selectedCandidate: 3,
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

        it('Check initial state', function () {
            expect(mathNonTerminalNode).to.be.an('object');
            expect(mathNonTerminalNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathNonTerminalNode).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
            expect(mathNonTerminalNode).to.have.ownProperty('candidates');
        });

        it('Get candidates', function () {
            expect(mathNonTerminalNode.getCandidates().length).to.equal(6);
        });

        it('Get selected index', function () {
            expect(mathNonTerminalNode.getSelectedCandidateIdx()).to.equal(3);
        });

        it('Get non terminal node', function () {
            expect(mathNonTerminalNode.getCandidates()[0]).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
        });

        it('Get cell', function () {
            expect(mathNonTerminalNode.getCandidates()[1]).to.be.an.instanceOf(MyScript.MathCellNonTerminalNode);
        });

        it('Get border', function () {
            expect(mathNonTerminalNode.getCandidates()[2]).to.be.an.instanceOf(MyScript.MathBorderNonTerminalNode);
        });

        it('Get terminal node', function () {
            expect(mathNonTerminalNode.getCandidates()[3]).to.be.an.instanceOf(MyScript.MathTerminalNode);
        });

        it('Get rule node', function () {
            expect(mathNonTerminalNode.getCandidates()[4]).to.be.an.instanceOf(MyScript.MathRuleNode);
        });

        it('Get table', function () {
            expect(mathNonTerminalNode.getCandidates()[5]).to.be.an.instanceOf(MyScript.MathTableRuleNode);
        });

        it('Get ink ranges', function () {
            expect(mathNonTerminalNode.getInkRanges().length).to.equal(0);
        });

        it('Get wrong node type', function () {
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