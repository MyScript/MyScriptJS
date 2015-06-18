'use strict';

describe('MathSymbolTreeResultElement: output/math/mathSymbolTreeResultElement.js', function () {

    describe('Default construction', function () {

        var mathSymbolTreeResultElement;
        before(function (done) {
            mathSymbolTreeResultElement = new MyScript.MathSymbolTreeResultElement();
            done();
        });

        it('Check initial state', function () {
            expect(mathSymbolTreeResultElement).to.be.an('object');
            expect(mathSymbolTreeResultElement).to.be.an.instanceOf(MyScript.MathResultElement);
            expect(mathSymbolTreeResultElement).to.be.an.instanceOf(MyScript.MathSymbolTreeResultElement);
        });

        it('Get root', function () {
            expect(mathSymbolTreeResultElement.getRoot()).to.equal(undefined);
        });

        it('Get ink ranges', function () {
            expect(function () {
                mathSymbolTreeResultElement.getInkRanges(); // no root node
            }).to.throw(Error);
        });

    });

    describe('JSON construction', function () {

        it('Get non terminal node', function () {
            var obj = {
                root: {
                    type: 'nonTerminalNode'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
        });

        it('Get cell', function () {
            var obj = {
                root: {
                    type: 'cell'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathCellNonTerminalNode);
        });

        it('Get border', function () {
            var obj = {
                root: {
                    type: 'border'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathBorderNonTerminalNode);
        });

        it('Get terminal node', function () {
            var obj = {
                root: {
                    type: 'terminalNode'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathTerminalNode);
        });

        it('Get rule', function () {
            var obj = {
                root: {
                    type: 'rule'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathRuleNode);
        });

        it('Get table', function () {
            var obj = {
                root: {
                    type: 'table'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathTableRuleNode);
        });

        it('Get wrong node type', function () {
            var data = {
                root: {
                    type: 'ruleNode'
                }
            };
            expect(function () {
                new MyScript.MathSymbolTreeResultElement(data);
            }).to.throw(Error);
        });

        it('Get ink ranges', function () {
            var obj = {
                root: {
                    type: 'rule'
                }
            };
            var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
            expect(symbolTree.getInkRanges().length).to.equal(0);
        });

        it('Get missing root', function () {
            var data = {
                test: {
                    type: 'test'
                }
            };
            expect(function () {
                new MyScript.MathSymbolTreeResultElement(data);
            }).to.throw(Error);
        });

    });

});