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

        it('Root getter', function () {
            expect(mathSymbolTreeResultElement.getRoot()).to.be.undefined;
        });

    });

    it('Test MathSymbolTreeResultElement object construction: MathNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathCellNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'cell'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathCellNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathBorderNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'border'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathBorderNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'terminalNode'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathTableRuleNode construction', function () {
        var obj = {
            root: {
                type: 'table'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceOf(MyScript.MathTableRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: wrong node type', function () {
        var data = {
            root: {
                type: 'ruleNode'
            }
        };
        expect(function () {
            new MyScript.MathSymbolTreeResultElement(data);
        }).to.throw(Error);
    });

});