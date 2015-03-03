'use strict';

describe('MyScriptJS: input/math/mathParameter.js', function () {

    it('MathParameter object exist', function () {
        expect(MyScript.MathParameter).to.exist;
        expect(MyScript.MathParameter).not.to.be.null;
        expect(MyScript.MathParameter).to.not.be.undefined;
    });

    var mathParameter = new MyScript.MathParameter();
    it('MathParameter constructor', function () {
        expect(mathParameter).to.be.an('object');
        expect(mathParameter).to.be.an.instanceof(MyScript.AbstractParameter);
        expect(mathParameter).to.be.an.instanceof(MyScript.MathParameter);
        expect(mathParameter).to.have.ownProperty('resultTypes');
        expect(mathParameter).to.have.ownProperty('userResources');
    });

    it('MathParameter result types getter', function () {
        expect(mathParameter.getResultTypes()).to.be.empty;
    });

    it('MathParameter result types setter', function () {
        mathParameter.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
        expect(mathParameter.getResultTypes().length).to.equal(3);
        expect(mathParameter.getResultTypes()[0]).to.equal('LaTex');
        expect(mathParameter.getResultTypes()[1]).to.equal('MathML');
        expect(mathParameter.getResultTypes()[2]).to.equal('SymbolTree');
    });

    it('MathParameter user resources getter', function () {
        expect(mathParameter.getUserResources()).to.be.empty;
    });

    it('MathParameter user resources setter', function () {
        mathParameter.setUserResources(['math-grm-calculator', 'math-grm-standard']);
        expect(mathParameter.getUserResources().length).to.equal(2);
        expect(mathParameter.getUserResources()[0]).to.equal('math-grm-calculator');
        expect(mathParameter.getUserResources()[1]).to.equal('math-grm-standard');
    });

    it('MathParameter ScratchOut Detection Sensitivity getter', function () {
        expect(mathParameter.getScratchOutDetectionSensitivity()).to.be.undefined;
    });

    it('MathParameter ScratchOut Detection Sensitivity setter', function () {
        mathParameter.setScratchOutDetectionSensitivity(15);
        expect(mathParameter.getScratchOutDetectionSensitivity()).not.to.be.undefined;
        expect(mathParameter.getScratchOutDetectionSensitivity()).to.equal(15);
    });

    it('MathParameter columnar getter', function () {
        expect(mathParameter.isColumnar()).to.be.undefined;
    });

    it('MathParameter columnar setter', function () {
        mathParameter.setColumnar(true);
        expect(mathParameter.isColumnar()).not.to.be.undefined;
        expect(mathParameter.isColumnar()).to.be.true;
    });

});