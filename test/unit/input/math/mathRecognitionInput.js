'use strict';

describe('MyScriptJS: input/math/mathRecognitionInput.js', function () {

    it('MathRecognitionInput object exist', function () {
        expect(MyScript.MathRecognitionInput).to.exist;
        expect(MyScript.MathRecognitionInput).not.to.be.null;
        expect(MyScript.MathRecognitionInput).to.not.be.undefined;
    });

    var mathRecognitionInput = new MyScript.MathRecognitionInput();
    it('MathRecognitionInput constructor', function () {
        expect(mathRecognitionInput).to.be.an('object');
        expect(mathRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
        expect(mathRecognitionInput).to.be.an.instanceof(MyScript.MathRecognitionInput);
    });

    it('MathRecognitionInput components getter', function () {
        expect(mathRecognitionInput.getComponents()).to.be.undefined;
    });

    it('MathRecognitionInput components setter', function () {
        mathRecognitionInput.setComponents(new MyScript.AbstractComponent());
        expect(mathRecognitionInput.getComponents()).not.to.be.undefined;
    });

    it('MathRecognitionInput result types getter', function () {
        expect(mathRecognitionInput.getResultTypes()).to.be.empty;
    });

    it('MathRecognitionInput result types setter', function () {
        mathRecognitionInput.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
        expect(mathRecognitionInput.getResultTypes().length).to.equal(3);
        expect(mathRecognitionInput.getResultTypes()[0]).to.equal('LaTex');
        expect(mathRecognitionInput.getResultTypes()[1]).to.equal('MathML');
        expect(mathRecognitionInput.getResultTypes()[2]).to.equal('SymbolTree');
    });

    it('MathRecognitionInput user resources getter', function () {
        expect(mathRecognitionInput.getUserResources()).to.be.empty;
    });

    it('MathRecognitionInput user resources setter', function () {
        mathRecognitionInput.setUserResources(['math-grm-calculator', 'math-grm-standard']);
        expect(mathRecognitionInput.getUserResources().length).to.equal(2);
        expect(mathRecognitionInput.getUserResources()[0]).to.equal('math-grm-calculator');
        expect(mathRecognitionInput.getUserResources()[1]).to.equal('math-grm-standard');
    });

    it('MathRecognitionInput ScratchOut Detection Sensitivity getter', function () {
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.be.undefined;
    });

    it('MathRecognitionInput ScratchOut Detection Sensitivity setter', function () {
        mathRecognitionInput.setScratchOutDetectionSensitivity(15);
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
    });

    it('MathRecognitionInput columnar getter', function () {
        expect(mathRecognitionInput.isColumnar()).to.be.undefined;
    });

    it('MathRecognitionInput columnar setter', function () {
        mathRecognitionInput.setColumnar(true);
        expect(mathRecognitionInput.isColumnar()).not.to.be.undefined;
        expect(mathRecognitionInput.isColumnar()).to.be.true;
    });

});