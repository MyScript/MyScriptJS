'use strict';

describe('MyScriptJS: input/text/textRecognitionData.js', function () {

    var expect = require('chai').expect;

    it('TextRecognitionData object exist', function () {
        expect(MyScript.TextRecognitionData).to.exist;
        expect(MyScript.TextRecognitionData).not.to.be.null;
        expect(MyScript.TextRecognitionData).to.not.be.undefined;
    });

    it('TextRecognitionData constructor', function () {
        var textRecognitionData = new MyScript.TextRecognitionData();
        expect(textRecognitionData).to.be.an('object');
        expect(textRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(textRecognitionData).to.be.an.instanceof(MyScript.TextRecognitionData);
    });

    it('TextRecognitionData math recognition input getter', function () {
        var textRecognitionData = new MyScript.TextRecognitionData();
        expect(textRecognitionData.getTextRecognitionInput()).to.be.undefined;
    });

    it('TextRecognitionData math recognition input setter', function () {
        var textRecognitionData = new MyScript.TextRecognitionData();
        expect(textRecognitionData.getTextRecognitionInput()).to.be.undefined;
        textRecognitionData.setTextRecognitionInput(new MyScript.TextRecognitionInput());
        expect(textRecognitionData.getTextRecognitionInput()).not.to.be.undefined;
    });

});