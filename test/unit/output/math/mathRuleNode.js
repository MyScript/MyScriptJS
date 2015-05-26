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

    var mathRuleNode2 = new MyScript.MathRuleNode(obj);
    it('Test MathRuleNode object construction: MathNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[0]).to.be.an.instanceof(MyScript.MathNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathCellNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[1]).to.be.an.instanceof(MyScript.MathCellNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathBorderNonTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[2]).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
    });
    it('Test MathRuleNode object construction: MathTerminalNode construction', function () {
        expect(mathRuleNode2.getChildren()[3]).to.be.an.instanceof(MyScript.MathTerminalNode);
    });
    it('Test MathRuleNode object construction: MathRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[4]).to.be.an.instanceof(MyScript.MathRuleNode);
    });
    it('Test MathRuleNode object construction: MathTableRuleNode construction', function () {
        expect(mathRuleNode2.getChildren()[5]).to.be.an.instanceof(MyScript.MathTableRuleNode);
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