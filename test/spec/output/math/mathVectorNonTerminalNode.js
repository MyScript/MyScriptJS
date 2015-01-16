'use strict';

describe('MyScriptJS: output/math/mathVectorNonTerminalNode.js', function () {

    it('MathVectorNonTerminalNode object exist', function () {
        expect(MyScript.MathVectorNonTerminalNode).to.exist;
        expect(MyScript.MathVectorNonTerminalNode).not.to.be.null;
        expect(MyScript.MathVectorNonTerminalNode).to.not.be.undefined;
    });

    it('MathVectorNonTerminalNode constructor', function () {
        var mathVectorNonTerminalNode = new MyScript.MathVectorNonTerminalNode();
        expect(mathVectorNonTerminalNode).to.be.an('object');
        expect(mathVectorNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathVectorNonTerminalNode).to.be.an.instanceof(MyScript.MathVectorNonTerminalNode);
    });
});