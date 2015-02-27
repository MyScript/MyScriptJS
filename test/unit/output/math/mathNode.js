'use strict';

describe('MyScriptJS: output/math/mathNode.js', function () {

    it('MathNode object exist', function () {
        expect(MyScript.MathNode).to.exist;
        expect(MyScript.MathNode).not.to.be.null;
        expect(MyScript.MathNode).to.not.be.undefined;
    });

    it('MathNode constructor', function () {
        var mathNode = new MyScript.MathNode();
        expect(mathNode).to.be.an('object');
        expect(mathNode).to.be.an.instanceof(MyScript.MathNode);
    });

    it('MathNode Name getter', function () {
        var mathNode = new MyScript.MathNode();
        expect(mathNode.getName()).to.be.undefined;
    });

    it('MathNode Type getter', function () {
        var mathNode = new MyScript.MathNode();
        expect(mathNode.getType()).to.be.undefined;
    });
});