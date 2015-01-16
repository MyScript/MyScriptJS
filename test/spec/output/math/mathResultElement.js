'use strict';

describe('MyScriptJS: output/math/mathResultElement.js', function () {

    it('MathResultElement object exist', function () {
        expect(MyScript.MathResultElement).to.exist;
        expect(MyScript.MathResultElement).not.to.be.null;
        expect(MyScript.MathResultElement).to.not.be.undefined;
    });

    it('MathResultElement constructor', function () {
        var mathResultElement = new MyScript.MathResultElement();
        expect(mathResultElement).to.be.an('object');
        expect(mathResultElement).to.be.an.instanceof(MyScript.MathResultElement);
    });

    it('MathResultElement Type getter', function () {
        var mathResultElement = new MyScript.MathResultElement();
        expect(mathResultElement.getType()).to.be.undefined;
    });

    it('MathResultElement is LaTex', function () {
        var mathResultElement = new MyScript.MathResultElement();
        expect(mathResultElement.isLaTex()).to.be.false;
    });

    it('MathResultElement is MathML', function () {
        var mathResultElement = new MyScript.MathResultElement();
        expect(mathResultElement.isMathMl()).to.be.false;
    });

    it('MathResultElement is Symbol Tree', function () {
        var mathResultElement = new MyScript.MathResultElement();
        expect(mathResultElement.isSymbolTree()).to.be.false;
    });
});