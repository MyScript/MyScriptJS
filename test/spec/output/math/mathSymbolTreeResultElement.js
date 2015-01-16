'use strict';

describe('MyScriptJS: output/math/mathSymbolTreeResultElement.js', function () {

    it('MathSymbolTreeResultElement object exist', function () {
        expect(MyScript.MathSymbolTreeResultElement).to.exist;
        expect(MyScript.MathSymbolTreeResultElement).not.to.be.null;
        expect(MyScript.MathSymbolTreeResultElement).to.not.be.undefined;
    });

    it('MathSymbolTreeResultElement constructor', function () {
        var mathSymbolTreeResultElement = new MyScript.MathSymbolTreeResultElement();
        expect(mathSymbolTreeResultElement).to.be.an('object');
        expect(mathSymbolTreeResultElement).to.be.an.instanceof(MyScript.AbstractMathResultElement);
        expect(mathSymbolTreeResultElement).to.be.an.instanceof(MyScript.MathSymbolTreeResultElement);
    });

    it('MathSymbolTreeResultElement Root getter', function () {
        var MathSymbolTreeResultElement = new MyScript.MathSymbolTreeResultElement();
        expect(MathSymbolTreeResultElement.getRoot()).to.be.undefined;
    });

});