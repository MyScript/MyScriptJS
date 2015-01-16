'use strict';

describe('MyScriptJS: input/generic/recognitionLanguagesData.js', function () {

    it('RecognitionLanguagesData object exist', function () {
        expect(MyScript.RecognitionLanguagesData).to.exist;
        expect(MyScript.RecognitionLanguagesData).not.to.be.null;
        expect(MyScript.RecognitionLanguagesData).to.not.be.undefined;
    });

    it('RecognitionLanguagesData constructor', function () {
        var recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
        expect(recognitionLanguagesData).to.be.an('object');
        expect(recognitionLanguagesData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(recognitionLanguagesData).to.be.an.instanceof(MyScript.RecognitionLanguagesData);
    });

    it('RecognitionLanguagesData Input Mode getter', function () {
        var recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
        expect(recognitionLanguagesData.getInputMode()).to.be.undefined;
    });

    it('RecognitionLanguagesData Input Mode setter', function () {
        var recognitionLanguagesData = new MyScript.RecognitionLanguagesData();
        expect(recognitionLanguagesData.getInputMode()).to.be.undefined;
        recognitionLanguagesData.setInputMode('CURSIVE');
        expect(recognitionLanguagesData.getInputMode()).not.to.be.undefined;
        expect(recognitionLanguagesData.getInputMode()).to.equal('CURSIVE');
    });
});