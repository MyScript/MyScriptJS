'use strict';

describe('MyScriptJS: input/analyzer/analyzerRecognitionData.js', function () {

    it('AnalyzerRecognitionData object exist', function () {
        expect(MyScript.AnalyzerRecognitionData).to.exist;
        expect(MyScript.AnalyzerRecognitionData).not.to.be.null;
        expect(MyScript.AnalyzerRecognitionData).to.not.be.undefined;
    });

    it('AnalyzerRecognitionData constructor', function () {
        var analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
        expect(analyzerRecognitionData).to.be.an('object');
        expect(analyzerRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
        expect(analyzerRecognitionData).to.be.an.instanceof(MyScript.AnalyzerRecognitionData);
    });

    it('AnalyzerRecognitionData analyzer recognition input getter', function () {
        var analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
        expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).to.be.undefined;
    });

    it('AnalyzerRecognitionData analyzer recognition input setter', function () {
        var analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
        expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).to.be.undefined;
        analyzerRecognitionData.setAnalyzerRecognitionInput(new MyScript.AnalyzerRecognitionInput());
        expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).not.to.be.undefined;
    });

});