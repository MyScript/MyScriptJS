'use strict';

describe('MyScriptJS: output/math/mathSystemNonTerminalNode.js', function () {

    it('MathSystemNonTerminalNode object exist', function () {
        expect(MyScript.MathSystemNonTerminalNode).to.exist;
        expect(MyScript.MathSystemNonTerminalNode).not.to.be.null;
        expect(MyScript.MathSystemNonTerminalNode).to.not.be.undefined;
    });

    it('MathSystemNonTerminalNode constructor', function () {
        var mathSystemNonTerminalNode = new MyScript.MathSystemNonTerminalNode();
        expect(mathSystemNonTerminalNode).to.be.an('object');
        expect(mathSystemNonTerminalNode).to.be.an.instanceof(MyScript.MathNonTerminalNode);
        expect(mathSystemNonTerminalNode).to.be.an.instanceof(MyScript.MathSystemNonTerminalNode);
    });
});