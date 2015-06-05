'use strict';

describe('MathRuleNode: output/math/mathRuleNode.js', function () {

    describe('Default construction', function () {

        var mathRuleNode;
        before(function (done) {
            mathRuleNode = new MyScript.MathRuleNode();
            done();
        });

        it('check initial state', function () {
            expect(mathRuleNode).to.be.an('object');
            expect(mathRuleNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
            expect(mathRuleNode).to.have.ownProperty('children');
        });

        it('Name getter', function () {
            expect(mathRuleNode.getName()).to.be.undefined;
        });

        it('Children getter', function () {
            expect(mathRuleNode.getChildren()).to.be.empty;
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

        it('check initial state', function () {
            expect(mathRuleNode).to.be.an('object');
            expect(mathRuleNode).to.be.an.instanceof(MyScript.MathNode);
            expect(mathRuleNode).to.be.an.instanceof(MyScript.MathRuleNode);
            expect(mathRuleNode).to.have.ownProperty('children');
        });
        it('Test MathRuleNode object construction: MathNonTerminalNode construction', function () {
            expect(mathRuleNode.getChildren()[0]).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        });
        it('Test MathRuleNode object construction: MathCellNonTerminalNode construction', function () {
            expect(mathRuleNode.getChildren()[1]).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
        });
        it('Test MathRuleNode object construction: MathBorderNonTerminalNode construction', function () {
            expect(mathRuleNode.getChildren()[2]).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
        });
        it('Test MathRuleNode object construction: MathTerminalNode construction', function () {
            expect(mathRuleNode.getChildren()[3]).to.be.an.instanceof(MyScript.MathTerminalNode);
        });
        it('Test MathRuleNode object construction: MathRuleNode construction', function () {
            expect(mathRuleNode.getChildren()[4]).to.be.an.instanceof(MyScript.MathRuleNode);
        });
        it('Test MathRuleNode object construction: MathTableRuleNode construction', function () {
            expect(mathRuleNode.getChildren()[5]).to.be.an.instanceof(MyScript.MathTableRuleNode);
        });

        it('Test MathRuleNode object construction: wrong node type', function () {
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