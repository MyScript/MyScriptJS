'use strict';

describe('MyScriptJS: output/math/mathLaTexResultElement.js', function () {

    var expect = require('chai').expect;

    it('MathLaTexResultElement object exist', function () {
        expect(MyScript.MathLaTexResultElement).to.exist;
        expect(MyScript.MathLaTexResultElement).not.to.be.null;
        expect(MyScript.MathLaTexResultElement).to.not.be.undefined;
    });

    it('MathLaTexResultElement constructor', function () {
        var mathLaTexResultElement = new MyScript.MathLaTexResultElement();
        expect(mathLaTexResultElement).to.be.an('object');
        expect(mathLaTexResultElement).to.be.an.instanceof(MyScript.AbstractMathResultElement);
        expect(mathLaTexResultElement).to.be.an.instanceof(MyScript.MathLaTexResultElement);
    });

    it('MathLaTexResultElement Value getter', function () {
        var mathLaTexResultElement = new MyScript.MathLaTexResultElement();
        expect(mathLaTexResultElement.getValue()).to.be.undefined;
    });
});