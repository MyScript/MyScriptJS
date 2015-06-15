'use strict';

describe('TextRecognitionInput: input/text/textRecognitionInput.js', function () {

    describe('Default construction', function () {

        var textRecognitionInput;
        before(function (done) {
            textRecognitionInput = new MyScript.TextRecognitionInput();
            done();
        });

        it('Check initial state', function () {
            expect(textRecognitionInput).to.be.an('object');
            expect(textRecognitionInput).to.be.an.instanceOf(MyScript.AbstractRecognitionInput);
            expect(textRecognitionInput).to.be.an.instanceOf(MyScript.TextRecognitionInput);
        });

        it('Get parameters', function () {
            expect(textRecognitionInput.getParameters()).to.be.undefined;
        });

        it('Set parameters', function () {
            textRecognitionInput.setParameters(new MyScript.TextParameter());
            expect(textRecognitionInput.getParameters()).not.to.be.undefined;
        });

        it('Get input units', function () {
            expect(textRecognitionInput.getInputUnits()).to.be.undefined;
        });

        it('Set input units', function () {
            textRecognitionInput.setInputUnits(new MyScript.TextInputUnit());
            expect(textRecognitionInput.getInputUnits()).not.to.be.undefined;
        });

    });

});