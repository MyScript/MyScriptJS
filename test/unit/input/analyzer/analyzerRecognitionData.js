'use strict';

describe('AnalyzerRecognitionData: input/analyzer/analyzerRecognitionData.js', function () {

    describe('Default construction', function () {

        var analyzerRecognitionData;
        before(function (done) {
            analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
            done();
        });

        it('check initial state', function () {
            expect(analyzerRecognitionData).to.be.an('object');
            expect(analyzerRecognitionData).to.be.an.instanceof(MyScript.AbstractRecognitionData);
            expect(analyzerRecognitionData).to.be.an.instanceof(MyScript.AnalyzerRecognitionData);
        });

    });

    describe('Accessors', function () {

        var analyzerRecognitionData;
        before(function (done) {
            analyzerRecognitionData = new MyScript.AnalyzerRecognitionData();
            done();
        });

        it('analyzer recognition input getter', function () {
            expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).to.be.undefined;
        });

        it('analyzer recognition input setter', function () {
            expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).to.be.undefined;
            analyzerRecognitionData.setAnalyzerRecognitionInput(new MyScript.AnalyzerRecognitionInput());
            expect(analyzerRecognitionData.getAnalyzerRecognitionInput()).not.to.be.undefined;
        });

    });

});