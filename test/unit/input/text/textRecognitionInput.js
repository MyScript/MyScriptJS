'use strict';

describe('TextRecognitionInput: input/text/textRecognitionInput.js', function () {

    describe('Default construction', function () {

        var textRecognitionInput;
        before(function (done) {
            textRecognitionInput = new MyScript.TextRecognitionInput();
            done();
        });

        it('check initial state', function () {
            expect(textRecognitionInput).to.be.an('object');
            expect(textRecognitionInput).to.be.an.instanceof(MyScript.AbstractRecognitionInput);
            expect(textRecognitionInput).to.be.an.instanceof(MyScript.TextRecognitionInput);
        });

    });

    describe('Accessors', function () {

        var textRecognitionInput;
        beforeEach(function (done) {
            textRecognitionInput = new MyScript.TextRecognitionInput();
            done();
        });

        it('Parameters getter', function () {
            expect(textRecognitionInput.getParameters()).to.be.undefined;
        });

        it('Parameters setter', function () {
            expect(textRecognitionInput.getParameters()).to.be.undefined;
            textRecognitionInput.setParameters(new MyScript.TextParameter());
            expect(textRecognitionInput.getParameters()).not.to.be.undefined;
        });

        it('Input Units getter', function () {
            expect(textRecognitionInput.getInputUnits()).to.be.undefined;
        });

        it('Input Units setter', function () {
            expect(textRecognitionInput.getInputUnits()).to.be.undefined;
            textRecognitionInput.setInputUnits(new MyScript.TextInputUnit());
            expect(textRecognitionInput.getInputUnits()).not.to.be.undefined;
        });

    });

});