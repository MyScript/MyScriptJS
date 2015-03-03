'use strict';

describe('MyScriptJS: output/math/mathSymbolTreeResultElement.js', function () {

    it('MathSymbolTreeResultElement object exist', function () {
        expect(MyScript.MathSymbolTreeResultElement).to.exist;
        expect(MyScript.MathSymbolTreeResultElement).not.to.be.null;
        expect(MyScript.MathSymbolTreeResultElement).to.not.be.undefined;
    });

    var mathSymbolTreeResultElement = new MyScript.MathSymbolTreeResultElement();
    it('MathSymbolTreeResultElement constructor', function () {
        expect(mathSymbolTreeResultElement).to.be.an('object');
        expect(mathSymbolTreeResultElement).to.be.an.instanceof(MyScript.MathResultElement);
        expect(mathSymbolTreeResultElement).to.be.an.instanceof(MyScript.MathSymbolTreeResultElement);
    });

    it('MathSymbolTreeResultElement Root getter', function () {
        expect(mathSymbolTreeResultElement.getRoot()).to.be.undefined;
    });

    it('Test MathSymbolTreeResultElement object construction: MathTermNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'term'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathTermNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSqrtNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'sqrtTerm'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSqrtNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathVectorNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'vectorTerm'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathVectorNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSystemNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'system'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSystemNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathExponentiableNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'exponentiable'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathExponentiableNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathExpressionNonTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'nonTerminalNode',
                name: 'expression'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathExpressionNonTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathTerminalNode construction', function () {
        var obj = {
            root: {
                type: 'terminalNode'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathTerminalNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathIdentityRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'identity'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathIdentityRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathHorizontalPairRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'horizontal pair'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathHorizontalPairRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathFenceRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'fence'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathFenceRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathFractionRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'fraction'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathFractionRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSqrtRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'sqrt'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSqrtRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSubscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'subscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSubscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSuperscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'superscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSuperscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathSubSuperscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'subsuperscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathSubSuperscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathUnderscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'underscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathUnderscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathOverscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'overscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathOverscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathUnderOverscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'underoverscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathUnderOverscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathPreSuperscriptRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'presuperscript'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathPreSuperscriptRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathVerticalPairRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'vertical pair'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathVerticalPairRuleNode);
    });

    it('Test MathSymbolTreeResultElement object construction: MathLeftFenceRuleNode construction', function () {
        var obj = {
            root: {
                type: 'rule',
                name: 'left fence'
            }
        };
        var symbolTree = new MyScript.MathSymbolTreeResultElement(obj);
        expect(symbolTree.getRoot()).to.be.an.instanceof(MyScript.MathLeftFenceRuleNode);
    });

});