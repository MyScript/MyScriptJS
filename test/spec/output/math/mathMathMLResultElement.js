'use strict';

describe('MyScriptJS: output/math/mathMathMLResultElement.js', function () {

    var expect = require('chai').expect;

    it('MathMathMLResultElement object exist', function () {
        expect(MyScript.MathMathMLResultElement).to.exist;
        expect(MyScript.MathMathMLResultElement).not.to.be.null;
        expect(MyScript.MathMathMLResultElement).to.not.be.undefined;
    });

    it('MathMathMLResultElement constructor', function () {
        var mathMathMLResultElement = new MyScript.MathMathMLResultElement();
        expect(mathMathMLResultElement).to.be.an('object');
        expect(mathMathMLResultElement).to.be.an.instanceof(MyScript.AbstractMathResultElement);
        expect(mathMathMLResultElement).to.be.an.instanceof(MyScript.MathMathMLResultElement);
    });

    it('MathMathMLResultElement Value getter', function () {
        var mathMathMLResultElement = new MyScript.MathMathMLResultElement();
        expect(mathMathMLResultElement.getValue()).to.be.undefined;
    });
});