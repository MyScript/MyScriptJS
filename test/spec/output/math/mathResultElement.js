'use strict';

describe('MyScriptJS: output/math/abstractMathResultElement.js', function () {

    it('AbstractMathResultElement object exist', function () {
        expect(MyScript.AbstractMathResultElement).to.exist;
        expect(MyScript.AbstractMathResultElement).not.to.be.null;
        expect(MyScript.AbstractMathResultElement).to.not.be.undefined;
    });

    it('AbstractMathResultElement constructor', function () {
        var abstractMathResultElement = new MyScript.AbstractMathResultElement();
        expect(abstractMathResultElement).to.be.an('object');
        expect(abstractMathResultElement).to.be.an.instanceof(MyScript.AbstractMathResultElement);
    });

    it('AbstractMathResultElement Type getter', function () {
        var abstractMathResultElement = new MyScript.AbstractMathResultElement();
        expect(abstractMathResultElement.getType()).to.be.undefined;
    });

    it('AbstractMathResultElement is LaTex', function () {
        var abstractMathResultElement = new MyScript.AbstractMathResultElement();
        expect(abstractMathResultElement.isLaTex()).to.be.false;
    });

    it('AbstractMathResultElement is MathML', function () {
        var abstractMathResultElement = new MyScript.AbstractMathResultElement();
        expect(abstractMathResultElement.isMathMl()).to.be.false;
    });

    it('AbstractMathResultElement is Symbol Tree', function () {
        var abstractMathResultElement = new MyScript.AbstractMathResultElement();
        expect(abstractMathResultElement.isSymbolTree()).to.be.false;
    });
});