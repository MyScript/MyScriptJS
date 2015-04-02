'use strict';

describe('MyScriptJS: input/text/textRecognitionInput.js', function () {

    it('TextRecognitionInput object exist', function () {
        expect(MyScript.TextRecognitionInput).to.exist;
        expect(MyScript.TextRecognitionInput).not.to.be.null;
        expect(MyScript.TextRecognitionInput).to.not.be.undefined;
    });

    it('TextRecognitionInput Parameters getter', function () {
        var textRecognitionInput = new MyScript.TextRecognitionInput();
        expect(textRecognitionInput.getParameters()).to.be.undefined;
    });

    it('TextRecognitionInput Parameters setter', function () {
        var textRecognitionInput = new MyScript.TextRecognitionInput();
        expect(textRecognitionInput.getParameters()).to.be.undefined;
        textRecognitionInput.setParameters(new MyScript.TextParameter());
        expect(textRecognitionInput.getParameters()).not.to.be.undefined;
    });

    it('TextRecognitionInput Input Units getter', function () {
        var textRecognitionInput = new MyScript.TextRecognitionInput();
        expect(textRecognitionInput.getInputUnits()).to.be.undefined;
    });

    it('TextRecognitionInput Input Units setter', function () {
        var textRecognitionInput = new MyScript.TextRecognitionInput();
        expect(textRecognitionInput.getInputUnits()).to.be.undefined;
        textRecognitionInput.setInputUnits(new MyScript.TextInputUnit());
        expect(textRecognitionInput.getInputUnits()).not.to.be.undefined;
    });

});