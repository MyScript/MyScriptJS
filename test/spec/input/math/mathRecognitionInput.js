'use strict';

describe('MyScriptJS: input/math/mathRecognitionInput.js', function () {

    var expect = require('chai').expect;

    it('MathRecognitionInput object exist', function () {
        expect(MyScript.MathRecognitionInput).to.exist;
        expect(MyScript.MathRecognitionInput).not.to.be.null;
        expect(MyScript.MathRecognitionInput).to.not.be.undefined;
    });

    it('MathRecognitionInput constructor', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput).to.be.an('object');
        expect(mathRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
        expect(mathRecognitionInput).to.be.an.instanceof(MyScript.MathRecognitionInput);
    });

    it('MathRecognitionInput components getter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getComponents()).to.be.undefined;
    });

    it('MathRecognitionInput components setter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getComponents()).to.be.undefined;
        mathRecognitionInput.setComponents(new MyScript.AbstractComponent());
        expect(mathRecognitionInput.getComponents()).not.to.be.undefined;
    });

    it('MathRecognitionInput result types getter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getResultTypes()).to.be.empty;
    });

    it('MathRecognitionInput result types setter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getResultTypes()).to.be.undefined;

        mathRecognitionInput.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
        expect(mathRecognitionInput.getResultTypes().length).to.equal(3);
        expect(mathRecognitionInput.getResultTypes()[0]).to.equal('LaTex');
        expect(mathRecognitionInput.getResultTypes()[1]).to.equal('MathML');
        expect(mathRecognitionInput.getResultTypes()[2]).to.equal('SymbolTree');

    });

    it('MathRecognitionInput user resources getter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getUserResources()).to.be.empty;
    });

    it('MathRecognitionInput user resources setter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getUserResources()).to.be.undefined;
        mathRecognitionInput.setUserResources(['math-grm-calculator', 'math-grm-standard']);
        expect(mathRecognitionInput.getUserResources().length).to.equal(2);
        expect(mathRecognitionInput.getUserResources()[0]).to.equal('math-grm-calculator');
        expect(mathRecognitionInput.getUserResources()[1]).to.equal('math-grm-standard');
    });

    it('MathRecognitionInput ScratchOut Detection Sensitivity getter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.be.empty;
    });

    it('MathRecognitionInput ScratchOut Detection Sensitivity setter', function () {
        var mathRecognitionInput = new MyScript.MathRecognitionInput();
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.be.undefined;
        mathRecognitionInput.setScratchOutDetectionSensitivity(15);
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
        expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
    });

});