'use strict';

describe('MyScriptJS: output/math/mathTermNonTerminalNode.js', function () {

    it('MathTermNonTerminalNode object exist', function () {
        expect(MyScript.MathTermNonTerminalNode).to.exist;
        expect(MyScript.MathTermNonTerminalNode).not.to.be.null;
        expect(MyScript.MathTermNonTerminalNode).to.not.be.undefined;
    });

    it('MathTermNonTerminalNode constructor', function () {
        var mathTermNonTerminalNode = new MyScript.MathTermNonTerminalNode();
        expect(mathTermNonTerminalNode).to.be.an('object');
        expect(mathTermNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathTermNonTerminalNode).to.be.an.instanceof(MyScript.MathTermNonTerminalNode);
    });
});