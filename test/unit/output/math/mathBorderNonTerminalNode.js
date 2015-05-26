'use strict';

describe('MyScriptJS: output/math/mathBorderNonTerminalNode.js', function () {

    it('MathBorderNonTerminalNode object exist', function () {
        expect(MyScript.MathBorderNonTerminalNode).to.exist;
        expect(MyScript.MathBorderNonTerminalNode).not.to.be.null;
        expect(MyScript.MathBorderNonTerminalNode).to.not.be.undefined;
    });

    var mathBorderNonTerminalNode = new MyScript.MathBorderNonTerminalNode();
    it('MathBorderNonTerminalNode constructor', function () {
        expect(mathBorderNonTerminalNode).to.be.an('object');
        expect(mathBorderNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathBorderNonTerminalNode).to.be.an.instanceof(MyScript.MathBorderNonTerminalNode);
    });

    it('Get data', function () {
        expect(mathBorderNonTerminalNode.getData()).to.be.undefined;
    });
});