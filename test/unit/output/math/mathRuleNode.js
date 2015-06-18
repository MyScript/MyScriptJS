'use strict';

describe('MathRuleNode: output/math/mathRuleNode.js', function () {

    describe('Default construction', function () {

        var mathRuleNode;
        before(function (done) {
            mathRuleNode = new MyScript.MathRuleNode();
            done();
        });

        it('Check initial state', function () {
            expect(mathRuleNode).to.be.an('object');
            expect(mathRuleNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathRuleNode).to.be.an.instanceOf(MyScript.MathRuleNode);
            expect(mathRuleNode).to.have.ownProperty('children');
        });

        it('Get name', function () {
            expect(mathRuleNode.getName()).to.equal(undefined);
        });

        it('Get children', function () {
            expect(mathRuleNode.getChildren().length).to.equal(0);
        });

        it('Get inkRanges', function () {
            expect(mathRuleNode.getInkRanges().length).to.equal(0);
        });

    });

    describe('JSON construction', function () {

        var mathRuleNode;
        before(function (done) {
            mathRuleNode = new MyScript.MathRuleNode({
                children: [{
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
            expect(mathRuleNode).to.be.an('object');
            expect(mathRuleNode).to.be.an.instanceOf(MyScript.MathNode);
            expect(mathRuleNode).to.be.an.instanceOf(MyScript.MathRuleNode);
            expect(mathRuleNode).to.have.ownProperty('children');
        });

        it('Get children', function () {
            expect(mathRuleNode.getChildren().length).to.equal(6);
        });

        it('Get inkRanges', function () {
            expect(function () {
                mathRuleNode.getInkRanges(); // no selected candidate
            }).to.throw(Error);
        });

        it('Get non terminal node', function () {
            expect(mathRuleNode.getChildren()[0]).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
        });

        it('Get cell', function () {
            expect(mathRuleNode.getChildren()[1]).to.be.an.instanceOf(MyScript.MathCellNonTerminalNode);
        });

        it('Get border', function () {
            expect(mathRuleNode.getChildren()[2]).to.be.an.instanceOf(MyScript.MathBorderNonTerminalNode);
        });

        it('Get terminal node', function () {
            expect(mathRuleNode.getChildren()[3]).to.be.an.instanceOf(MyScript.MathTerminalNode);
        });

        it('Get rule node', function () {
            expect(mathRuleNode.getChildren()[4]).to.be.an.instanceOf(MyScript.MathRuleNode);
        });

        it('Get table', function () {
            expect(mathRuleNode.getChildren()[5]).to.be.an.instanceOf(MyScript.MathTableRuleNode);
        });

        it('Get wrong node type', function () {
            var data = {
                children: [{
                    type: 'ruleNode'
                }]
            };
            expect(function () {
                new MyScript.MathRuleNode(data);
            }).to.throw(Error);
        });

    });

});