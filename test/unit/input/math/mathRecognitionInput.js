'use strict';

describe('MathRecognitionInput: input/math/mathRecognitionInput.js', function () {

    describe('Default construction', function () {

        var mathRecognitionInput;
        before(function (done) {
            mathRecognitionInput = new MyScript.MathRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(mathRecognitionInput).to.be.an('object');
            expect(mathRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
            expect(mathRecognitionInput).to.be.an.instanceOf(MyScript.MathRecognitionInput);
        });

        it('Get components', function () {
            expect(mathRecognitionInput.getComponents()).to.be.undefined;
        });

        it('Set components', function () {
            mathRecognitionInput.setComponents(new MyScript.AbstractComponent());
            expect(mathRecognitionInput.getComponents()).not.to.be.undefined;
        });

        it('Get result types', function () {
            expect(mathRecognitionInput.getResultTypes()).to.be.empty;
        });

        it('Set result types', function () {
            mathRecognitionInput.setResultTypes(['LaTex', 'MathML', 'SymbolTree']);
            expect(mathRecognitionInput.getResultTypes().length).to.equal(3);
            expect(mathRecognitionInput.getResultTypes()[0]).to.equal('LaTex');
            expect(mathRecognitionInput.getResultTypes()[1]).to.equal('MathML');
            expect(mathRecognitionInput.getResultTypes()[2]).to.equal('SymbolTree');
        });

        it('Get user resources', function () {
            expect(mathRecognitionInput.getUserResources()).to.be.empty;
        });

        it('Set user resources', function () {
            mathRecognitionInput.setUserResources(['math-grm-calculator', 'math-grm-standard']);
            expect(mathRecognitionInput.getUserResources().length).to.equal(2);
            expect(mathRecognitionInput.getUserResources()[0]).to.equal('math-grm-calculator');
            expect(mathRecognitionInput.getUserResources()[1]).to.equal('math-grm-standard');
        });

        it('Get scratchOut detection sensitivity', function () {
            expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.be.undefined;
        });

        it('Set scratchOut detection sensitivity', function () {
            mathRecognitionInput.setScratchOutDetectionSensitivity(15);
            expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).not.to.be.undefined;
            expect(mathRecognitionInput.getScratchOutDetectionSensitivity()).to.equal(15);
        });

        it('Get is columnar', function () {
            expect(mathRecognitionInput.isColumnar()).to.be.undefined;
        });

        it('Set is columnar', function () {
            mathRecognitionInput.setColumnar(true);
            expect(mathRecognitionInput.isColumnar()).not.to.be.undefined;
            expect(mathRecognitionInput.isColumnar()).to.be.true;
        });

    });

});